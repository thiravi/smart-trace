import { MongoDBService } from './MongoDBService';
import { ConfigManager } from '../config';
import { ProcessorRegistry } from '../processors/ProcessorRegistry';
import { FeedbackPayload, ProcessingResult, ApiResponse } from '../types';
import winston from 'winston';

export class FeedbackService {
  private configManager: ConfigManager;
  private processorRegistry: ProcessorRegistry;
  private mongoDBService: MongoDBService;
  private logger: winston.Logger;

  constructor(configManager: ConfigManager) {
    this.configManager = configManager;
    this.processorRegistry = new ProcessorRegistry();
    this.mongoDBService = new MongoDBService();
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: process.env.LOG_FILE_PATH || './logs/app.log' })
      ]
    });
  }

  async submitFeedback(payload: FeedbackPayload): Promise<ApiResponse<{ id: string; processingResults: ProcessingResult[] }>> {
    try {
      // Determine team (from payload or default)
      const team = payload.team || this.determineTeamFromUrl(payload.systemInfo.url) || this.configManager.getConfig().global.defaultTeam;
      const teamConfig = this.configManager.getTeamConfig(team);

      if (!teamConfig) {
        throw new Error(`Team configuration not found: ${team}`);
      }

      // Save to MongoDB
      const feedbackId = await this.mongoDBService.createFeedback({
        ...payload,
        team
      });

      this.logger.info('Feedback saved', { 
        id: feedbackId, 
        team, 
        type: payload.type, 
        email: payload.email 
      });

      // Process with configured processors
      const processorNames = teamConfig.processors || ['email', 'storage'];
      const processorConfigs = this.buildProcessorConfigs(teamConfig, payload);
      
      const processingResults = await this.processorRegistry.processWithProcessors(
        payload,
        processorNames,
        processorConfigs
      );

      // Update feedback with processing results
      await this.mongoDBService.updateFeedback(feedbackId, {
        processed: true,
        processingResults: processingResults.reduce((acc, result) => {
          acc[result.processor] = result;
          return acc;
        }, {} as Record<string, any>)
      });

      this.logger.info('Feedback processed', { 
        id: feedbackId, 
        processors: processorNames,
        successCount: processingResults.filter(r => r.success).length 
      });

      return {
        success: true,
        data: {
          id: feedbackId,
          processingResults
        },
        message: 'Feedback submitted and processed successfully',
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      this.logger.error('Feedback submission failed', { error: error instanceof Error ? error.message : error });
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString()
      };
    }
  }

  async getFeedback(filters: {
    team?: string;
    type?: string;
    email?: string;
    country?: string;
    city?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    skip?: number;
  } = {}): Promise<ApiResponse<{ feedback: any[]; total: number }>> {
    try {
      const result = await this.mongoDBService.getFeedback(filters);

      return {
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      this.logger.error('Failed to fetch feedback', { error: error instanceof Error ? error.message : error });
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch feedback',
        timestamp: new Date().toISOString()
      };
    }
  }

  async getFeedbackById(id: string): Promise<ApiResponse<any>> {
    try {
      const feedback = await this.mongoDBService.getFeedbackById(id);
      
      if (!feedback) {
        return {
          success: false,
          error: 'Feedback not found',
          timestamp: new Date().toISOString()
        };
      }

      return {
        success: true,
        data: feedback,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      this.logger.error('Failed to fetch feedback by ID', { id, error: error instanceof Error ? error.message : error });
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch feedback',
        timestamp: new Date().toISOString()
      };
    }
  }

  async getAnalytics(filters: {
    team?: string;
    startDate?: Date;
    endDate?: Date;
  } = {}): Promise<ApiResponse<any>> {
    try {
      const analytics = await this.mongoDBService.getAnalytics(filters);

      return {
        success: true,
        data: analytics,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      this.logger.error('Failed to generate analytics', { error: error instanceof Error ? error.message : error });
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate analytics',
        timestamp: new Date().toISOString()
      };
    }
  }

  async getTrends(filters: {
    team?: string;
    startDate?: Date;
    endDate?: Date;
    interval?: 'day' | 'week' | 'month';
  } = {}): Promise<ApiResponse<any>> {
    try {
      const trends = await this.mongoDBService.getTrends(filters);

      return {
        success: true,
        data: trends,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      this.logger.error('Failed to generate trends', { error: error instanceof Error ? error.message : error });
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate trends',
        timestamp: new Date().toISOString()
      };
    }
  }

  private determineTeamFromUrl(url: string): string | null {
    // Simple URL-based team routing - can be customized
    try {
      const urlObj = new URL(url);
      const path = urlObj.pathname;
      
      if (path.includes('/admin') || path.includes('/dashboard')) return 'backend';
      if (path.includes('/ui') || path.includes('/app')) return 'frontend';
      
      return null;
    } catch {
      return null;
    }
  }

  private buildProcessorConfigs(teamConfig: any, payload: FeedbackPayload): Record<string, any> {
    const config = this.configManager.getConfig();
    
    return {
      email: {
        recipients: teamConfig.emailNotifications,
        includeSessionData: true,
        template: 'default'
      },
      slack: {
        webhookUrl: teamConfig.slackWebhook,
        mentionOnBug: payload.type === 'bug'
      },
      storage: {
        path: teamConfig.storage?.path || `./uploads/${teamConfig.name.toLowerCase()}`,
        pretty: true,
        separateSessionFile: true,
        ...config.processors.find(p => p.name === 'storage')?.config
      },
      'performance-analyzer': {
        thresholds: { loadTime: 3000, domReady: 2000 },
        alertOnThreshold: true,
        ...config.processors.find(p => p.name === 'performance-analyzer')?.config
      }
    };
  }
}
import { BaseProcessor } from './BaseProcessor';
import { FeedbackPayload, ProcessingResult } from '../types';

export class PerformanceAnalyzerProcessor extends BaseProcessor {
  name = 'performance-analyzer';

  async process(payload: FeedbackPayload, config: any): Promise<ProcessingResult> {
    return this.executeWithTiming(async () => {
      const analysis = this.analyzePerformance(payload, config);
      
      // If performance is below threshold and alerting is enabled, trigger alerts
      if (config.alertOnThreshold && analysis.alerts.length > 0) {
        await this.triggerPerformanceAlerts(payload, analysis, config);
      }

      return {
        analysis,
        recommendations: this.generateRecommendations(analysis),
        timestamp: new Date().toISOString()
      };
    }, this.name);
  }

  private analyzePerformance(payload: FeedbackPayload, config: any) {
    const { loadTime, domReady } = payload.performanceMetrics;
    const thresholds = config.thresholds || { loadTime: 3000, domReady: 2000 };
    
    const alerts = [];
    const metrics = {
      loadTime: {
        value: loadTime,
        threshold: thresholds.loadTime,
        status: loadTime > thresholds.loadTime ? 'poor' : loadTime > thresholds.loadTime * 0.7 ? 'warning' : 'good',
        score: Math.max(0, 100 - (loadTime / thresholds.loadTime) * 100)
      },
      domReady: {
        value: domReady,
        threshold: thresholds.domReady,
        status: domReady > thresholds.domReady ? 'poor' : domReady > thresholds.domReady * 0.7 ? 'warning' : 'good',
        score: Math.max(0, 100 - (domReady / thresholds.domReady) * 100)
      }
    };

    // Generate alerts
    if (metrics.loadTime.status === 'poor') {
      alerts.push({
        type: 'performance',
        severity: 'high',
        metric: 'loadTime',
        message: `Load time (${loadTime}ms) exceeds threshold (${thresholds.loadTime}ms)`,
        impact: 'User experience significantly degraded'
      });
    }

    if (metrics.domReady.status === 'poor') {
      alerts.push({
        type: 'performance',
        severity: 'medium',
        metric: 'domReady',
        message: `DOM ready time (${domReady}ms) exceeds threshold (${thresholds.domReady}ms)`,
        impact: 'Page interactivity delayed'
      });
    }

    // Analyze connection impact
    const connection = payload.systemInfo.connection;
    const connectionAnalysis = this.analyzeConnection(connection, metrics);
    
    return {
      overallScore: Math.round((metrics.loadTime.score + metrics.domReady.score) / 2),
      metrics,
      alerts,
      connectionAnalysis,
      deviceInfo: this.analyzeDevice(payload.systemInfo),
      timestamp: new Date().toISOString()
    };
  }

  private analyzeConnection(connection: any, metrics: any) {
    const connectionScore = this.getConnectionScore(connection.effectiveType);
    
    return {
      type: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      score: connectionScore,
      impact: connectionScore < 50 ? 'high' : connectionScore < 80 ? 'medium' : 'low',
      recommendation: this.getConnectionRecommendation(connection, metrics)
    };
  }

  private analyzeDevice(systemInfo: any) {
    const memoryGB = parseInt(systemInfo.memory.replace(/[^\d]/g, '')) || 4;
    const cores = systemInfo.cores;
    
    return {
      memory: {
        value: memoryGB,
        adequacy: memoryGB >= 8 ? 'good' : memoryGB >= 4 ? 'adequate' : 'poor'
      },
      cores: {
        value: cores,
        adequacy: cores >= 8 ? 'excellent' : cores >= 4 ? 'good' : cores >= 2 ? 'adequate' : 'poor'
      },
      platform: systemInfo.platform,
      viewport: systemInfo.viewport
    };
  }

  private getConnectionScore(effectiveType: string): number {
    switch (effectiveType) {
      case '4g': return 90;
      case '3g': return 60;
      case '2g': return 30;
      case 'slow-2g': return 10;
      default: return 70;
    }
  }

  private getConnectionRecommendation(connection: any, metrics: any): string {
    if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
      return 'Consider implementing progressive loading and reducing initial bundle size for slow connections';
    }
    if (connection.downlink < 1.5 && metrics.loadTime.status === 'poor') {
      return 'Optimize images and implement lazy loading for low bandwidth connections';
    }
    if (connection.rtt > 300) {
      return 'High latency detected - consider CDN optimization and reducing HTTP requests';
    }
    return 'Connection appears adequate for current performance metrics';
  }

  private generateRecommendations(analysis: any): string[] {
    const recommendations = [];

    if (analysis.metrics.loadTime.status === 'poor') {
      recommendations.push('Optimize critical rendering path and reduce bundle size');
      recommendations.push('Implement code splitting and lazy loading');
      recommendations.push('Optimize images and use next-gen formats (WebP, AVIF)');
    }

    if (analysis.metrics.domReady.status === 'poor') {
      recommendations.push('Minimize DOM manipulation and reduce JavaScript execution time');
      recommendations.push('Defer non-critical scripts and use web workers for heavy computations');
    }

    if (analysis.connectionAnalysis.impact === 'high') {
      recommendations.push(analysis.connectionAnalysis.recommendation);
    }

    if (analysis.deviceInfo.memory.adequacy === 'poor') {
      recommendations.push('Optimize memory usage and implement efficient garbage collection');
    }

    return recommendations;
  }

  private async triggerPerformanceAlerts(payload: FeedbackPayload, analysis: any, config: any) {
    // This could trigger additional notifications or integrations
    console.log(`Performance alert triggered for ${payload.systemInfo.url}:`, analysis.alerts);
  }
}
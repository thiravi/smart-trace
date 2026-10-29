import { AppConfig, TeamConfig, ProcessorConfig } from '../types';

export const defaultConfig: AppConfig = {
  teams: {
    general: {
      name: 'General Team',
      emailNotifications: ['general@company.com'],
      processors: ['email', 'storage'],
      storage: {
        enabled: true,
        retention: 30,
        path: './uploads/general'
      }
    },
    frontend: {
      name: 'Frontend Team',
      emailNotifications: ['frontend@company.com'],
      ...(process.env.FRONTEND_SLACK_WEBHOOK && { slackWebhook: process.env.FRONTEND_SLACK_WEBHOOK }),
      processors: ['email', 'slack', 'storage', 'performance-analyzer'],
      storage: {
        enabled: true,
        retention: 90,
        path: './uploads/frontend'
      }
    },
    backend: {
      name: 'Backend Team',
      emailNotifications: ['backend@company.com'],
      processors: ['email', 'storage', 'system-analyzer'],
      storage: {
        enabled: true,
        retention: 60,
        path: './uploads/backend'
      }
    }
  },
  processors: [
    {
      name: 'email',
      enabled: true,
      config: {
        template: 'default',
        priority: 'normal'
      }
    },
    {
      name: 'slack',
      enabled: true,
      config: {
        template: 'slack-card',
        mentionOnBug: true
      }
    },
    {
      name: 'storage',
      enabled: true,
      config: {
        compression: true,
        encryption: false
      }
    },
    {
      name: 'performance-analyzer',
      enabled: true,
      config: {
        thresholds: {
          loadTime: 3000,
          domReady: 2000
        },
        alertOnThreshold: true
      }
    },
    {
      name: 'system-analyzer',
      enabled: true,
      config: {
        trackBrowser: true,
        trackPerformance: true,
        generateReport: true
      }
    }
  ],
  global: {
    defaultTeam: 'general',
    rateLimiting: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 100
    },
    storage: {
      enabled: true,
      maxFileSizeMB: 10,
      allowedTypes: ['application/json', 'text/plain']
    }
  }
};

export class ConfigManager {
  private config: AppConfig;
  private customConfigPath?: string;

  constructor(customConfigPath?: string) {
    this.customConfigPath = customConfigPath;
    this.config = this.loadConfig();
  }

  private loadConfig(): AppConfig {
    if (this.customConfigPath) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const customConfig = require(this.customConfigPath);
        return this.mergeConfigs(defaultConfig, customConfig);
      } catch (error) {
        console.warn(`Failed to load custom config from ${this.customConfigPath}, using default`);
      }
    }
    return defaultConfig;
  }

  private mergeConfigs(base: AppConfig, custom: Partial<AppConfig>): AppConfig {
    return {
      teams: { ...base.teams, ...custom.teams },
      processors: custom.processors || base.processors,
      global: { ...base.global, ...custom.global }
    };
  }

  getConfig(): AppConfig {
    return this.config;
  }

  getTeamConfig(teamName: string): TeamConfig | undefined {
    return this.config.teams[teamName];
  }

  getProcessorConfig(processorName: string): ProcessorConfig | undefined {
    return this.config.processors.find(p => p.name === processorName);
  }

  updateTeamConfig(teamName: string, config: Partial<TeamConfig>): void {
    if (this.config.teams[teamName]) {
      this.config.teams[teamName] = { ...this.config.teams[teamName], ...config };
    }
  }

  addTeam(teamName: string, config: TeamConfig): void {
    this.config.teams[teamName] = config;
  }

  removeTeam(teamName: string): boolean {
    if (this.config.teams[teamName]) {
      delete this.config.teams[teamName];
      return true;
    }
    return false;
  }

  getEnabledProcessors(): ProcessorConfig[] {
    return this.config.processors.filter(p => p.enabled);
  }
}
import { BaseProcessor } from './BaseProcessor';
import { FeedbackPayload, ProcessingResult } from '../types';

export class SlackProcessor extends BaseProcessor {
  name = 'slack';

  async process(payload: FeedbackPayload, config: any): Promise<ProcessingResult> {
    return this.executeWithTiming(async () => {
      const webhookUrl = config.webhookUrl || process.env.SLACK_WEBHOOK_URL;
      
      if (!webhookUrl) {
        throw new Error('Slack webhook URL not configured');
      }

      const slackMessage = this.createSlackMessage(payload, config);
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackMessage)
      });

      if (!response.ok) {
        throw new Error(`Slack API error: ${response.status} ${response.statusText}`);
      }

      return {
        status: 'sent',
        timestamp: new Date().toISOString(),
        webhookUrl: webhookUrl.replace(/\/[^\/]+$/, '/***') // Hide sensitive part
      };
    }, this.name);
  }

  private createSlackMessage(payload: FeedbackPayload, config: any) {
    const color = this.getSlackColor(payload.type);
    const performanceEmoji = payload.performanceMetrics.loadTime > 3000 ? '🐌' : '⚡';
    const typeEmoji = this.getTypeEmoji(payload.type);
    
    return {
      text: `${typeEmoji} New ${payload.type} feedback received`,
      attachments: [
        {
          color,
          title: `${typeEmoji} ${payload.type.toUpperCase()} Feedback from ${payload.email}`,
          title_link: payload.systemInfo.url,
          text: payload.description,
          fields: [
            {
              title: 'URL',
              value: `<${payload.systemInfo.url}|${new URL(payload.systemInfo.url).pathname}>`,
              short: true
            },
            {
              title: 'Browser',
              value: this.parseBrowser(payload.systemInfo.userAgent),
              short: true
            },
            {
              title: 'Performance',
              value: `${performanceEmoji} Load: ${payload.performanceMetrics.loadTime}ms | DOM: ${payload.performanceMetrics.domReady}ms`,
              short: true
            },
            {
              title: 'Screen',
              value: `${payload.systemInfo.screenResolution} (${payload.systemInfo.viewport})`,
              short: true
            },
            {
              title: 'Connection',
              value: `${payload.systemInfo.connection.effectiveType} (${payload.systemInfo.connection.downlink} Mbps)`,
              short: true
            },
            {
              title: 'Platform',
              value: payload.systemInfo.platform,
              short: true
            }
          ],
          footer: 'PerformanceSnap',
          ts: Math.floor(new Date(payload.systemInfo.timestamp).getTime() / 1000)
        }
      ]
    };
  }

  private getSlackColor(type: string): string {
    switch (type) {
      case 'bug': return 'danger';
      case 'feature': return '#007bff';
      case 'appreciation': return 'good';
      default: return '#6c757d';
    }
  }

  private getTypeEmoji(type: string): string {
    switch (type) {
      case 'bug': return '🐛';
      case 'feature': return '💡';
      case 'appreciation': return '👏';
      default: return '📝';
    }
  }
}
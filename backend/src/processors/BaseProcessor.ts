import { FeedbackProcessor, FeedbackPayload, ProcessingResult } from '../types';

export abstract class BaseProcessor implements FeedbackProcessor {
  abstract name: string;

  abstract process(payload: FeedbackPayload, config: any): Promise<ProcessingResult>;

  protected async executeWithTiming<T>(
    operation: () => Promise<T>,
    processorName: string
  ): Promise<ProcessingResult> {
    const startTime = Date.now();
    
    try {
      const result = await operation();
      const duration = Date.now() - startTime;
      
      return {
        processor: processorName,
        success: true,
        result,
        duration
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      
      return {
        processor: processorName,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration
      };
    }
  }

  protected formatFeedbackSummary(payload: FeedbackPayload): string {
    return `
**Feedback Type:** ${payload.type.toUpperCase()}
**Email:** ${payload.email}
**Description:** ${payload.description}
**URL:** ${payload.systemInfo.url}
**Browser:** ${this.parseBrowser(payload.systemInfo.userAgent)}
**Performance:** Load Time: ${payload.performanceMetrics.loadTime}ms, DOM Ready: ${payload.performanceMetrics.domReady}ms
**Screen:** ${payload.systemInfo.screenResolution} (Viewport: ${payload.systemInfo.viewport})
**Timestamp:** ${new Date(payload.systemInfo.timestamp).toLocaleString()}
    `.trim();
  }

  protected parseBrowser(userAgent: string): string {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  }
}
export interface SmartTraceConfig {
  apiKey?: string;
  apiEndpoint?: string;
  autoStart?: boolean;
  showRecordingControl?: boolean;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  onFeedback?: (data: FeedbackData) => void;
}

export interface FeedbackData {
  type: 'bug' | 'appreciation' | 'feature';
  description: string;
  email?: string;
  systemInfo: {
    userAgent: string;
    language: string;
    platform: string;
    screenResolution: string;
    viewport: string;
    timezone: string;
    connection: {
      effectiveType: string;
      downlink: number;
      rtt: number;
    } | 'Not available';
    memory: string;
    cores: number;
    url: string;
    timestamp: string;
    referrer?: string;
  };
  sessionRecording: unknown[];
  performanceMetrics: {
    loadTime: number;
    domReady: number;
  };
}

export declare class SmartTrace {
  constructor(config?: SmartTraceConfig);
  updateConfig(newConfig: Partial<SmartTraceConfig>): void;
  destroy(): void;
}

export declare function initSmartTrace(config?: SmartTraceConfig): SmartTrace;

export default SmartTrace;
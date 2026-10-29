// Core interfaces for PerformanceSnap payload
export interface ConnectionInfo {
  effectiveType: string;
  downlink: number;
  rtt: number;
}

export interface SystemInfo {
  userAgent: string;
  language: string;
  platform: string;
  screenResolution: string;
  viewport: string;
  timezone: string;
  connection: ConnectionInfo;
  memory: string;
  cores: number;
  url: string;
  timestamp: string;
  referrer: string;
}

export interface GeoLocation {
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  city: string;
  latitude?: number | null;
  longitude?: number | null;
  accuracy?: number | null;
  timezone: string;
  locale?: string;
  timestamp?: string;
  isp?: string;
  org?: string;
  ip?: string;
  fallbackReason?: string;
}

export interface SessionRecordingData {
  href?: string;
  width?: number;
  height?: number;
  [key: string]: any; // Allow for additional rrweb data
}

export interface SessionRecording {
  type: number;
  data: SessionRecordingData;
  timestamp: number;
}

export interface PerformanceMetrics {
  loadTime: number;
  domReady: number;
  [key: string]: number; // Allow for additional metrics
}

export interface FeedbackPayload {
  type: 'bug' | 'appreciation' | 'feature' | string;
  description: string;
  email: string;
  systemInfo: SystemInfo;
  geoLocation?: GeoLocation | null;
  sessionRecording: SessionRecording[];
  performanceMetrics: PerformanceMetrics;
  team?: string; // Optional team override
}

// Configuration interfaces
export interface TeamConfig {
  name: string;
  emailNotifications: string[];
  slackWebhook?: string;
  teamsWebhook?: string;
  customFields?: Record<string, any>;
  processors?: string[]; // List of processor names to run
  storage?: {
    enabled: boolean;
    retention?: number; // days
    path?: string;
  };
}

export interface ProcessorConfig {
  name: string;
  enabled: boolean;
  config: Record<string, any>;
}

export interface AppConfig {
  teams: Record<string, TeamConfig>;
  processors: ProcessorConfig[];
  global: {
    defaultTeam: string;
    rateLimiting: {
      windowMs: number;
      maxRequests: number;
    };
    storage: {
      enabled: boolean;
      maxFileSizeMB: number;
      allowedTypes: string[];
    };
  };
}

// Database models
export interface FeedbackDocument extends FeedbackPayload {
  _id?: string;
  team: string;
  processed: boolean;
  processingResults: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface ProcessingResult {
  processor: string;
  success: boolean;
  result?: any;
  error?: string;
  duration: number;
}

// Processor interface
export interface FeedbackProcessor {
  name: string;
  process(payload: FeedbackPayload, config: any): Promise<ProcessingResult>;
}

// Webhook payload
export interface WebhookPayload {
  event: 'feedback.received' | 'feedback.processed';
  team: string;
  feedback: FeedbackDocument;
  processingResults?: ProcessingResult[];
  timestamp: string;
}
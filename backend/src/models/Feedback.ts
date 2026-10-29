import mongoose, { Schema, Document } from 'mongoose';

// Feedback Document Interface
export interface IFeedbackDocument extends Document {
  type: 'bug' | 'feature' | 'appreciation';
  email: string;
  description: string; // Changed from message to description
  team: string;
  url?: string;
  screenshot?: string;
  performanceMetrics?: {
    loadTime: number;
    domReady: number;
    firstContentfulPaint?: number;
    largestContentfulPaint?: number;
    cumulativeLayoutShift?: number;
  };
  systemInfo: {
    userAgent: string;
    language: string;
    platform: string;
    screenResolution: string;
    viewport: string; // Changed from object to string
    timezone: string;
    connection: {
      effectiveType: string;
      downlink: number;
      rtt: number;
    };
    memory: string;
    cores: number;
    timestamp: string;
    url: string;
    referrer?: string;
  };
  geoLocation?: {
    country: string;
    countryCode: string;
    region: string;
    regionCode: string;
    city: string;
    latitude?: number;
    longitude?: number;
    timezone: string;
    isp?: string;
    org?: string;
    ip?: string;
  };
  sessionRecording?: Array<{
    type: number;
    data: any;
    timestamp: number;
  }>;
  processed: boolean;
  processingResults: Record<string, any>;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// Feedback Schema
const FeedbackSchema = new Schema<IFeedbackDocument>({
  type: { 
    type: String, 
    required: true, 
    enum: ['bug', 'feature', 'appreciation'],
    index: true 
  },
  email: { type: String, required: true, index: true },
  description: { type: String, required: true }, // Changed from message to description
  team: { type: String, required: true, index: true },
  url: String,
  screenshot: String,
  performanceMetrics: {
    loadTime: { type: Number, required: true },
    domReady: { type: Number, required: true },
    firstContentfulPaint: Number,
    largestContentfulPaint: Number,
    cumulativeLayoutShift: Number
  },
  systemInfo: {
    userAgent: { type: String, required: true },
    language: { type: String, required: true },
    platform: { type: String, required: true },
    screenResolution: { type: String, required: true },
    viewport: { type: String, required: true }, // Changed from object to string
    timezone: { type: String, required: true },
    connection: {
      effectiveType: { type: String, required: true },
      downlink: { type: Number, required: true },
      rtt: { type: Number, required: true }
    },
    memory: { type: String, required: true },
    cores: { type: Number, required: true },
    timestamp: { type: String, required: true },
    url: { type: String, required: true },
    referrer: String
  },
  geoLocation: {
    country: { type: String, index: true },
    countryCode: { type: String, index: true },
    region: { type: String, index: true },
    regionCode: String,
    city: { type: String, index: true },
    latitude: Number,
    longitude: Number,
    timezone: String,
    isp: String,
    org: String,
    ip: String
  },
  sessionRecording: [{
    type: { type: Number, required: true },
    data: { type: Schema.Types.Mixed },
    timestamp: { type: Number, required: true }
  }],
  processed: { type: Boolean, default: false, index: true },
  processingResults: { type: Schema.Types.Mixed, default: {} },
  metadata: { type: Schema.Types.Mixed, default: {} }
}, {
  timestamps: true
});

// Create compound indexes for better query performance
FeedbackSchema.index({ team: 1, createdAt: -1 });
FeedbackSchema.index({ type: 1, createdAt: -1 });
FeedbackSchema.index({ email: 1, createdAt: -1 });
FeedbackSchema.index({ processed: 1, createdAt: 1 });
FeedbackSchema.index({ 'geoLocation.country': 1, createdAt: -1 });
FeedbackSchema.index({ 'geoLocation.city': 1, createdAt: -1 });

export const Feedback = mongoose.model<IFeedbackDocument>('Feedback', FeedbackSchema);

// Team Configuration Interface
export interface ITeamConfig extends Document {
  name: string
  emailNotifications: string[]
  slackWebhook?: string
  teamsWebhook?: string
  customFields?: Record<string, any>
  processors?: string[]
  storage?: {
    enabled: boolean
    retention?: number
    path?: string
  }
  createdAt: Date
  updatedAt: Date
}

// Team Configuration Schema
const TeamConfigSchema = new Schema<ITeamConfig>({
  name: { type: String, required: true, unique: true },
  emailNotifications: [{ type: String, required: true }],
  slackWebhook: String,
  teamsWebhook: String,
  customFields: { type: Schema.Types.Mixed },
  processors: [{ type: String }],
  storage: {
    enabled: { type: Boolean, default: true },
    retention: { type: Number, default: 30 },
    path: String
  }
}, {
  timestamps: true
})

export const TeamConfig = mongoose.model<ITeamConfig>('TeamConfig', TeamConfigSchema)
import Joi from 'joi';

const connectionInfoSchema = Joi.object({
  effectiveType: Joi.string().required(),
  downlink: Joi.number().required(),
  rtt: Joi.number().required()
});

const systemInfoSchema = Joi.object({
  userAgent: Joi.string().required(),
  language: Joi.string().required(),
  platform: Joi.string().required(),
  screenResolution: Joi.string().required(),
  viewport: Joi.string().required(), // Changed from object to string
  timezone: Joi.string().required(),
  connection: connectionInfoSchema.required(),
  memory: Joi.string().required(),
  cores: Joi.number().required(),
  url: Joi.string().uri().required(),
  timestamp: Joi.string().isoDate().required(),
  referrer: Joi.string().allow('').optional()
});

const geoLocationSchema = Joi.object({
  country: Joi.string().allow('Unknown').required(),
  countryCode: Joi.string().allow('XX').required(),
  region: Joi.string().allow('Unknown').required(),
  regionCode: Joi.string().allow('XX').required(),
  city: Joi.string().allow('Unknown').required(),
  postal: Joi.string().allow('Unknown', '').optional(),
  continent: Joi.string().allow('Unknown').optional(),
  latitude: Joi.number().allow(null).optional(),
  longitude: Joi.number().allow(null).optional(),
  accuracy: Joi.number().allow(null).optional(),
  timezone: Joi.string().required(),
  locale: Joi.string().optional(),
  timestamp: Joi.string().isoDate().optional(),
  isp: Joi.string().allow('Unknown').optional(),
  org: Joi.string().allow('Unknown').optional(),
  ip: Joi.string().allow('Unknown').optional(),
  fallbackReason: Joi.string().optional()
});

const sessionRecordingSchema = Joi.object({
  type: Joi.number().required(),
  data: Joi.object().required(),
  timestamp: Joi.number().required()
});

const performanceMetricsSchema = Joi.object({
  loadTime: Joi.number().min(0).required(),
  domReady: Joi.number().min(0).required()
}).unknown(true); // Allow additional metrics

export const feedbackPayloadSchema = Joi.object({
  type: Joi.string().valid('bug', 'appreciation', 'feature').required(),
  description: Joi.string().min(1).max(5000).required(), // Changed from message to description
  email: Joi.string().email().required(),
  systemInfo: systemInfoSchema.required(),
  geoLocation: geoLocationSchema.allow(null).optional(),
  sessionRecording: Joi.array().items(sessionRecordingSchema).required(),
  performanceMetrics: performanceMetricsSchema.required(),
  team: Joi.string().optional() // Allow team override
});

export const teamConfigSchema = Joi.object({
  name: Joi.string().required(),
  emailNotifications: Joi.array().items(Joi.string().email()).min(1).required(),
  slackWebhook: Joi.string().uri().allow('').optional(),
  teamsWebhook: Joi.string().uri().allow('').optional(),
  customFields: Joi.object().optional(),
  processors: Joi.array().items(Joi.string()).optional(),
  storage: Joi.object({
    enabled: Joi.boolean().required(),
    retention: Joi.number().min(1).optional(),
    path: Joi.string().optional()
  }).optional()
});
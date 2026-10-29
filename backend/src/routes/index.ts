import { Router } from 'express';
import { FeedbackService } from '../services/FeedbackService';
import { ConfigManager } from '../config';

// Import individual route modules
import { createFeedbackRoutes } from './feedback';
import { createAnalyticsRoutes } from './analytics';
import { createConfigRoutes } from './config';
import { createAdminRoutes } from './admin';

/**
 * Creates and configures all API routes
 */
export function createRoutes(feedbackService: FeedbackService, configManager: ConfigManager): Router {
  const router = Router();

  // Mount individual route modules
  router.use('/feedback', createFeedbackRoutes(feedbackService));
  router.use('/analytics', createAnalyticsRoutes(feedbackService));
  router.use('/config', createConfigRoutes(configManager));
  router.use('/admin', createAdminRoutes(feedbackService, configManager));

  return router;
}

// Export individual route creators for flexibility
export {
  createFeedbackRoutes,
  createAnalyticsRoutes,
  createConfigRoutes,
  createAdminRoutes
};
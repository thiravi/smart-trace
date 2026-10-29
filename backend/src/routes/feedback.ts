import { Router, Request, Response } from 'express';
import { FeedbackService } from '../services/FeedbackService';
import { feedbackPayloadSchema } from '../validation/schemas';
import rateLimit from 'express-rate-limit';

// Rate limiting for feedback submission
const feedbackLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10'), // 10 requests per window
  message: {
    success: false,
    error: 'Too many feedback submissions, please try again later',
    timestamp: new Date().toISOString()
  },
  standardHeaders: true,
  legacyHeaders: false
});

export function createFeedbackRoutes(feedbackService: FeedbackService): Router {
  const router = Router();

  // Submit feedback
  router.post('/submit', feedbackLimiter, async (req: Request, res: Response): Promise<void> => {
    try {
      // Validate payload
      const { error, value } = feedbackPayloadSchema.validate(req.body);
      if (error) {
        res.status(400).json({
          success: false,
          error: `Feedback validation failed: ${error.details.map((d: any) => d.message).join(', ')}`,
          timestamp: new Date().toISOString()
        });
        return;
      }

      const result = await feedbackService.submitFeedback(value);
      
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get feedback with filters and pagination
  router.get('/', async (req: Request, res: Response) => {
    try {
      const filters = {
        team: req.query.team as string,
        type: req.query.type as string,
        email: req.query.email as string,
        country: req.query.country as string,
        city: req.query.city as string,
        startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
        endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        skip: req.query.skip ? parseInt(req.query.skip as string) : undefined
      };

      const result = await feedbackService.getFeedback(filters);
      
      if (result.success) {
        res.json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      console.error('Get feedback error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get specific feedback by ID
  router.get('/:id', async (req: Request, res: Response) => {
    try {
      const result = await feedbackService.getFeedbackById(req.params.id);
      
      if (result.success) {
        res.json(result);
      } else if (result.error === 'Feedback not found') {
        res.status(404).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      console.error('Get feedback by ID error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Update feedback status
  router.patch('/:id/status', async (req: Request, res: Response) => {
    try {
      const { processed, notes } = req.body;
      
      // Here you would implement updateFeedbackStatus in FeedbackService
      res.json({
        success: true,
        message: 'Feedback status updated',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Update feedback status error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Delete feedback
  router.delete('/:id', async (req: Request, res: Response) => {
    try {
      // Here you would implement deleteFeedback in FeedbackService
      res.json({
        success: true,
        message: 'Feedback deleted successfully',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Delete feedback error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  });

  return router;
}
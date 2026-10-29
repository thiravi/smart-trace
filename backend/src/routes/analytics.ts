import { Router, Request, Response } from 'express';
import { FeedbackService } from '../services/FeedbackService';

export function createAnalyticsRoutes(feedbackService: FeedbackService): Router {
  const router = Router();

  // Get analytics summary
  router.get('/summary', async (req: Request, res: Response) => {
    try {
      const filters = {
        team: req.query.team as string,
        startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
        endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined
      };

      const result = await feedbackService.getAnalytics(filters);
      
      if (result.success) {
        res.json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      console.error('Analytics summary error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to generate analytics summary',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get performance metrics
  router.get('/performance', async (req: Request, res: Response) => {
    try {
      const filters = {
        team: req.query.team as string,
        startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
        endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined
      };

      const result = await feedbackService.getAnalytics(filters);
      
      if (result.success) {
        res.json({
          success: true,
          data: {
            averageLoadTime: result.data.performanceMetrics.avgLoadTime,
            averageDomReady: result.data.performanceMetrics.avgDomReady,
            slowSessionsCount: result.data.performanceMetrics.slowSessions,
            performanceDistribution: []
          },
          timestamp: new Date().toISOString()
        });
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      console.error('Performance analytics error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to generate performance analytics',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get team analytics comparison
  router.get('/teams', async (req: Request, res: Response) => {
    try {
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

      // This would be implemented to compare analytics across teams
      res.json({
        success: true,
        data: {
          teamComparison: [],
          totalFeedbackByTeam: {},
          avgResponseTimeByTeam: {}
        },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Team analytics error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to generate team analytics',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get feedback trends over time
  router.get('/trends', async (req: Request, res: Response) => {
    try {
      const filters = {
        team: req.query.team as string,
        interval: (req.query.interval as 'day' | 'week' | 'month') || 'day',
        startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
        endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined
      };

      const result = await feedbackService.getTrends(filters);
      
      if (result.success) {
        res.json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      console.error('Trends analytics error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to generate trends analytics',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Export analytics data
  router.post('/export', async (req: Request, res: Response) => {
    try {
      const { format = 'json', filters = {} } = req.body;

      if (format === 'json') {
        const result = await feedbackService.getAnalytics(filters);
        
        if (result.success) {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Content-Disposition', 'attachment; filename="analytics-export.json"');
          res.json(result.data);
        } else {
          res.status(500).json(result);
        }
      } else if (format === 'csv') {
        // This would be implemented to export as CSV
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="analytics-export.csv"');
        res.send('CSV export not implemented yet');
      } else {
        res.status(400).json({
          success: false,
          error: 'Unsupported export format. Use "json" or "csv"',
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Export analytics error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to export analytics data',
        timestamp: new Date().toISOString()
      });
    }
  });

  return router;
}
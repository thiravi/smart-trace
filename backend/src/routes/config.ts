import { Router, Request, Response } from 'express';
import { ConfigManager } from '../config';
import { MongoDBService } from '../services/MongoDBService';
import { teamConfigSchema } from '../validation/schemas';

export function createConfigRoutes(configManager: ConfigManager): Router {
  const router = Router();
  const mongoDBService = new MongoDBService();

  // Get all teams configuration
  router.get('/teams', async (req: Request, res: Response) => {
    try {
      const config = configManager.getConfig();
      res.json({
        success: true,
        data: config.teams,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Get teams config error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch team configurations',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get specific team configuration
  router.get('/teams/:teamName', async (req: Request, res: Response): Promise<void> => {
    try {
      const teamConfig = configManager.getTeamConfig(req.params.teamName);
      
      if (!teamConfig) {
        res.status(404).json({
          success: false,
          error: 'Team not found',
          timestamp: new Date().toISOString()
        });
        return;
      }

      res.json({
        success: true,
        data: teamConfig,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Get team config error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch team configuration',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Create new team configuration
  router.post('/teams', async (req: Request, res: Response): Promise<void> => {
    try {
      const { teamName, ...config } = req.body
      
      if (!teamName) {
        res.status(400).json({
          success: false,
          error: 'Team name is required',
          timestamp: new Date().toISOString()
        })
        return
      }

      const { error, value } = teamConfigSchema.validate(config)
      if (error) {
        console.error('Validation error details:', error.details)
        res.status(400).json({
          success: false,
          error: `Validation error: ${error.details.map((d: any) => d.message).join(', ')}`,
          timestamp: new Date().toISOString()
        })
        return
      }

      const existingTeam = await mongoDBService.getTeamConfig(teamName)
      if (existingTeam) {
        res.status(400).json({
          success: false,
          error: 'Team already exists',
          timestamp: new Date().toISOString()
        })
        return
      }

      console.log('Creating team config with data:', { name: teamName, ...value })
      await mongoDBService.createTeamConfig({
        name: teamName,
        ...value
      })

      configManager.addTeam(teamName, value)
      
      res.status(201).json({
        success: true,
        message: 'Team added successfully',
        data: { teamName, ...value },
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error('Add team error:', error)
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to add team',
        timestamp: new Date().toISOString()
      })
    }
  });

  // Update team configuration
  router.put('/teams/:teamName', async (req: Request, res: Response): Promise<void> => {
    try {
      const { error, value } = teamConfigSchema.validate(req.body);
      if (error) {
        res.status(400).json({
          success: false,
          error: `Validation error: ${error.details.map((d: any) => d.message).join(', ')}`,
          timestamp: new Date().toISOString()
        });
        return;
      }

      const teamName = req.params.teamName;

      const existingTeam = configManager.getTeamConfig(teamName);
      if (!existingTeam) {
        res.status(404).json({
          success: false,
          error: 'Team not found',
          timestamp: new Date().toISOString()
        });
        return;
      }

      await mongoDBService.updateTeamConfig(teamName, value);

      configManager.updateTeamConfig(teamName, value);
      
      res.json({
        success: true,
        message: 'Team configuration updated successfully',
        data: value,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Update team config error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update team configuration',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Delete team configuration
  router.delete('/teams/:teamName', async (req: Request, res: Response): Promise<void> => {
    try {
      const teamName = req.params.teamName;
      const teamConfig = configManager.getTeamConfig(teamName);
      
      if (!teamConfig) {
        res.status(404).json({
          success: false,
          error: 'Team not found',
          timestamp: new Date().toISOString()
        });
        return;
      }

      await mongoDBService.deleteTeamConfig(teamName);

      configManager.removeTeam(teamName);

      res.json({
        success: true,
        message: 'Team configuration deleted successfully',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Delete team config error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete team configuration',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get global configuration
  router.get('/global', (req: Request, res: Response) => {
    try {
      const config = configManager.getConfig();
      res.json({
        success: true,
        data: {
          processors: config.processors,
          global: config.global
        },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Get global config error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch global configuration',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Update global configuration
  router.put('/global', (req: Request, res: Response) => {
    try {
      const { processors, global } = req.body;
      
      res.json({
        success: true,
        message: 'Global configuration updated successfully',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Update global config error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update global configuration',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get processor configurations
  router.get('/processors', (req: Request, res: Response) => {
    try {
      const config = configManager.getConfig();
      const enabledProcessors = configManager.getEnabledProcessors();
      
      res.json({
        success: true,
        data: {
          available: config.processors,
          enabled: enabledProcessors
        },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Get processors config error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch processor configurations',
        timestamp: new Date().toISOString()
      });
    }
  });

  return router;
}
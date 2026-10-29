import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import 'express-async-errors';

import { ConfigManager } from './config';
import { FeedbackService } from './services/FeedbackService';
import { createRoutes } from './routes';
import DatabaseManager from './config/database';

// Load environment variables
dotenv.config();

class PerformanceSnapBackend {
  private app: Application;
  private configManager: ConfigManager;
  private feedbackService: FeedbackService;
  private port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3000');
    this.configManager = new ConfigManager(process.env.CUSTOM_CONFIG_PATH);
    this.feedbackService = new FeedbackService(this.configManager);

    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddleware(): void {
    // Security middleware
    this.app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
    }));

    // CORS configuration - Allow file:// protocol and development origins
    this.app.use(cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, postman, or file:// protocol)
        if (!origin) return callback(null, true);
        
        // Define allowed origins
        const allowedOrigins = [
          'http://localhost:3000',
          'http://localhost:5173',
          'http://localhost:8080',
          'http://127.0.0.1:3000',
          'http://127.0.0.1:5173',
          'http://127.0.0.1:8080',
          ...(process.env.ALLOWED_ORIGINS?.split(',') || [])
        ];
        
        // Allow any localhost/127.0.0.1 origin in development
        if (process.env.NODE_ENV !== 'production') {
          if (origin.includes('localhost') || origin.includes('127.0.0.1') || origin === 'null') {
            return callback(null, true);
          }
        }
        
        // Check if origin is in allowed list
        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        
        // Reject the request
        callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
      optionsSuccessStatus: 200 // Some legacy browsers choke on 204
    }));

    // Compression and parsing
    this.app.use(compression());
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Request logging
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
      next();
    });
  }

  private initializeRoutes(): void {
    // Health check
    this.app.get('/health', (req: Request, res: Response) => {
      res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development'
      });
    });

    // API documentation
    this.app.get('/', (req: Request, res: Response) => {
      res.json({
        name: 'PerformanceSnap Backend',
        version: process.env.npm_package_version || '1.0.0',
        description: 'Highly customizable backend service for consuming PerformanceSnap feedback payloads',
        endpoints: {
          feedback: {
            submit: 'POST /api/feedback/submit',
            list: 'GET /api/feedback',
            getById: 'GET /api/feedback/:id',
            updateStatus: 'PATCH /api/feedback/:id/status',
            delete: 'DELETE /api/feedback/:id'
          },
          analytics: {
            summary: 'GET /api/analytics/summary',
            performance: 'GET /api/analytics/performance',
            teams: 'GET /api/analytics/teams',
            trends: 'GET /api/analytics/trends',
            export: 'POST /api/analytics/export'
          },
          config: {
            teams: 'GET /api/config/teams',
            team: 'GET /api/config/teams/:teamName',
            createTeam: 'POST /api/config/teams',
            updateTeam: 'PUT /api/config/teams/:teamName',
            deleteTeam: 'DELETE /api/config/teams/:teamName',
            global: 'GET /api/config/global',
            processors: 'GET /api/config/processors'
          },
          admin: {
            health: 'GET /api/admin/health',
            stats: 'GET /api/admin/stats',
            cleanup: 'POST /api/admin/data/cleanup',
            backup: 'POST /api/admin/backup',
            backups: 'GET /api/admin/backups',
            sessions: 'GET /api/admin/sessions',
            logs: 'GET /api/admin/logs',
            maintenance: 'POST /api/admin/maintenance/mode',
            clearCache: 'POST /api/admin/cache/clear'
          },
          health: 'GET /health'
        },
        documentation: 'https://github.com/your-org/performancesnap-backend#readme'
      });
    });

    // Mount all API routes
    this.app.use('/api', createRoutes(this.feedbackService, this.configManager));

    // 404 handler
    this.app.use('*', (req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        timestamp: new Date().toISOString()
      });
    });
  }

  private initializeErrorHandling(): void {
    // Global error handler
    this.app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      console.error('Unhandled error:', error);
      
      res.status(500).json({
        success: false,
        error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message,
        timestamp: new Date().toISOString()
      });
    });
  }

  public async start(): Promise<void> {
    try {
      // Initialize MongoDB connection
      await DatabaseManager.connect();
      console.log('✅ MongoDB connected successfully');
      
      // Start server
      this.app.listen(this.port, () => {
        console.log(`🚀 PerformanceSnap Backend running on port ${this.port}`);
        console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`🔗 Database: MongoDB (${process.env.MONGODB_URI || 'mongodb://localhost:27017/performancesnap'})`);
        console.log(`🔗 Health check: http://localhost:${this.port}/health`);
        console.log(`📖 API docs: http://localhost:${this.port}/`);
        
        // Log team configurations
        const teams = Object.keys(this.configManager.getConfig().teams);
        console.log(`👥 Configured teams: ${teams.join(', ')}`);
        
        // Log enabled processors
        const processors = this.configManager.getEnabledProcessors().map(p => p.name);
        console.log(`⚙️  Enabled processors: ${processors.join(', ')}`);
      });
      
    } catch (error) {
      console.error('❌ Failed to start server:', error);
      process.exit(1);
    }
  }

  public async stop(): Promise<void> {
    await DatabaseManager.disconnect();
    console.log('✅ Application stopped gracefully');
  }
}

// Start the application
const app = new PerformanceSnapBackend();

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('📴 SIGTERM received, shutting down gracefully...');
  await app.stop();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('📴 SIGINT received, shutting down gracefully...');
  await app.stop();
  process.exit(0);
});

// Start the server
app.start().catch((error) => {
  console.error('❌ Failed to start application:', error);
  process.exit(1);
});

export default PerformanceSnapBackend;
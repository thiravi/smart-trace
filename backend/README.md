# PerformanceSnap Backend Service

A highly customizable Node.js/TypeScript backend service for consuming PerformanceSnap feedback payloads. Designed for multi-team environments with configurable processors, analytics, and notification systems.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB 4.4+
- Redis (optional, for caching)

### Installation

```bash
# Clone and install dependencies
cd backend
npm install

# Copy environment configuration
cp .env.example .env

# Edit .env with your settings
nano .env

# Start development server
npm run dev
```

### Production Deployment

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## 🔧 Configuration

### Environment Variables

Configure your `.env` file based on `.env.example`:

- **Database**: MongoDB connection string
- **Email**: SMTP settings for notifications
- **Security**: Rate limiting and CORS settings
- **Team Configuration**: Default team and admin emails
- **Webhooks**: Slack/Teams integration URLs

### Team Configuration

The service supports multiple teams with different configurations:

```javascript
// Default team configurations
{
  "general": {
    "name": "General Team",
    "emailNotifications": ["general@company.com"],
    "processors": ["email", "storage"]
  },
  "frontend": {
    "name": "Frontend Team", 
    "emailNotifications": ["frontend@company.com"],
    "slackWebhook": "https://hooks.slack.com/...",
    "processors": ["email", "slack", "storage", "performance-analyzer"]
  }
}
```

### Custom Processors

The system includes built-in processors and supports custom ones:

- **EmailProcessor**: Rich HTML email notifications
- **SlackProcessor**: Slack channel notifications
- **StorageProcessor**: File system storage
- **PerformanceAnalyzerProcessor**: Performance analysis with recommendations

## 📡 API Endpoints

### Feedback Submission

```http
POST /api/feedback/submit
Content-Type: application/json

{
  "type": "bug",
  "description": "Page loads slowly",
  "email": "user@company.com",
  "systemInfo": { /* system data */ },
  "sessionRecording": [ /* rrweb events */ ],
  "performanceMetrics": {
    "loadTime": 1490,
    "domReady": 1354
  }
}
```

### Feedback Retrieval

```http
# Get all feedback
GET /api/feedback

# Filter by team
GET /api/feedback?team=frontend

# Filter by type and date range
GET /api/feedback?type=bug&startDate=2024-01-01&endDate=2024-01-31

# Get specific feedback
GET /api/feedback/:id
```

### Analytics

```http
# Get analytics summary
GET /api/feedback/analytics/summary

# Team-specific analytics
GET /api/feedback/analytics/summary?team=frontend
```

### Configuration Management

```http
# Get all team configurations
GET /api/config/teams

# Get specific team config
GET /api/config/teams/frontend

# Update team configuration
PUT /api/config/teams/frontend
Content-Type: application/json

{
  "name": "Frontend Team",
  "emailNotifications": ["frontend@company.com"],
  "processors": ["email", "slack", "performance-analyzer"]
}
```

## 🔄 Processing Pipeline

When feedback is submitted:

1. **Validation**: Joi schema validation
2. **Team Assignment**: URL-based or explicit team routing
3. **Database Storage**: MongoDB with indexing
4. **Processor Execution**: Parallel processing with configured processors
5. **Result Storage**: Processing results saved for audit

## 📊 Analytics Features

- Feedback volume by team/type
- Performance metrics aggregation
- Slow load time detection
- Browser/platform breakdown
- Team performance comparison

## 🛡️ Security Features

- Helmet.js security headers
- CORS configuration
- Rate limiting (configurable)
- Input validation with Joi
- Error handling and logging

## 🐳 Docker Deployment

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/performancesnap
    depends_on:
      - mongo
      
  mongo:
    image: mongo:5.0
    volumes:
      - mongo-data:/data/db
      
volumes:
  mongo-data:
```

## 📈 Scaling Considerations

### Multi-Instance Deployment

- Use Redis for session storage
- Configure MongoDB replica sets
- Load balancer for multiple instances
- Shared file storage for uploads

### Performance Optimization

- Database indexing on frequently queried fields
- Pagination for large datasets
- Async processing for heavy operations
- Compression for API responses

## 🔌 Custom Processor Development

Create custom processors by extending `BaseProcessor`:

```typescript
import { BaseProcessor } from './BaseProcessor';
import { FeedbackPayload, ProcessingResult } from '../types';

export class CustomProcessor extends BaseProcessor {
  name = 'custom-processor';

  async process(payload: FeedbackPayload, config: any): Promise<ProcessingResult> {
    return this.executeWithTiming(async () => {
      // Your custom processing logic
      return { processed: true };
    }, this.name);
  }
}
```

Register in `ProcessorRegistry`:

```typescript
processorRegistry.register(new CustomProcessor());
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Test specific endpoint
curl -X POST https://smart-trace-yr17.onrender.com/api/feedback/submit \
  -H "Content-Type: application/json" \
  -d @sample-payload.json
```

## 📝 Logging

Winston-based logging with configurable levels:

- Console output for development
- File output for production
- Structured JSON logging
- Request/response logging

## 🔍 Monitoring

Health check endpoint: `GET /health`

Returns:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0",
  "environment": "production"
}
```

## 🤝 Team Integration Examples

### Frontend Team Setup

```javascript
// Configure widget to use specific team
initSmartTrace({
  onFeedback: (data) => {
    fetch('/api/feedback/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, team: 'frontend' })
    });
  }
});
```

### Backend Team Setup

```javascript
// Auto-route based on URL patterns
// URLs containing '/admin' or '/api' automatically go to backend team
```

## 📋 Maintenance

### Database Cleanup

```bash
# Remove old feedback (configurable retention)
node scripts/cleanup-old-feedback.js

# Archive large session recordings
node scripts/archive-sessions.js
```

### Log Rotation

Configure log rotation in production:

```bash
# Using logrotate
/var/log/performancesnap/*.log {
  daily
  missingok
  rotate 30
  compress
  delaycompress
  notifempty
}
```

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check connection string in `.env`
   - Ensure MongoDB is running
   - Verify network connectivity

2. **Email Notifications Not Working**
   - Verify SMTP credentials
   - Check firewall/security settings
   - Test with a simple email client

3. **High Memory Usage**
   - Review session recording size limits
   - Implement data archiving
   - Monitor processor performance

### Debug Mode

```bash
# Enable debug logging
LOG_LEVEL=debug npm run dev

# Check processor execution
curl -X GET https://smart-trace-yr17.onrender.com/api/config/global
```

## 🔄 Updates & Migration

### Version Updates

```bash
# Update dependencies
npm update

# Run database migrations (if any)
npm run migrate

# Restart services
npm run build && npm start
```

### Configuration Changes

Team configurations can be updated via API without service restart:

```bash
# Update team processors
curl -X PUT https://smart-trace-yr17.onrender.com/api/config/teams/frontend \
  -H "Content-Type: application/json" \
  -d '{"processors": ["email", "slack", "new-processor"]}'
```

## 📞 Support

- **Issues**: Create GitHub issues for bugs
- **Features**: Submit feature requests
- **Documentation**: Check API documentation at `GET /`
- **Community**: Join Slack channel #performancesnap
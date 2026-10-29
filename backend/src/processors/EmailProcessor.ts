import nodemailer from 'nodemailer';
import { BaseProcessor } from './BaseProcessor';
import { FeedbackPayload, ProcessingResult } from '../types';

export class EmailProcessor extends BaseProcessor {
  name = 'email';
  private transporter: nodemailer.Transporter;

  constructor() {
    super();
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async process(payload: FeedbackPayload, config: any): Promise<ProcessingResult> {
    return this.executeWithTiming(async () => {
      const emailContent = this.generateEmailContent(payload, config);
      
      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: config.recipients || ['admin@company.com'],
        subject: `[${payload.type.toUpperCase()}] New Feedback from ${payload.email}`,
        html: emailContent,
        attachments: config.includeSessionData ? [{
          filename: 'session-data.json',
          content: JSON.stringify(payload.sessionRecording, null, 2),
          contentType: 'application/json'
        }] : []
      };

      const result = await this.transporter.sendMail(mailOptions);
      
      return {
        messageId: result.messageId,
        recipients: config.recipients,
        timestamp: new Date().toISOString()
      };
    }, this.name);
  }

  private generateEmailContent(payload: FeedbackPayload, config: any): string {
    const priority = payload.type === 'bug' ? 'High' : 'Normal';
    const performanceIssue = payload.performanceMetrics.loadTime > 3000 ? '⚠️ SLOW LOAD TIME' : '';
    
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: ${this.getTypeColor(payload.type)}; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0;">New ${payload.type.charAt(0).toUpperCase() + payload.type.slice(1)} Feedback ${performanceIssue}</h2>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">Priority: ${priority}</p>
        </div>
        
        <div style="padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px;">
          <div style="margin-bottom: 20px;">
            <strong>From:</strong> ${payload.email}<br>
            <strong>URL:</strong> <a href="${payload.systemInfo.url}">${payload.systemInfo.url}</a><br>
            <strong>Time:</strong> ${new Date(payload.systemInfo.timestamp).toLocaleString()}
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 10px;">Description</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; border-left: 4px solid ${this.getTypeColor(payload.type)};">
              ${payload.description.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 10px;">System Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 5px; background: #f8f9fa;"><strong>Browser:</strong></td><td style="padding: 5px;">${this.parseBrowser(payload.systemInfo.userAgent)}</td></tr>
              <tr><td style="padding: 5px; background: #f8f9fa;"><strong>Platform:</strong></td><td style="padding: 5px;">${payload.systemInfo.platform}</td></tr>
              <tr><td style="padding: 5px; background: #f8f9fa;"><strong>Screen:</strong></td><td style="padding: 5px;">${payload.systemInfo.screenResolution}</td></tr>
              <tr><td style="padding: 5px; background: #f8f9fa;"><strong>Viewport:</strong></td><td style="padding: 5px;">${payload.systemInfo.viewport}</td></tr>
              <tr><td style="padding: 5px; background: #f8f9fa;"><strong>Connection:</strong></td><td style="padding: 5px;">${payload.systemInfo.connection.effectiveType} (${payload.systemInfo.connection.downlink} Mbps)</td></tr>
              <tr><td style="padding: 5px; background: #f8f9fa;"><strong>Memory:</strong></td><td style="padding: 5px;">${payload.systemInfo.memory}</td></tr>
            </table>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 10px;">Performance Metrics</h3>
            <div style="display: flex; gap: 20px;">
              <div style="flex: 1; text-align: center; padding: 15px; background: ${payload.performanceMetrics.loadTime > 3000 ? '#fee' : '#efe'}; border-radius: 4px;">
                <div style="font-size: 24px; font-weight: bold; color: ${payload.performanceMetrics.loadTime > 3000 ? '#d00' : '#080'};">${payload.performanceMetrics.loadTime}ms</div>
                <div style="font-size: 12px; color: #666;">Load Time</div>
              </div>
              <div style="flex: 1; text-align: center; padding: 15px; background: ${payload.performanceMetrics.domReady > 2000 ? '#fee' : '#efe'}; border-radius: 4px;">
                <div style="font-size: 24px; font-weight: bold; color: ${payload.performanceMetrics.domReady > 2000 ? '#d00' : '#080'};">${payload.performanceMetrics.domReady}ms</div>
                <div style="font-size: 12px; color: #666;">DOM Ready</div>
              </div>
            </div>
          </div>
          
          ${config.includeSessionData ? `
          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 10px;">Session Recording</h3>
            <p style="color: #666; font-size: 14px;">Session recording data is attached as JSON file (${payload.sessionRecording.length} events)</p>
          </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  private getTypeColor(type: string): string {
    switch (type) {
      case 'bug': return '#dc3545';
      case 'feature': return '#007bff';
      case 'appreciation': return '#28a745';
      default: return '#6c757d';
    }
  }
}
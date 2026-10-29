import { Feedback, IFeedbackDocument, TeamConfig, ITeamConfig } from '../models/Feedback';
import { FeedbackPayload } from '../types';
import mongoose from 'mongoose';

export class MongoDBService {
  async createFeedback(payload: FeedbackPayload & { team: string }): Promise<string> {
    const feedbackData = {
      ...payload,
      processed: false,
      processingResults: {},
      metadata: {
        submittedAt: new Date().toISOString(),
        userAgent: payload.systemInfo.userAgent,
      }
    };

    const feedback = new Feedback(feedbackData);
    const savedFeedback = await feedback.save();
    return (savedFeedback._id as mongoose.Types.ObjectId).toString();
  }

  async updateFeedback(id: string, updates: Partial<IFeedbackDocument>): Promise<void> {
    await Feedback.findByIdAndUpdate(id, {
      ...updates,
      updatedAt: new Date()
    });
  }

  async getFeedbackById(id: string): Promise<IFeedbackDocument | null> {
    return await Feedback.findById(id).exec();
  }

  async getFeedback(filters: {
    team?: string;
    type?: string;
    email?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    skip?: number;
  } = {}): Promise<{ feedback: IFeedbackDocument[]; total: number }> {
    const query: any = {};

    // Apply filters
    if (filters.team) {
      query.team = filters.team;
    }
    if (filters.type) {
      query.type = filters.type;
    }
    if (filters.email) {
      query.email = filters.email;
    }
    if (filters.startDate || filters.endDate) {
      query.createdAt = {};
      if (filters.startDate) {
        query.createdAt.$gte = filters.startDate;
      }
      if (filters.endDate) {
        query.createdAt.$lte = filters.endDate;
      }
    }

    // Get total count
    const total = await Feedback.countDocuments(query);

    // Apply ordering and pagination
    const limit = Math.min(filters.limit || 50, 100);
    const skip = filters.skip || 0;

    const feedback = await Feedback
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .exec();

    return { feedback, total };
  }

  async getAnalytics(filters: {
    team?: string;
    startDate?: Date;
    endDate?: Date;
  } = {}): Promise<any> {
    const matchStage: any = {};

    // Apply filters
    if (filters.team) {
      matchStage.team = filters.team;
    }
    if (filters.startDate || filters.endDate) {
      matchStage.createdAt = {};
      if (filters.startDate) {
        matchStage.createdAt.$gte = filters.startDate;
      }
      if (filters.endDate) {
        matchStage.createdAt.$lte = filters.endDate;
      }
    }

    // Use MongoDB aggregation for analytics
    const analyticsResult = await Feedback.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalFeedback: { $sum: 1 },
          bugCount: {
            $sum: { $cond: [{ $eq: ['$type', 'bug'] }, 1, 0] }
          },
          featureCount: {
            $sum: { $cond: [{ $eq: ['$type', 'feature'] }, 1, 0] }
          },
          appreciationCount: {
            $sum: { $cond: [{ $eq: ['$type', 'appreciation'] }, 1, 0] }
          },
          avgLoadTime: { $avg: '$performanceMetrics.loadTime' },
          avgDomReady: { $avg: '$performanceMetrics.domReady' },
          slowLoadTimeCount: {
            $sum: { $cond: [{ $gt: ['$performanceMetrics.loadTime', 3000] }, 1, 0] }
          }
        }
      }
    ]);

    const analytics = analyticsResult[0] || {
      totalFeedback: 0,
      bugCount: 0,
      featureCount: 0,
      appreciationCount: 0,
      avgLoadTime: 0,
      avgDomReady: 0,
      slowLoadTimeCount: 0
    };

    // Team breakdown with proper typing
    const teamBreakdown = await Feedback.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$team',
          count: { $sum: 1 },
          totalLoadTime: { $sum: '$performanceMetrics.loadTime' }
        }
      },
      {
        $addFields: {
          avgLoadTime: { $divide: ['$totalLoadTime', '$count'] }
        }
      },
      { $sort: { count: -1 as const } }
    ]);

    return {
      summary: analytics,
      teamBreakdown,
      generatedAt: new Date().toISOString()
    };
  }

  async deleteFeedback(id: string): Promise<void> {
    await Feedback.findByIdAndDelete(id);
  }

  // Team configuration methods
  async createTeamConfig(config: Omit<ITeamConfig, '_id' | 'createdAt' | 'updatedAt'>): Promise<ITeamConfig> {
    const teamConfig = new TeamConfig(config);
    return await teamConfig.save();
  }

  async getTeamConfig(name: string): Promise<ITeamConfig | null> {
    return await TeamConfig.findOne({ name }).exec();
  }

  async updateTeamConfig(name: string, updates: Partial<ITeamConfig>): Promise<void> {
    await TeamConfig.findOneAndUpdate({ name }, updates);
  }

  async deleteTeamConfig(name: string): Promise<void> {
    await TeamConfig.findOneAndDelete({ name });
  }

  // Utility method to create indexes (call this during deployment)
  async createIndexes(): Promise<void> {
    console.log('MongoDB indexes will be created automatically based on schema definitions');
    console.log('Indexes created for:');
    console.log('- Feedback: team, type, email, processed, createdAt');
    console.log('- TeamConfig: name (unique)');
  }
}
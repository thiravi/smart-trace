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
    country?: string;
    city?: string;
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
    if (filters.country) {
      query['geoLocation.country'] = { $regex: filters.country, $options: 'i' };
    }
    if (filters.city) {
      query['geoLocation.city'] = { $regex: filters.city, $options: 'i' };
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
    const matchStage: any = {}

    if (filters.team) matchStage.team = filters.team
    if (filters.startDate || filters.endDate) {
      matchStage.createdAt = {}
      if (filters.startDate) matchStage.createdAt.$gte = filters.startDate
      if (filters.endDate) matchStage.createdAt.$lte = filters.endDate
    }

    // Get main analytics
    const analyticsResult = await Feedback.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalFeedback: { $sum: 1 },
          bugCount: { $sum: { $cond: [{ $eq: ['$type', 'bug'] }, 1, 0] } },
          featureCount: { $sum: { $cond: [{ $eq: ['$type', 'feature'] }, 1, 0] } },
          appreciationCount: { $sum: { $cond: [{ $eq: ['$type', 'appreciation'] }, 1, 0] } },
          otherCount: { 
            $sum: { 
              $cond: [
                { 
                  $and: [
                    { $ne: ['$type', 'bug'] },
                    { $ne: ['$type', 'feature'] },
                    { $ne: ['$type', 'appreciation'] }
                  ]
                }, 
                1, 
                0
              ] 
            } 
          },
          avgLoadTime: { $avg: '$performanceMetrics.loadTime' },
          avgDomReady: { $avg: '$performanceMetrics.domReady' },
          slowSessionsCount: { $sum: { $cond: [{ $gt: ['$performanceMetrics.loadTime', 3000] }, 1, 0] } }
        }
      }
    ])

    const summary = analyticsResult[0] || {
      totalFeedback: 0,
      bugCount: 0,
      featureCount: 0,
      appreciationCount: 0,
      otherCount: 0,
      avgLoadTime: 0,
      avgDomReady: 0,
      slowSessionsCount: 0
    }

    // Get top countries
    const topCountries = await Feedback.aggregate([
      { $match: matchStage },
      { $match: { 'geoLocation.country': { $exists: true, $ne: 'Unknown' } } },
      {
        $group: {
          _id: '$geoLocation.country',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 0,
          country: '$_id',
          count: 1
        }
      }
    ])

    // Get top cities
    const topCities = await Feedback.aggregate([
      { $match: matchStage },
      { $match: { 'geoLocation.city': { $exists: true, $ne: 'Unknown' } } },
      {
        $group: {
          _id: '$geoLocation.city',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 0,
          city: '$_id',
          count: 1
        }
      }
    ])

    return {
      totalFeedback: summary.totalFeedback,
      bugCount: summary.bugCount,
      featureCount: summary.featureCount,
      appreciationCount: summary.appreciationCount,
      otherCount: summary.otherCount,
      avgResponseTime: 24, // Mock value - would need to track actual response times
      topCountries,
      topCities,
      performanceMetrics: {
        avgLoadTime: summary.avgLoadTime || 0,
        avgDomReady: summary.avgDomReady || 0,
        slowSessions: summary.slowSessionsCount
      }
    }
  }

  async getTrends(filters: {
    team?: string;
    startDate?: Date;
    endDate?: Date;
    interval?: 'day' | 'week' | 'month';
  } = {}): Promise<any> {
    const matchStage: any = {}

    if (filters.team) matchStage.team = filters.team
    
    const now = new Date()
    const startDate = filters.startDate || new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const endDate = filters.endDate || now

    matchStage.createdAt = {
      $gte: startDate,
      $lte: endDate
    }

    // Determine date format based on interval
    const interval = filters.interval || 'day'
    let dateFormat: string
    
    switch (interval) {
      case 'month':
        dateFormat = '%Y-%m'
        break
      case 'week':
        dateFormat = '%Y-%U'
        break
      default:
        dateFormat = '%Y-%m-%d'
    }

    const timeline = await Feedback.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { $dateToString: { format: dateFormat, date: '$createdAt' } },
          total: { $sum: 1 },
          bugs: { $sum: { $cond: [{ $eq: ['$type', 'bug'] }, 1, 0] } },
          features: { $sum: { $cond: [{ $eq: ['$type', 'feature'] }, 1, 0] } },
          appreciation: { $sum: { $cond: [{ $eq: ['$type', 'appreciation'] }, 1, 0] } }
        }
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          _id: 0,
          date: '$_id',
          total: 1,
          bugs: 1,
          features: 1,
          appreciation: 1
        }
      }
    ])

    const totalFeedback = timeline.reduce((sum, item) => sum + item.total, 0)
    const growthRate = this.calculateGrowthRate(timeline)

    return {
      timeline,
      totalFeedback,
      growthRate
    }
  }

  private calculateGrowthRate(timeline: any[]): number {
    if (timeline.length < 2) return 0

    const firstPeriod = timeline[0]?.total || 0
    const lastPeriod = timeline[timeline.length - 1]?.total || 0

    if (firstPeriod === 0) return 0

    return ((lastPeriod - firstPeriod) / firstPeriod) * 100
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
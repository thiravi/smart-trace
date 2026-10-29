import mongoose from 'mongoose';

export class DatabaseManager {
  private static instance: DatabaseManager;
  
  private constructor() {}
  
  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }
  
  async connect(): Promise<void> {
    try {
      const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/performancesnap';
      
      await mongoose.connect(uri, {
        maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || '10'),
        serverSelectionTimeoutMS: parseInt(process.env.DB_CONNECTION_TIMEOUT || '30000'),
        socketTimeoutMS: 45000
      });
      
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }
  
  async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('MongoDB disconnection error:', error);
    }
  }
  
  getConnection() {
    return mongoose.connection;
  }
}

export default DatabaseManager.getInstance();
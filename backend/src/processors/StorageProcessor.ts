import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { BaseProcessor } from './BaseProcessor';
import { FeedbackPayload, ProcessingResult } from '../types';

export class StorageProcessor extends BaseProcessor {
  name = 'storage';

  async process(payload: FeedbackPayload, config: any): Promise<ProcessingResult> {
    return this.executeWithTiming(async () => {
      const storagePath = config.path || './uploads';
      const fileName = `feedback-${uuidv4()}.json`;
      const filePath = path.join(storagePath, fileName);

      // Ensure directory exists
      await fs.mkdir(storagePath, { recursive: true });

      // Prepare data for storage
      const storageData = {
        ...payload,
        metadata: {
          storedAt: new Date().toISOString(),
          fileName,
          processor: this.name,
          compression: config.compression || false
        }
      };

      // Write to file
      const content = JSON.stringify(storageData, null, config.pretty ? 2 : 0);
      await fs.writeFile(filePath, content, 'utf8');

      // Create session recording file if enabled
      let sessionFilePath = null;
      if (config.separateSessionFile && payload.sessionRecording.length > 0) {
        const sessionFileName = `session-${uuidv4()}.json`;
        sessionFilePath = path.join(storagePath, sessionFileName);
        await fs.writeFile(sessionFilePath, JSON.stringify(payload.sessionRecording, null, 2), 'utf8');
      }

      return {
        filePath,
        sessionFilePath,
        fileName,
        size: content.length,
        timestamp: new Date().toISOString()
      };
    }, this.name);
  }
}
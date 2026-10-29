import { FeedbackProcessor, FeedbackPayload, ProcessingResult } from '../types';
import { EmailProcessor } from './EmailProcessor';
import { SlackProcessor } from './SlackProcessor';
import { StorageProcessor } from './StorageProcessor';
import { PerformanceAnalyzerProcessor } from './PerformanceAnalyzerProcessor';

export class ProcessorRegistry {
  private processors: Map<string, FeedbackProcessor> = new Map();

  constructor() {
    this.registerDefaultProcessors();
  }

  private registerDefaultProcessors() {
    this.register(new EmailProcessor());
    this.register(new SlackProcessor());
    this.register(new StorageProcessor());
    this.register(new PerformanceAnalyzerProcessor());
  }

  register(processor: FeedbackProcessor): void {
    this.processors.set(processor.name, processor);
  }

  unregister(name: string): boolean {
    return this.processors.delete(name);
  }

  get(name: string): FeedbackProcessor | undefined {
    return this.processors.get(name);
  }

  getAll(): FeedbackProcessor[] {
    return Array.from(this.processors.values());
  }

  async processWithProcessors(
    payload: FeedbackPayload,
    processorNames: string[],
    configs: Record<string, any>
  ): Promise<ProcessingResult[]> {
    const results: ProcessingResult[] = [];

    for (const processorName of processorNames) {
      const processor = this.get(processorName);
      if (!processor) {
        results.push({
          processor: processorName,
          success: false,
          error: `Processor '${processorName}' not found`,
          duration: 0
        });
        continue;
      }

      try {
        const config = configs[processorName] || {};
        const result = await processor.process(payload, config);
        results.push(result);
      } catch (error) {
        results.push({
          processor: processorName,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          duration: 0
        });
      }
    }

    return results;
  }
}
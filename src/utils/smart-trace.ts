import React from 'react';
import { createRoot } from 'react-dom/client';
import TimeMachineWidget from '../components/TimeMachineWidget';
import '../widget.css';

// Global configuration interface
interface SmartTraceConfig {
  apiKey?: string;
  apiEndpoint?: string;
  autoStart?: boolean;
  showRecordingControl?: boolean;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  onFeedback?: (data: FeedbackData) => void;
}

interface FeedbackData {
  type: string;
  description: string;
  email?: string;
  systemInfo: Record<string, unknown>;
  sessionRecording: unknown[];
  performanceMetrics: Record<string, number>;
}

class SmartTrace {
  private config: SmartTraceConfig;
  private container: HTMLDivElement | null = null;
  private root: ReturnType<typeof createRoot> | null = null;

  constructor(config: SmartTraceConfig = {}) {
    this.config = {
      autoStart: true,
      showRecordingControl: false,
      position: 'bottom-right',
      ...config
    };
    
    this.init();
  }

  private init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.render());
    } else {
      this.render();
    }
  }

  private render() {
    // Create container
    this.container = document.createElement('div');
    this.container.id = 'smart-trace-widget';
    this.container.style.position = 'fixed';
    this.container.style.zIndex = '999999';
    this.container.style.pointerEvents = 'none';
    
    // Set position
    this.setPosition();
    
    document.body.appendChild(this.container);
    
    // Setup feedback handler
    if (this.config.onFeedback) {
      (window as Window & { onTimeMachineFeedback?: (data: FeedbackData) => void }).onTimeMachineFeedback = this.config.onFeedback;
    }
    
    // Render React component
    this.root = createRoot(this.container);
    this.root.render(
      React.createElement('div', {
        style: { pointerEvents: 'auto' }
      }, React.createElement(TimeMachineWidget, {
        showRecordingControl: this.config.showRecordingControl
      } as any))
    );
  }

  private setPosition() {
    if (!this.container) return;
    
    // Reset all position styles
    this.container.style.top = 'auto';
    this.container.style.bottom = 'auto';
    this.container.style.left = 'auto';
    this.container.style.right = 'auto';
    
    switch (this.config.position) {
      case 'bottom-right':
        this.container.style.bottom = '24px';
        this.container.style.right = '24px';
        break;
      case 'bottom-left':
        this.container.style.bottom = '24px';
        this.container.style.left = '24px';
        break;
      case 'top-right':
        this.container.style.top = '24px';
        this.container.style.right = '24px';
        break;
      case 'top-left':
        this.container.style.top = '24px';
        this.container.style.left = '24px';
        break;
    }
  }

  // Public methods
  public updateConfig(newConfig: Partial<SmartTraceConfig>) {
    this.config = { ...this.config, ...newConfig };
    if (newConfig.position && this.container) {
      this.setPosition();
    }
  }

  public destroy() {
    if (this.root) {
      this.root.unmount();
    }
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.container = null;
    this.root = null;
  }
}

// Global initialization function
function initSmartTrace(config?: SmartTraceConfig) {
  return new SmartTrace(config);
}

// Auto-initialize if config is found on window
if (typeof window !== 'undefined') {
  // Make classes available globally
  (window as Window & { 
    SmartTrace?: typeof SmartTrace;
    initSmartTrace?: typeof initSmartTrace;
    SmartTraceConfig?: SmartTraceConfig;
  }).SmartTrace = SmartTrace;
  (window as Window & { 
    SmartTrace?: typeof SmartTrace;
    initSmartTrace?: typeof initSmartTrace;
    SmartTraceConfig?: SmartTraceConfig;
  }).initSmartTrace = initSmartTrace;
  
  // Auto-initialize if config exists
  const globalConfig = (window as Window & { SmartTraceConfig?: SmartTraceConfig }).SmartTraceConfig;
  if (globalConfig) {
    initSmartTrace(globalConfig);
  }
}

export { SmartTrace, initSmartTrace, type SmartTraceConfig, type FeedbackData };
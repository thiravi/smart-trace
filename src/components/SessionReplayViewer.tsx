import { useEffect, useRef, useState } from 'react';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
import { X, Play, Download, Mail, Monitor, AlertCircle, Heart, Lightbulb, Maximize, ChevronDown, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface SessionReplayViewerProps {
  events: unknown[];
  onClose: () => void;
  feedbackInfo?: {
    type: string;
    description: string;
    email?: string;
    timestamp: string;
    systemInfo?: {
      userAgent: string;
      language: string;
      platform: string;
      screenResolution: string;
      viewport: string;
      timezone: string;
      connection: {
        effectiveType: string;
        downlink: number;
        rtt: number;
      };
      memory: string;
      cores: number;
      url: string;
    };
    performanceMetrics?: {
      loadTime: number;
      domReady: number;
      firstContentfulPaint?: number;
      largestContentfulPaint?: number;
      cumulativeLayoutShift?: number;
    };
  };
}

const SessionReplayViewer = ({ events, onClose, feedbackInfo }: SessionReplayViewerProps) => {
  const playerRef = useRef<any>(null);
  const replayContainerRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [duration, setDuration] = useState(0);
  const [selectedTab, setSelectedTab] = useState('replay');
  const [isInFullscreen, setIsInFullscreen] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string>('');

  useEffect(() => {
    const handleFullscreenChange = () => {
      const inFullscreen = !!document.fullscreenElement;
      setIsInFullscreen(inFullscreen);
      
      if (!inFullscreen && playerRef.current) {
        try {
          playerRef.current.$destroy();
        } catch {}
        playerRef.current = null;
        if (replayContainerRef.current) {
          replayContainerRef.current.innerHTML = '';
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (!isInFullscreen || selectedTab !== 'replay') {
      return;
    }

    if (!events || events.length === 0) return;

    const container = replayContainerRef.current;
    if (!container) return;

    if (playerRef.current && typeof playerRef.current.$destroy === 'function') {
      try { playerRef.current.$destroy(); } catch {}
      playerRef.current = null;
    }
    
    container.innerHTML = '';

    const initPlayer = () => {
      if (!container) return;

      playerRef.current = new rrwebPlayer({
        target: container,
        props: {
          events: events as any[],
          autoPlay: true,
          showController: true,
          speedOption: [0.5, 1, 1.5, 2, 4, 8],
          skipInactive: true,
          showWarning: true,
        },
      });

      setTimeout(() => {
        const styleEl = document.createElement('style');
        styleEl.id = 'rrweb-fix';
        styleEl.textContent = `
          #replay-container:fullscreen {
            background: #0f172a !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 20px !important;
            width: 100vw !important;
            height: 100vh !important;
            overflow: hidden !important;
          }
          
          #replay-container:fullscreen .rr-player {
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            max-height: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            margin: 0 !important;
            padding: 0 !important;
            border-radius: 8px !important;
            overflow: hidden !important;
          }

          #replay-container:fullscreen .rr-player__frame {
            flex: 1 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            overflow: hidden !important;
            position: relative !important;
            width: 100% !important;
            height: 100% !important;
          }

          #replay-container:fullscreen .replayer-wrapper {
            max-width: 100% !important;
            max-height: 100% !important;
            margin: 0 auto !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }

          #replay-container:fullscreen .replayer-wrapper > iframe {
            max-width: 100% !important;
            max-height: calc(100vh - 120px) !important;
            object-fit: contain !important;
          }

          #replay-container .rr-player {
            width: 100% !important;
            height: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          #replay-container .rr-player__frame {
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            flex: 1 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            overflow: auto !important;
          }
          
          #replay-container .replayer-wrapper {
            position: relative !important;
            margin: 0 auto !important;
          }
        `;
        document.getElementById('rrweb-fix')?.remove();
        document.head.appendChild(styleEl);

        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        const player = container.querySelector('.rr-player') as HTMLElement;
        if (player) {
          player.style.display = 'flex';
          player.style.flexDirection = 'column';
          player.style.width = '100%';
          player.style.height = '100%';
        }
      }, 100);
    };

    if (container.clientWidth === 0 || container.clientHeight === 0) {
      setTimeout(() => initPlayer(), 50);
    } else {
      initPlayer();
    }
  }, [events, selectedTab, isInFullscreen]);

  useEffect(() => {
    const firstEvent = events[0] as any;
    const lastEvent = events[events.length - 1] as any;
    if (firstEvent?.timestamp && lastEvent?.timestamp) {
      setDuration(lastEvent.timestamp - firstEvent.timestamp);
    }
  }, [events]);

  useEffect(() => {
    return () => {
      if (playerRef.current && typeof playerRef.current.$destroy === 'function') {
        try { playerRef.current.$destroy(); } catch {}
        playerRef.current = null;
      }
      document.getElementById('rrweb-fix')?.remove();
    };
  }, []);

  const launchFullscreenPlayer = async () => {
    if (!replayContainerRef.current) return;

    try {
      await replayContainerRef.current.requestFullscreen();
    } catch (err) {
      console.error('Fullscreen request failed:', err);
    }
  };

  const handleClose = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
    onClose();
  };

  const formatTime = (timestamp: number) => {
    const seconds = Math.floor(timestamp / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
    }
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bug': return <AlertCircle className="w-5 h-5" />;
      case 'appreciation': return <Heart className="w-5 h-5" />;
      case 'feature': return <Lightbulb className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'bug': return 'bg-red-500 text-white';
      case 'appreciation': return 'bg-pink-500 text-white';
      case 'feature': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const downloadSession = () => {
    const data = {
      feedbackInfo,
      events,
      exportedAt: new Date().toISOString(),
      metadata: {
        eventCount: events.length,
        duration: duration,
        userAgent: feedbackInfo?.systemInfo?.userAgent || 'Unknown'
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `session-replay-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const downloadSessionAsCSV = () => {
    const csvRows: string[] = [];
    
    csvRows.push([
      'Feedback Type',
      'Description',
      'Email',
      'Timestamp',
      'Platform',
      'User Agent',
      'Language',
      'Screen Resolution',
      'Viewport',
      'Timezone',
      'Connection Type',
      'Connection Downlink (Mbps)',
      'Connection RTT (ms)',
      'Memory',
      'CPU Cores',
      'URL',
      'Load Time (s)',
      'DOM Ready (s)',
      'First Contentful Paint (s)',
      'Largest Contentful Paint (s)',
      'Cumulative Layout Shift',
      'Event Count',
      'Session Duration (s)',
      'Exported At'
    ].map(field => `"${field}"`).join(','));

    const row = [
      feedbackInfo?.type || '',
      (feedbackInfo?.description || '').replace(/"/g, '""'),
      feedbackInfo?.email || '',
      feedbackInfo?.timestamp || '',
      feedbackInfo?.systemInfo?.platform || '',
      (feedbackInfo?.systemInfo?.userAgent || '').replace(/"/g, '""'),
      feedbackInfo?.systemInfo?.language || '',
      feedbackInfo?.systemInfo?.screenResolution || '',
      feedbackInfo?.systemInfo?.viewport || '',
      feedbackInfo?.systemInfo?.timezone || '',
      feedbackInfo?.systemInfo?.connection?.effectiveType || '',
      feedbackInfo?.systemInfo?.connection?.downlink?.toString() || '',
      feedbackInfo?.systemInfo?.connection?.rtt?.toString() || '',
      feedbackInfo?.systemInfo?.memory || '',
      feedbackInfo?.systemInfo?.cores?.toString() || '',
      feedbackInfo?.systemInfo?.url || '',
      feedbackInfo?.performanceMetrics?.loadTime ? (feedbackInfo.performanceMetrics.loadTime / 1000).toFixed(2) : '',
      feedbackInfo?.performanceMetrics?.domReady ? (feedbackInfo.performanceMetrics.domReady / 1000).toFixed(2) : '',
      feedbackInfo?.performanceMetrics?.firstContentfulPaint ? (feedbackInfo.performanceMetrics.firstContentfulPaint / 1000).toFixed(2) : '',
      feedbackInfo?.performanceMetrics?.largestContentfulPaint ? (feedbackInfo.performanceMetrics.largestContentfulPaint / 1000).toFixed(2) : '',
      feedbackInfo?.performanceMetrics?.cumulativeLayoutShift?.toString() || '',
      events.length.toString(),
      (duration / 1000).toFixed(2),
      new Date().toISOString()
    ].map(field => `"${field}"`).join(',');

    csvRows.push(row);

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `session-replay-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const analyzeWithAI = async () => {
    setIsAnalyzing(true);
    setAnalysisError('');
    
    try {
      // Prepare the context for AI analysis
      const context = {
        bugDescription: feedbackInfo?.description || '',
        url: feedbackInfo?.systemInfo?.url || '',
        userAgent: feedbackInfo?.systemInfo?.userAgent || '',
        platform: feedbackInfo?.systemInfo?.platform || '',
        screenResolution: feedbackInfo?.systemInfo?.screenResolution || '',
        viewport: feedbackInfo?.systemInfo?.viewport || '',
        connection: feedbackInfo?.systemInfo?.connection || { effectiveType: 'Unknown', downlink: 0, rtt: 0 },
        memory: feedbackInfo?.systemInfo?.memory || '',
        performanceMetrics: feedbackInfo?.performanceMetrics || { loadTime: 0, domReady: 0, firstContentfulPaint: 0 },
        eventCount: events.length,
        sessionDuration: duration
      };

      const prompt = `You are an expert software debugging assistant. Analyze the following bug report and provide detailed insights:

**Bug Description:** ${context.bugDescription}

**Technical Context:**
- URL: ${context.url}
- Platform: ${context.platform}
- User Agent: ${context.userAgent}
- Screen Resolution: ${context.screenResolution}
- Viewport: ${context.viewport}
- Memory: ${context.memory}
- Connection: ${context.connection.effectiveType} (${context.connection.downlink} Mbps, RTT: ${context.connection.rtt}ms)

**Performance Metrics:**
- Load Time: ${context.performanceMetrics.loadTime ? (context.performanceMetrics.loadTime / 1000).toFixed(2) : 'N/A'}s
- DOM Ready: ${context.performanceMetrics.domReady ? (context.performanceMetrics.domReady / 1000).toFixed(2) : 'N/A'}s
- First Contentful Paint: ${context.performanceMetrics.firstContentfulPaint ? (context.performanceMetrics.firstContentfulPaint / 1000).toFixed(2) : 'N/A'}s

**Session Info:**
- Event Count: ${context.eventCount}
- Session Duration: ${(context.sessionDuration / 1000).toFixed(2)}s

Please provide:
1. **Root Cause Analysis**: What might be causing this issue?
2. **Potential Issues**: List specific technical problems that could lead to this bug
3. **Recommended Actions**: Step-by-step debugging suggestions
4. **Prevention**: How to prevent similar issues in the future

Format your response with clear sections and bullet points for easy reading.`;

      // Use OpenAI API (you can replace with any AI service)
      // For demo purposes, we'll simulate AI response or use a public API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY || 'YOUR_API_KEY'}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are an expert software debugging assistant specializing in web application issues.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1500
        })
      });

      if (!response.ok) {
        // Fallback to local analysis if API fails
        throw new Error('AI service unavailable');
      }

      const data = await response.json();
      const analysis = data.choices[0]?.message?.content || 'Unable to generate analysis';
      setAiAnalysis(analysis);
    } catch (error) {
      console.error('AI analysis error:', error);
      // Provide a rule-based analysis as fallback
      const fallbackAnalysis = generateFallbackAnalysis(feedbackInfo, events, duration);
      setAiAnalysis(fallbackAnalysis);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateFallbackAnalysis = (feedback: any, events: unknown[], duration: number) => {
    console.log('for future analysis', feedback, events, duration);
    const metrics = feedback?.performanceMetrics || {};
    const systemInfo = feedback?.systemInfo || {};
    
    let analysis = '## 🔍 Bug Analysis Report\n\n';
    
    // Root Cause Analysis
    analysis += '### 1. Root Cause Analysis\n\n';
    analysis += `**Issue Description:** ${feedback?.description || 'No description provided'}\n\n`;
    
    // Performance Issues
    if (metrics.loadTime > 5000) {
      analysis += '⚠️ **Slow Load Time Detected**: The page load time exceeds 5 seconds, which could contribute to user frustration and potential bugs.\n\n';
    }
    
    if (metrics.firstContentfulPaint > 3000) {
      analysis += '⚠️ **Poor First Contentful Paint**: Content is taking too long to appear, potentially affecting user interactions.\n\n';
    }
    
    // Memory Issues
    if (systemInfo.memory && parseInt(systemInfo.memory) < 4) {
      analysis += '⚠️ **Low Memory Environment**: The device has limited memory which could cause performance issues.\n\n';
    }
    
    // Connection Issues
    if (systemInfo.connection?.effectiveType === 'slow-2g' || systemInfo.connection?.effectiveType === '2g') {
      analysis += '⚠️ **Slow Network Connection**: The user is on a slow network which could cause loading issues and timeouts.\n\n';
    }
    
    // Viewport Issues
    if (systemInfo.viewport) {
      const [width] = systemInfo.viewport.split('x').map(Number);
      if (width < 768) {
        analysis += '⚠️ **Mobile Viewport**: The issue occurred on a mobile device. Check for responsive design issues.\n\n';
      }
    }
    
    // Potential Issues
    analysis += '### 2. Potential Technical Issues\n\n';
    analysis += '- **Browser Compatibility**: Check if the issue is browser-specific based on the User Agent\n';
    analysis += '- **JavaScript Errors**: Review console logs for runtime errors\n';
    analysis += '- **API Failures**: Verify all API calls are completing successfully\n';
    analysis += '- **Race Conditions**: Check for timing-related issues in asynchronous operations\n';
    analysis += '- **CSS Layout Issues**: Inspect element positioning and styling\n\n';
    
    // Recommended Actions
    analysis += '### 3. Recommended Debugging Steps\n\n';
    analysis += '1. **Reproduce the Issue**:\n';
    analysis += `   - Use the same browser: ${systemInfo.platform || 'Unknown'}\n`;
    analysis += `   - Set viewport to: ${systemInfo.viewport || 'Unknown'}\n`;
    analysis += `   - Navigate to: ${systemInfo.url || 'Unknown'}\n\n`;
    
    analysis += '2. **Review Session Replay**:\n';
    analysis += '   - Watch the recorded session to see exact user actions\n';
    analysis += `   - Pay attention to the ${events.length} captured events\n`;
    analysis += '   - Look for UI glitches or unexpected behavior\n\n';
    
    analysis += '3. **Check Performance**:\n';
    analysis += '   - Optimize slow-loading resources\n';
    analysis += '   - Review network waterfall in DevTools\n';
    analysis += '   - Check for memory leaks\n\n';
    
    analysis += '4. **Test Fixes**:\n';
    analysis += '   - Apply fixes in a staging environment\n';
    analysis += '   - Test with similar system configuration\n';
    analysis += '   - Verify across different browsers and devices\n\n';
    
    // Prevention
    analysis += '### 4. Prevention Strategies\n\n';
    analysis += '- **Implement Error Boundaries**: Catch and handle React component errors gracefully\n';
    analysis += '- **Add Input Validation**: Validate user inputs to prevent unexpected states\n';
    analysis += '- **Improve Error Handling**: Add try-catch blocks and proper error messages\n';
    analysis += '- **Performance Monitoring**: Set up real-time performance tracking\n';
    analysis += '- **Automated Testing**: Write unit and integration tests for critical paths\n';
    analysis += '- **Progressive Enhancement**: Ensure core functionality works on slower devices\n\n';
    
    analysis += '---\n\n';
    analysis += '*💡 This analysis was generated based on the technical data collected. Review the session replay and system information for more context.*';
    
    return analysis;
  };

  // Auto-generate analysis when AI Analysis tab is selected for the first time
  useEffect(() => {
    if (selectedTab === 'ai-analysis' && !aiAnalysis && !isAnalyzing && feedbackInfo?.type === 'bug') {
      analyzeWithAI();
    }
  }, [selectedTab]);

  return (
    <div ref={modalRef} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-2">
      <div className="bg-white rounded-2xl shadow-2xl max-w-[95vw] w-full max-h-[95vh] overflow-hidden flex flex-col">
        <div className="bg-slate-800 p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Session Replay</h1>
                <p className="text-slate-400 text-sm">
                  Interactive session recording analysis
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="flex items-center space-x-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-sm"
                  title="Export Session Data"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showExportMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowExportMenu(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-20">
                      <button
                        onClick={downloadSession}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export as JSON</span>
                      </button>
                      <button
                        onClick={downloadSessionAsCSV}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export as CSV</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={handleClose}
                className="hover:bg-slate-700 rounded-lg p-2 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-100 px-4 py-2 border-b border-gray-200">
          <div className="flex space-x-1">
            {[
              { id: 'replay', label: 'Session Replay', icon: Play },
              { id: 'feedback', label: 'Feedback Details', icon: AlertCircle },
              { id: 'technical', label: 'Technical Info', icon: Monitor },
              ...(feedbackInfo?.type === 'bug' ? [{ id: 'ai-analysis', label: 'AI Analysis', icon: Sparkles }] : []),
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                    selectedTab === tab.id
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          {selectedTab === 'replay' && (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="bg-slate-800 px-4 py-2 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Session Replay</span>
                    </div>
                    <div className="h-3 w-px bg-slate-600"></div>
                    <span className="text-sm text-slate-300">
                      {events.length.toLocaleString()} events
                    </span>
                  </div>
                  <div className="text-sm text-slate-300">
                    Use player controls for navigation
                  </div>
                </div>
              </div>
              
              <div className="flex-1 bg-gray-50 flex items-center justify-center min-h-0 relative">
                {!isInFullscreen && (
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl border-2 border-gray-200 w-[calc(100%)] h-[calc(100%-1.5rem)] flex flex-col items-center justify-center p-12 mx-auto">
                    <div className="text-center space-y-6">
                      <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto border-2 border-blue-200">
                        <Play className="w-12 h-12 text-blue-600" />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-gray-900">Session Replay Available</h2>
                        <p className="text-gray-600 text-lg">
                          {events.length.toLocaleString()} events recorded • {formatTime(duration)} duration
                        </p>
                      </div>
                      <button
                        onClick={launchFullscreenPlayer}
                        className="inline-flex items-center space-x-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        <Maximize className="w-6 h-6" />
                        <span>Launch Fullscreen Player</span>
                      </button>
                      <p className="text-gray-500 text-sm mt-4">
                        Press ESC to exit fullscreen mode
                      </p>
                    </div>
                  </div>
                )}
                <div
                  ref={replayContainerRef}
                  id="replay-container"
                  className={`w-full h-full ${isInFullscreen ? 'block' : 'hidden'}`}
                ></div>
              </div>
              
              <div className="bg-slate-800 px-4 py-2 text-white border-t border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-300">
                    💡 Use speed controls and timeline for navigation
                  </div>
                  <div className="text-sm text-slate-300">
                    Duration: {formatTime(duration)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'feedback' && feedbackInfo && (
            <div className="flex-1 overflow-auto bg-gray-50">
              <div className="p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-xl ${getTypeColor(feedbackInfo.type)}`}>
                          {getTypeIcon(feedbackInfo.type)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 capitalize">
                            {feedbackInfo.type} Report
                          </h3>
                          <p className="text-gray-500 text-sm">
                            Submitted on {new Date(feedbackInfo.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                      <p className="text-gray-700 leading-relaxed">{feedbackInfo.description}</p>
                    </div>

                    {feedbackInfo.email && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{feedbackInfo.email}</span>
                      </div>
                    )}
                  </div>

                  {feedbackInfo.performanceMetrics && (
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <p className="text-sm text-blue-600 font-medium">Load Time</p>
                          <p className="text-2xl font-bold text-blue-900">
                            {(feedbackInfo.performanceMetrics.loadTime / 1000).toFixed(2)}s
                          </p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                          <p className="text-sm text-green-600 font-medium">DOM Ready</p>
                          <p className="text-2xl font-bold text-green-900">
                            {(feedbackInfo.performanceMetrics.domReady / 1000).toFixed(2)}s
                          </p>
                        </div>
                        {feedbackInfo.performanceMetrics.firstContentfulPaint && (
                          <div className="bg-yellow-50 rounded-lg p-4">
                            <p className="text-sm text-yellow-600 font-medium">First Paint</p>
                            <p className="text-2xl font-bold text-yellow-900">
                              {(feedbackInfo.performanceMetrics.firstContentfulPaint / 1000).toFixed(2)}s
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'technical' && feedbackInfo?.systemInfo && (
            <div className="flex-1 overflow-auto bg-gray-50">
              <div className="p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Browser & System</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Platform</p>
                          <p className="text-gray-900">{feedbackInfo.systemInfo.platform}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Language</p>
                          <p className="text-gray-900">{feedbackInfo.systemInfo.language}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Timezone</p>
                          <p className="text-gray-900">{feedbackInfo.systemInfo.timezone}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Screen Resolution</p>
                          <p className="text-gray-900">{feedbackInfo.systemInfo.screenResolution}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Viewport</p>
                          <p className="text-gray-900">{feedbackInfo.systemInfo.viewport}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Memory</p>
                          <p className="text-gray-900">{feedbackInfo.systemInfo.memory}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {feedbackInfo.systemInfo.connection && (
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Network Connection</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <p className="text-sm text-blue-600 font-medium">Type</p>
                          <p className="text-lg font-bold text-blue-900 uppercase">
                            {feedbackInfo.systemInfo.connection.effectiveType}
                          </p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                          <p className="text-sm text-green-600 font-medium">Downlink</p>
                          <p className="text-lg font-bold text-green-900">
                            {feedbackInfo.systemInfo.connection.downlink} Mbps
                          </p>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-4">
                          <p className="text-sm text-yellow-600 font-medium">RTT</p>
                          <p className="text-lg font-bold text-yellow-900">
                            {feedbackInfo.systemInfo.connection.rtt}ms
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">User Agent</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <code className="text-sm text-gray-700 font-mono break-all">
                        {feedbackInfo.systemInfo.userAgent}
                      </code>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Page Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">URL</p>
                        <p className="text-gray-900 break-all">{feedbackInfo.systemInfo.url}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'ai-analysis' && (
            <div className="flex-1 overflow-auto bg-gray-50">
              <div className="p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 rounded-xl bg-yellow-500 text-white">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 capitalize">
                            AI Analysis
                          </h3>
                          <p className="text-gray-500 text-sm">
                            Automated bug analysis powered by AI
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {isAnalyzing ? (
                      <div className="flex items-center justify-center space-x-2 text-gray-600">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Analyzing...</span>
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-lg p-6 mb-4">
                        <h4 className="font-semibold text-gray-900 mb-4">Analysis Report</h4>
                        <div className="prose prose-sm max-w-none">
                          <ReactMarkdown
                            components={{
                              h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-4" {...props} />,
                              h2: ({node, ...props}) => <h2 className="text-xl font-bold text-gray-900 mt-5 mb-3" {...props} />,
                              h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2" {...props} />,
                              h4: ({node, ...props}) => <h4 className="text-base font-semibold text-gray-800 mt-3 mb-2" {...props} />,
                              p: ({node, ...props}) => <p className="text-gray-700 leading-relaxed mb-3" {...props} />,
                              ul: ({node, ...props}) => <ul className="list-disc list-inside text-gray-700 mb-3 space-y-1" {...props} />,
                              ol: ({node, ...props}) => <ol className="list-decimal list-inside text-gray-700 mb-3 space-y-1" {...props} />,
                              li: ({node, ...props}) => <li className="ml-4" {...props} />,
                              strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                              em: ({node, ...props}) => <em className="italic text-gray-700" {...props} />,
                              code: ({node, ...props}) => <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800" {...props} />,
                              hr: ({node, ...props}) => <hr className="my-4 border-gray-300" {...props} />,
                              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-3" {...props} />,
                            }}
                          >
                            {aiAnalysis}
                          </ReactMarkdown>
                        </div>
                      </div>
                    )}

                    {analysisError && (
                      <div className="text-red-500 text-sm mt-4">
                        {analysisError}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white border-t border-gray-200 p-3">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              <span className="font-medium">{events.length.toLocaleString()}</span> events • 
              <span className="ml-1">Duration: {formatTime(duration)}</span>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedTab('replay')}
                className="px-3 py-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium text-sm"
              >
                View Replay
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-1.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-all shadow-sm font-medium text-sm"
              >
                Close Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionReplayViewer;

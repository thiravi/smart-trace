import { useState, useEffect } from 'react'
import './App.css'
import TimeMachineWidget from './components/TimeMachineWidget'
import SessionReplayViewer from './components/SessionReplayViewer'

interface FeedbackData {
  type: 'bug' | 'appreciation' | 'feature';
  description: string;
  email?: string;
  systemInfo: {
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
    } | 'Not available';
    memory: string;
    cores: number;
    url: string;
    timestamp: string;
    referrer?: string;
  };
  sessionRecording: unknown[];
  performanceMetrics: {
    loadTime: number;
    domReady: number;
  };
}

const App = () => {
  const [count, setCount] = useState(0)
  const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackData | null>(null);
  const [recordingMode, setRecordingMode] = useState<'manual' | 'auto'>('auto');

  useEffect(() => {
    // Set up global feedback handler
    (window as Window & { onTimeMachineFeedback?: (data: FeedbackData) => void }).onTimeMachineFeedback = (data: FeedbackData) => {
      console.log('📨 Received feedback in App:', data);
      setFeedbackData(prev => [...prev, data]);
    };
  }, []);

  const handleViewReplay = (feedback: FeedbackData) => {
    setSelectedFeedback(feedback);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-brand">
          <span className="font-bold">PerformanceSnap</span>
          <span className="subtext hidden sm:inline">User Feedback & Session Intelligence</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setRecordingMode('manual')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${recordingMode === 'manual' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >Manual</button>
            <button
              onClick={() => setRecordingMode('auto')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${recordingMode === 'auto' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >Auto</button>
          </div>
          <a
            href="/admin"
            className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >Admin</a>
        </div>
      </header>

      <main className="app-main">
        <div className="grid gap-4">
          <section>
            <h2 className="app-section-title">Demo Controls</h2>
            <div className="card flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button onClick={() => setCount((c) => c + 1)} className="bg-gray-900 text-white hover:bg-gray-700 px-3 py-1 text-sm">Increment ({count})</button>
                <span className="text-xs text-gray-500">Hot Module Reload test button</span>
              </div>
              <div className="md:hidden text-xs text-gray-500">
                Mode: {recordingMode === 'manual' ? 'Manual' : 'Auto'}
              </div>
            </div>
          </section>

          {feedbackData.length > 0 && (
            <section>
              <h2 className="app-section-title">Saved Recordings</h2>
              <div className="space-y-3">
                {feedbackData.map((recording) => (
                  <div key={recording.systemInfo.timestamp} className="card border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-[2px] rounded-full text-[11px] font-semibold ${
                            recording.type === 'bug' ? 'bg-red-100 text-red-700' :
                            recording.type === 'appreciation' ? 'bg-pink-100 text-pink-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>{recording.type}</span>
                          <span className="text-[11px] text-gray-500">{new Date(recording.systemInfo.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-800 line-clamp-2 leading-snug">{recording.description}</p>
                        {recording.email && <p className="text-[11px] text-gray-500 mt-1">{recording.email}</p>}
                      </div>
                      <button
                        onClick={() => handleViewReplay(recording)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >View Replay</button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] mt-2">
                      <div>
                        <p className="text-gray-500">Events</p>
                        <p className="font-semibold">{recording.sessionRecording?.length || 0}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Platform</p>
                        <p className="font-semibold">{recording.systemInfo.platform}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Memory</p>
                        <p className="font-semibold">{recording.systemInfo.memory}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Load Time</p>
                        <p className="font-semibold">{Math.round(recording.performanceMetrics.loadTime)} ms</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Widget */}
      <TimeMachineWidget showRecordingControl={recordingMode === 'manual'} />

      {/* Session Replay Viewer */}
      {selectedFeedback && (
        <SessionReplayViewer
          events={selectedFeedback.sessionRecording}
          onClose={() => setSelectedFeedback(null)}
          feedbackInfo={{
            type: selectedFeedback.type,
            description: selectedFeedback.description,
            email: selectedFeedback.email,
            timestamp: selectedFeedback.systemInfo.timestamp
          }}
        />
      )}
    </div>
  )
}

export default App

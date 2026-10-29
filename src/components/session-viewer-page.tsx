import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react'
import SessionReplayViewer from './SessionReplayViewer'

interface FeedbackItem {
  _id: string
  type: 'bug' | 'feature' | 'appreciation'
  description: string
  email?: string
  team: string
  systemInfo: {
    userAgent: string
    language: string
    platform: string
    screenResolution: string
    viewport: string
    timezone: string
    connection: {
      effectiveType: string
      downlink: number
      rtt: number
    }
    memory: string
    cores: number
    url: string
    timestamp: string
  }
  sessionRecording?: Array<{
    type: number
    data: any
    timestamp: number
  }>
  performanceMetrics?: {
    loadTime: number
    domReady: number
    firstContentfulPaint?: number
    largestContentfulPaint?: number
    cumulativeLayoutShift?: number
  }
  createdAt: string
}

function SessionViewerPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState<FeedbackItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const API_BASE_URL = 'https://smart-trace-yr17.onrender.com/api'

  useEffect(() => {
    if (!id) {
      setError('No session ID provided')
      setLoading(false)
      return
    }

    fetchSession()
  }, [id])

  const fetchSession = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/feedback/${id}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Session not found')
        } else {
          setError('Failed to load session')
        }
        setLoading(false)
        return
      }

      const data = await response.json()
      
      if (data.success && data.data) {
        setFeedback(data.data)
      } else {
        setError('Invalid session data')
      }
    } catch (err) {
      console.error('Fetch error:', err)
      setError('Network error. Please ensure the backend is running on http://localhost:3000')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    navigate('/admin')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading session...</p>
        </div>
      </div>
    )
  }

  if (error || !feedback) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Session Not Found</h2>
          <p className="text-gray-400 mb-6">{error || 'The requested session could not be loaded'}</p>
          <button
            onClick={handleClose}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
    )
  }

  if (!feedback.sessionRecording || feedback.sessionRecording.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No Recording Available</h2>
          <p className="text-gray-400 mb-6">This session does not have a recording available</p>
          <button
            onClick={handleClose}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <SessionReplayViewer
      events={feedback.sessionRecording}
      onClose={handleClose}
      feedbackInfo={{
        type: feedback.type,
        description: feedback.description,
        email: feedback.email,
        timestamp: feedback.systemInfo.timestamp,
        systemInfo: feedback.systemInfo,
        performanceMetrics: feedback.performanceMetrics
      }}
    />
  )
}

export default SessionViewerPage

import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Clock, 
  BarChart3, 
  Download, 
  RefreshCw,
  Filter,
  AlertCircle,
  Sparkles,
  Loader2
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface AnalyticsSummary {
  totalFeedback: number
  bugCount: number
  featureCount: number
  appreciationCount: number
  avgResponseTime: number
  topCountries: Array<{ country: string; count: number }>
  topCities: Array<{ city: string; count: number }>
  performanceMetrics: {
    avgLoadTime: number
    avgDomReady: number
    slowSessions: number
  }
}

interface TrendData {
  date: string
  bugs: number
  features: number
  appreciation: number
  total: number
}

function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null)
  const [trends, setTrends] = useState<TrendData[]>([])
  const [aiSummary, setAiSummary] = useState<string>('')
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false)
  const [summaryError, setSummaryError] = useState<string>('')
  
  const [filters, setFilters] = useState({
    team: '',
    startDate: '',
    endDate: '',
    interval: 'day'
  })

  const API_BASE_URL = 'http://localhost:3000/api'

  const fetchAnalytics = async () => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (filters.team) params.append('team', filters.team)
      if (filters.startDate) params.append('startDate', filters.startDate)
      if (filters.endDate) params.append('endDate', filters.endDate)

      const [summaryRes, trendsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/analytics/summary?${params}`),
        fetch(`${API_BASE_URL}/analytics/trends?${params}&interval=${filters.interval}`)
      ])

      const summaryData = await summaryRes.json()
      const trendsData = await trendsRes.json()

      if (summaryData.success && summaryData.data) {
        // Ensure all required fields exist with defaults
        const data = summaryData.data
        setAnalytics({
          totalFeedback: data.totalFeedback || 0,
          bugCount: data.bugCount || 0,
          featureCount: data.featureCount || 0,
          appreciationCount: data.appreciationCount || 0,
          avgResponseTime: data.avgResponseTime || 0,
          topCountries: data.topCountries || [],
          topCities: data.topCities || [],
          performanceMetrics: {
            avgLoadTime: data.performanceMetrics?.avgLoadTime || 0,
            avgDomReady: data.performanceMetrics?.avgDomReady || 0,
            slowSessions: data.performanceMetrics?.slowSessions || 0
          }
        })
      }
      
      if (trendsData.success) {
        setTrends(trendsData.data?.timeline || [])
      }
    } catch (err) {
      setError('Failed to fetch analytics. Please ensure the backend is running.')
      console.error('Analytics fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const generateAISummary = async () => {
    if (!analytics) return

    setIsGeneratingSummary(true)
    setSummaryError('')

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      
      if (!apiKey) {
        throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.')
      }

      const prompt = `You are a product analytics expert. Analyze the following feedback analytics data and provide a concise, actionable summary in 3-4 paragraphs:

**Analytics Overview:**
- Total Feedback: ${analytics.totalFeedback}
- Bug Reports: ${analytics.bugCount} (${analytics.totalFeedback > 0 ? ((analytics.bugCount / analytics.totalFeedback) * 100).toFixed(1) : 0}%)
- Feature Requests: ${analytics.featureCount} (${analytics.totalFeedback > 0 ? ((analytics.featureCount / analytics.totalFeedback) * 100).toFixed(1) : 0}%)
- Appreciation: ${analytics.appreciationCount} (${analytics.totalFeedback > 0 ? ((analytics.appreciationCount / analytics.totalFeedback) * 100).toFixed(1) : 0}%)
- Average Response Time: ${analytics.avgResponseTime} hours

**Performance Metrics:**
- Average Load Time: ${(analytics.performanceMetrics.avgLoadTime / 1000).toFixed(2)}s
- Average DOM Ready: ${(analytics.performanceMetrics.avgDomReady / 1000).toFixed(2)}s
- Slow Sessions: ${analytics.performanceMetrics.slowSessions}

**Geographic Distribution:**
- Top Countries: ${analytics.topCountries.map(c => `${c.country} (${c.count})`).join(', ') || 'N/A'}
- Top Cities: ${analytics.topCities.map(c => `${c.city} (${c.count})`).join(', ') || 'N/A'}

**Trends:**
${trends.length > 0 ? trends.map(t => `${new Date(t.date).toLocaleDateString()}: ${t.bugs} bugs, ${t.features} features, ${t.appreciation} appreciation`).join('\n') : 'No trend data available'}

Provide:
1. **Key Insights**: What stands out in this data?
2. **Areas of Concern**: What needs immediate attention?
3. **Positive Trends**: What's working well?
4. **Recommendations**: What actions should the team take?

Keep the tone professional and actionable.`

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
            safetySettings: [
              {
                category: 'HARM_CATEGORY_HARASSMENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE'
              },
              {
                category: 'HARM_CATEGORY_HATE_SPEECH',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE'
              }
            ]
          })
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Gemini API error:', errorData)
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text
      
      if (!generatedText) {
        throw new Error('No response from Gemini API')
      }

      setAiSummary(generatedText)
    } catch (err) {
      console.error('AI summary error:', err)
      
      // Generate fallback summary using rule-based analysis
      const fallbackSummary = generateFallbackSummary()
      setAiSummary(fallbackSummary)
      
      if (err instanceof Error && err.message.includes('API key')) {
        setSummaryError(err.message)
      } else {
        // setSummaryError('Failed to connect to Gemini API. Showing rule-based analysis instead.')
      }
    } finally {
      setIsGeneratingSummary(false)
    }
  }

  const generateFallbackSummary = () => {
    if (!analytics) return ''

    const bugPercentage = analytics.totalFeedback > 0 
      ? ((analytics.bugCount / analytics.totalFeedback) * 100).toFixed(1) 
      : 0
    const featurePercentage = analytics.totalFeedback > 0 
      ? ((analytics.featureCount / analytics.totalFeedback) * 100).toFixed(1) 
      : 0
    
    let summary = '## 📊 Analytics Summary\n\n'
    
    // Key Insights
    summary += '**Key Insights**\n\n'
    summary += `Your team has received ${analytics.totalFeedback} total feedback submissions. `
    
    if (analytics.bugCount > analytics.featureCount) {
      summary += `Bug reports dominate at ${bugPercentage}% of all feedback, indicating potential quality concerns that need attention. `
    } else if (analytics.featureCount > analytics.bugCount) {
      summary += `Feature requests lead at ${featurePercentage}% of feedback, showing strong user engagement and product interest. `
    } else {
      summary += `There's a balanced distribution between bugs and feature requests. `
    }
    
    if (analytics.avgResponseTime > 24) {
      summary += `The average response time of ${analytics.avgResponseTime}h exceeds the ideal 24-hour target.\n\n`
    } else {
      summary += `The team maintains a responsive ${analytics.avgResponseTime}h average response time.\n\n`
    }
    
    // Performance Analysis
    summary += '**Performance Analysis**\n\n'
    const avgLoadTimeSec = (analytics.performanceMetrics.avgLoadTime / 1000).toFixed(2)
    
    if (analytics.performanceMetrics.avgLoadTime > 3000) {
      summary += `⚠️ Load times averaging ${avgLoadTimeSec}s are above the recommended 3-second threshold. `
      summary += `This may be contributing to user frustration and bug reports. `
    } else {
      summary += `Load times averaging ${avgLoadTimeSec}s are within acceptable ranges. `
    }
    
    if (analytics.performanceMetrics.slowSessions > 0) {
      const slowSessionPercentage = analytics.totalFeedback > 0
        ? ((analytics.performanceMetrics.slowSessions / analytics.totalFeedback) * 100).toFixed(1)
        : 0
      summary += `${analytics.performanceMetrics.slowSessions} sessions (${slowSessionPercentage}%) experienced slow performance.\n\n`
    } else {
      summary += `No slow sessions detected - excellent performance consistency.\n\n`
    }
    
    // Geographic Insights
    if (analytics.topCountries.length > 0) {
      summary += '**Geographic Distribution**\n\n'
      const topCountry = analytics.topCountries[0]
      summary += `${topCountry.country} leads with ${topCountry.count} submissions`
      
      if (analytics.topCountries.length > 1) {
        summary += `, followed by ${analytics.topCountries.slice(1, 3).map(c => c.country).join(' and ')}. `
      } else {
        summary += '. '
      }
      
      summary += `This concentration suggests focusing localization and support efforts in these regions.\n\n`
    }
    
    // Recommendations
    summary += '**Actionable Recommendations**\n\n'
    const recommendations: string[] = []
    
    if (analytics.bugCount > analytics.totalFeedback * 0.4) {
      recommendations.push('* **Quality Focus**: High bug volume requires immediate quality assurance review and expanded testing coverage')
    }
    
    if (analytics.avgResponseTime > 24) {
      recommendations.push(`* **Response Time**: Reduce average response time from ${analytics.avgResponseTime}h to under 24h through better triage and team allocation`)
    }
    
    if (analytics.performanceMetrics.avgLoadTime > 3000) {
      recommendations.push('* **Performance Optimization**: Investigate and optimize load times through code splitting, asset optimization, and CDN implementation')
    }
    
    if (analytics.featureCount > 0) {
      recommendations.push('* **Product Roadmap**: Review top feature requests to align product roadmap with user needs')
    }
    
    if (analytics.topCountries.length > 0) {
      const topCountry = analytics.topCountries[0]
      recommendations.push(`* **Regional Support**: Consider dedicated support resources for ${topCountry.country} market`)
    }
    
    if (recommendations.length === 0) {
      recommendations.push('* Continue monitoring metrics and maintain current performance levels')
      recommendations.push('* Gather more feedback to identify improvement opportunities')
    }
    
    summary += recommendations.join('\n')
    
    summary += '\n\n---\n*Note: This is a rule-based analysis. Connect to Gemini AI for more detailed insights.*'
    
    return summary
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    fetchAnalytics()
  }

  const exportAnalytics = async (format: 'json' | 'csv') => {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format, filters })
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `analytics-${new Date().toISOString().split('T')[0]}.${format}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch (err) {
      console.error('Export error:', err)
      setError('Failed to export analytics')
    }
  }

  const formatTime = (ms: number) => {
    return `${(ms / 1000).toFixed(2)}s`
  }

  const getChangeIndicator = (value: number) => {
    if (value > 0) return <TrendingUp className="w-4 h-4 text-green-600" />
    if (value < 0) return <TrendingDown className="w-4 h-4 text-red-600" />
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">Insights and performance metrics</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={fetchAnalytics}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button
                onClick={() => exportAnalytics('json')}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export JSON</span>
              </button>
              <button
                onClick={() => exportAnalytics('csv')}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
              <select
                value={filters.team}
                onChange={(e) => handleFilterChange('team', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All Teams</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="general">General</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interval</label>
              <select
                value={filters.interval}
                onChange={(e) => handleFilterChange('interval', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="day">Daily</option>
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={applyFilters}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 text-purple-600 animate-spin" />
            <span className="ml-2 text-gray-600">Loading analytics...</span>
          </div>
        ) : analytics ? (
          <>
            {/* AI-Powered Quick Summary */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-sm p-6 border border-purple-200 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">AI-Powered Quick Summary</h3>
                    <p className="text-sm text-gray-600">Intelligent insights powered by Gemini AI</p>
                  </div>
                </div>
                <button
                  onClick={generateAISummary}
                  disabled={isGeneratingSummary}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingSummary ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Summary</span>
                    </>
                  )}
                </button>
              </div>

              {summaryError && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <p className="text-sm text-red-800">{summaryError}</p>
                </div>
              )}

              {aiSummary ? (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <ReactMarkdown 
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-3" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3" {...props} />,
                      h4: ({node, ...props}) => <h4 className="text-base font-semibold text-gray-800 mt-6 mb-3" {...props} />,
                      p: ({node, ...props}) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside text-gray-700 my-4 space-y-2" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal list-inside text-gray-700 my-4 space-y-2" {...props} />,
                      li: ({node, ...props}) => <li className="ml-4 my-2" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                      em: ({node, ...props}) => <em className="italic text-gray-700" {...props} />,
                      code: ({node, ...props}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800" {...props} />,
                      hr: ({node, ...props}) => <hr className="my-4 border-gray-300" {...props} />,
                      blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-600 my-4" {...props} />,
                    }}
                  >
                    {aiSummary}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="bg-white rounded-lg p-8 shadow-sm text-center">
                  <Sparkles className="w-12 h-12 text-purple-300 mx-auto mb-3" />
                  <p className="text-gray-600">Click "Generate Summary" to get AI-powered insights about your analytics data</p>
                </div>
              )}
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-600">Total Feedback</p>
                  <Activity className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{analytics.totalFeedback}</p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  {getChangeIndicator(5)}
                  <span className="ml-1">+5% from last period</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-600">Bug Reports</p>
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{analytics.bugCount}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {analytics.totalFeedback > 0 
                    ? `${((analytics.bugCount / analytics.totalFeedback) * 100).toFixed(1)}% of total`
                    : '0% of total'}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-600">Feature Requests</p>
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{analytics.featureCount}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {analytics.totalFeedback > 0
                    ? `${((analytics.featureCount / analytics.totalFeedback) * 100).toFixed(1)}% of total`
                    : '0% of total'}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{analytics.avgResponseTime}h</p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  {getChangeIndicator(-2)}
                  <span className="ml-1">-2h from last period</span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Avg Load Time</span>
                      <span className="font-medium">{formatTime(analytics.performanceMetrics.avgLoadTime)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((analytics.performanceMetrics.avgLoadTime / 5000) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Avg DOM Ready</span>
                      <span className="font-medium">{formatTime(analytics.performanceMetrics.avgDomReady)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((analytics.performanceMetrics.avgDomReady / 3000) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Slow Sessions</span>
                      <span className="font-medium">{analytics.performanceMetrics.slowSessions}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full" 
                        style={{ 
                          width: analytics.totalFeedback > 0 
                            ? `${(analytics.performanceMetrics.slowSessions / analytics.totalFeedback) * 100}%` 
                            : '0%' 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Countries</h3>
                <div className="space-y-3">
                  {analytics.topCountries.length > 0 ? (
                    analytics.topCountries.map((country, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{country.country}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full" 
                              style={{ 
                                width: analytics.totalFeedback > 0 
                                  ? `${(country.count / analytics.totalFeedback) * 100}%` 
                                  : '0%' 
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900 w-8">{country.count}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">No country data available</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Cities</h3>
                <div className="space-y-3">
                  {analytics.topCities.length > 0 ? (
                    analytics.topCities.map((city, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{city.city}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ 
                                width: analytics.totalFeedback > 0 
                                  ? `${(city.count / analytics.totalFeedback) * 100}%` 
                                  : '0%' 
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900 w-8">{city.count}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">No city data available</p>
                  )}
                </div>
              </div>
            </div>

            {/* Trends Chart */}
            {trends.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Feedback Trends</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded" />
                      <span className="text-xs text-gray-600">Bugs</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded" />
                      <span className="text-xs text-gray-600">Features</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-pink-500 rounded" />
                      <span className="text-xs text-gray-600">Appreciation</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 bottom-12 flex flex-col justify-between text-xs text-gray-500 w-8">
                    <span>{Math.max(...trends.map(t => t.total))}</span>
                    <span>{Math.floor(Math.max(...trends.map(t => t.total)) / 2)}</span>
                    <span>0</span>
                  </div>

                  {/* Chart area */}
                  <div className="ml-10 pl-4 border-l border-b border-gray-200">
                    <div className="flex items-end justify-between gap-2 h-72 pb-2">
                      {trends.map((trend, index) => {
                        const maxValue = Math.max(...trends.map(t => t.total))
                        const totalHeight = 256 // h-64 in pixels
                        
                        const bugHeight = maxValue > 0 ? (trend.bugs / maxValue) * totalHeight : 0
                        const featureHeight = maxValue > 0 ? (trend.features / maxValue) * totalHeight : 0
                        const appreciationHeight = maxValue > 0 ? (trend.appreciation / maxValue) * totalHeight : 0

                        return (
                          <div key={index} className="flex-1 flex flex-col items-center group">
                            {/* Bar stack */}
                            <div className="w-full flex flex-col-reverse items-center relative">
                              {/* Tooltip on hover */}
                              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                                <div className="font-semibold mb-1">{new Date(trend.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                                <div className="space-y-1">
                                  {trend.bugs > 0 && (
                                    <div className="flex items-center justify-between space-x-3">
                                      <span className="flex items-center">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                                        Bugs
                                      </span>
                                      <span className="font-medium">{trend.bugs}</span>
                                    </div>
                                  )}
                                  {trend.features > 0 && (
                                    <div className="flex items-center justify-between space-x-3">
                                      <span className="flex items-center">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                                        Features
                                      </span>
                                      <span className="font-medium">{trend.features}</span>
                                    </div>
                                  )}
                                  {trend.appreciation > 0 && (
                                    <div className="flex items-center justify-between space-x-3">
                                      <span className="flex items-center">
                                        <div className="w-2 h-2 bg-pink-500 rounded-full mr-2" />
                                        Appreciation
                                      </span>
                                      <span className="font-medium">{trend.appreciation}</span>
                                    </div>
                                  )}
                                  <div className="border-t border-gray-700 pt-1 mt-1">
                                    <div className="flex items-center justify-between space-x-3">
                                      <span>Total</span>
                                      <span className="font-bold">{trend.total}</span>
                                    </div>
                                  </div>
                                </div>
                                {/* Arrow */}
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                                </div>
                              </div>

                              {/* Bars */}
                              <div className="w-full max-w-16 flex flex-col gap-0.5">
                                {appreciationHeight > 0 && (
                                  <div 
                                    className="bg-pink-500 rounded-t-sm w-full transition-all duration-300 group-hover:bg-pink-600" 
                                    style={{ height: `${appreciationHeight}px` }}
                                  />
                                )}
                                {featureHeight > 0 && (
                                  <div 
                                    className={`bg-blue-500 w-full transition-all duration-300 group-hover:bg-blue-600 ${appreciationHeight === 0 ? 'rounded-t-sm' : ''}`}
                                    style={{ height: `${featureHeight}px` }}
                                  />
                                )}
                                {bugHeight > 0 && (
                                  <div 
                                    className={`bg-red-500 w-full transition-all duration-300 group-hover:bg-red-600 ${featureHeight === 0 && appreciationHeight === 0 ? 'rounded-t-sm' : ''}`}
                                    style={{ height: `${bugHeight}px` }}
                                  />
                                )}
                              </div>

                              {/* Total count label */}
                              {trend.total > 0 && (
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {trend.total}
                                </div>
                              )}
                            </div>

                            {/* X-axis label */}
                            <div className="mt-3 text-center">
                              <div className="text-xs font-medium text-gray-700">
                                {new Date(trend.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* X-axis label */}
                  <div className="text-center text-xs text-gray-500 mt-2 font-medium">
                    {filters.interval === 'day' ? 'Daily' : filters.interval === 'week' ? 'Weekly' : 'Monthly'} Breakdown
                  </div>
                </div>

                {/* Summary stats */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {trends.reduce((sum, t) => sum + t.bugs, 0)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Total Bugs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {trends.reduce((sum, t) => sum + t.features, 0)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Total Features</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-600">
                        {trends.reduce((sum, t) => sum + t.appreciation, 0)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Total Appreciation</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No analytics data available</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AnalyticsDashboard

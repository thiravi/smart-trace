import { useState, useEffect } from 'react'
import { 
  Server, 
  Activity, 
  RefreshCw, 
  Download, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Archive,
  Trash2,
  Power,
  Shield,
  AlertTriangle
} from 'lucide-react'

interface SystemHealth {
  status: string
  timestamp: string
  services: {
    database: string
    processors: string
    storage: string
  }
  version: string
  environment: string
  uptime: number
}

interface SystemStats {
  totalFeedback: number
  totalTeams: number
  activeProcessors: number
  systemLoad: {
    memory: {
      rss: number
      heapTotal: number
      heapUsed: number
      external: number
    }
    cpu: {
      user: number
      system: number
    }
  }
  storage: {
    used: string
    available: string
  }
}

interface Backup {
  id: string
  date: string
  size: string
  status: string
}

interface LogEntry {
  timestamp: string
  level: string
  message: string
  source: string
}

function SystemAdministration() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [health, setHealth] = useState<SystemHealth | null>(null)
  const [stats, setStats] = useState<SystemStats | null>(null)
  const [backups, setBackups] = useState<Backup[]>([])
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'logs' | 'backups' | 'maintenance'>('overview')

  const API_BASE_URL = 'http://localhost:3000/api'

  const fetchSystemData = async () => {
    setLoading(true)
    setError(null)

    try {
      const [healthRes, statsRes, backupsRes, logsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/health`),
        fetch(`${API_BASE_URL}/admin/stats`),
        fetch(`${API_BASE_URL}/admin/backups`),
        fetch(`${API_BASE_URL}/admin/logs?limit=50`)
      ])

      const healthData = await healthRes.json()
      const statsData = await statsRes.json()
      const backupsData = await backupsRes.json()
      const logsData = await logsRes.json()

      if (healthData.success) setHealth(healthData.data)
      if (statsData.success) setStats(statsData.data)
      if (backupsData.success) setBackups(backupsData.data)
      if (logsData.success) setLogs(logsData.data)
    } catch (err) {
      setError('Failed to fetch system data. Please ensure the backend is running.')
      console.error('System data fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSystemData()
    const interval = setInterval(fetchSystemData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const createBackup = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/backup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ includeSessionData: true })
      })

      const data = await response.json()
      if (data.success) {
        alert('✅ Backup started successfully!')
        fetchSystemData()
      } else {
        setError(data.error || 'Failed to create backup')
      }
    } catch (err) {
      setError('Failed to create backup')
      console.error('Backup error:', err)
    }
  }

  const clearCache = async () => {
    if (!confirm('Are you sure you want to clear all caches?')) return

    try {
      const response = await fetch(`${API_BASE_URL}/admin/cache/clear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'all' })
      })

      const data = await response.json()
      if (data.success) {
        alert('✅ Cache cleared successfully!')
      } else {
        setError(data.error || 'Failed to clear cache')
      }
    } catch (err) {
      setError('Failed to clear cache')
      console.error('Cache clear error:', err)
    }
  }

  const toggleMaintenanceMode = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/maintenance/mode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !maintenanceMode })
      })

      const data = await response.json()
      if (data.success) {
        setMaintenanceMode(!maintenanceMode)
        alert(`✅ Maintenance mode ${!maintenanceMode ? 'enabled' : 'disabled'}`)
      } else {
        setError(data.error || 'Failed to toggle maintenance mode')
      }
    } catch (err) {
      setError('Failed to toggle maintenance mode')
      console.error('Maintenance mode error:', err)
    }
  }

  const cleanupData = async () => {
    const days = prompt('Delete data older than how many days?', '30')
    if (!days) return

    try {
      const response = await fetch(`${API_BASE_URL}/admin/data/cleanup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ olderThan: parseInt(days) })
      })

      const data = await response.json()
      if (data.success) {
        alert(`✅ Data cleanup completed!`)
        fetchSystemData()
      } else {
        setError(data.error || 'Failed to cleanup data')
      }
    } catch (err) {
      setError('Failed to cleanup data')
      console.error('Cleanup error:', err)
    }
  }

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${days}d ${hours}h ${minutes}m`
  }

  const formatBytes = (bytes: number) => {
    const mb = bytes / 1024 / 1024
    return `${mb.toFixed(2)} MB`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'connected':
      case 'active':
      case 'available':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      default:
        return <XCircle className="w-5 h-5 text-red-600" />
    }
  }

  const getLogLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'warn':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">System Administration</h1>
              <p className="text-gray-600 mt-1">Monitor system health and manage operations</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={fetchSystemData}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button
                onClick={toggleMaintenanceMode}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  maintenanceMode
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-yellow-600 text-white hover:bg-yellow-700'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>{maintenanceMode ? 'Disable' : 'Enable'} Maintenance</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 border-t border-gray-200 pt-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'logs'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Logs
            </button>
            <button
              onClick={() => setActiveTab('backups')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'backups'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Backups
            </button>
            <button
              onClick={() => setActiveTab('maintenance')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'maintenance'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Maintenance
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto text-red-600 hover:text-red-800">
              ×
            </button>
          </div>
        )}

        {loading && activeTab === 'overview' ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 text-purple-600 animate-spin" />
            <span className="ml-2 text-gray-600">Loading system data...</span>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
                {/* Health Status */}
                {health && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                      <div className="flex items-center space-x-2 mb-4">
                        <Activity className="w-5 h-5 text-purple-600" />
                        <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Overall Status</span>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(health.status)}
                            <span className="text-sm font-medium capitalize">{health.status}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Database</span>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(health.services.database)}
                            <span className="text-sm font-medium capitalize">{health.services.database}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Processors</span>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(health.services.processors)}
                            <span className="text-sm font-medium capitalize">{health.services.processors}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Storage</span>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(health.services.storage)}
                            <span className="text-sm font-medium capitalize">{health.services.storage}</span>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-gray-200">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Version</span>
                            <span className="font-medium">{health.version}</span>
                          </div>
                          <div className="flex justify-between text-sm mt-2">
                            <span className="text-gray-600">Environment</span>
                            <span className="font-medium">{health.environment}</span>
                          </div>
                          <div className="flex justify-between text-sm mt-2">
                            <span className="text-gray-600">Uptime</span>
                            <span className="font-medium">{formatUptime(health.uptime)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* System Stats */}
                    {stats && (
                      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center space-x-2 mb-4">
                          <Server className="w-5 h-5 text-purple-600" />
                          <h3 className="text-lg font-semibold text-gray-900">System Resources</h3>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Memory Usage</span>
                              <span className="font-medium">
                                {formatBytes(stats.systemLoad.memory.heapUsed)} / {formatBytes(stats.systemLoad.memory.heapTotal)}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ 
                                  width: `${(stats.systemLoad.memory.heapUsed / stats.systemLoad.memory.heapTotal) * 100}%` 
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">RSS Memory</span>
                              <span className="font-medium">{formatBytes(stats.systemLoad.memory.rss)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }} />
                            </div>
                          </div>
                          <div className="pt-3 border-t border-gray-200">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-600">Total Feedback</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalFeedback}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Total Teams</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalTeams}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Active Processors</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.activeProcessors}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Storage Used</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.storage.used}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Logs Tab */}
            {activeTab === 'logs' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">System Logs</h3>
                </div>
                <div className="p-6">
                  {logs.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">No logs available</p>
                  ) : (
                    <div className="space-y-2 max-h-[600px] overflow-y-auto">
                      {logs.map((log, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getLogLevelColor(log.level)}`}>
                            {log.level.toUpperCase()}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{log.message}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
                              <span className="text-xs text-gray-500">Source: {log.source}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Backups Tab */}
            {activeTab === 'backups' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">System Backups</h3>
                  <button
                    onClick={createBackup}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Archive className="w-4 h-4" />
                    <span>Create Backup</span>
                  </button>
                </div>
                <div className="p-6">
                  {backups.length === 0 ? (
                    <div className="text-center py-12">
                      <Archive className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No backups available</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {backups.map((backup) => (
                        <div key={backup.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Archive className="w-5 h-5 text-purple-600" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{backup.id}</p>
                              <p className="text-xs text-gray-500">{new Date(backup.date).toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">{backup.size}</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              backup.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {backup.status}
                            </span>
                            <button className="text-purple-600 hover:text-purple-800">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Maintenance Tab */}
            {activeTab === 'maintenance' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cache Management</h3>
                  <p className="text-sm text-gray-600 mb-4">Clear system caches to free up memory and reset cached data</p>
                  <button
                    onClick={clearCache}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Clear All Caches</span>
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Cleanup</h3>
                  <p className="text-sm text-gray-600 mb-4">Remove old feedback and session data based on retention policies</p>
                  <button
                    onClick={cleanupData}
                    className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Cleanup Old Data</span>
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Mode</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {maintenanceMode 
                      ? 'System is currently in maintenance mode. Users cannot submit feedback.' 
                      : 'Enable maintenance mode to prevent new feedback submissions during system updates.'}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Power className={`w-5 h-5 ${maintenanceMode ? 'text-red-600' : 'text-green-600'}`} />
                    <span className={`font-medium ${maintenanceMode ? 'text-red-600' : 'text-green-600'}`}>
                      {maintenanceMode ? 'Maintenance Active' : 'System Operational'}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Node Version</span>
                      <span className="font-medium">{'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform</span>
                      <span className="font-medium">{navigator.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">User Agent</span>
                      <span className="font-medium truncate max-w-[200px]" title={navigator.userAgent}>
                        {navigator.userAgent.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default SystemAdministration

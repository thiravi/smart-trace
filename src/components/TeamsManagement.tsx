import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Save, X, Users, Mail, MessageSquare, RefreshCw, AlertCircle } from 'lucide-react'

interface TeamConfig {
  name: string
  emailNotifications: string[]
  slackWebhook?: string
  teamsWebhook?: string
  customFields?: Record<string, any>
  processors?: string[]
  storage?: {
    enabled: boolean
    retention?: number
    path?: string
  }
}

interface TeamsData {
  [teamName: string]: TeamConfig
}

function TeamsManagement() {
  const [teams, setTeams] = useState<TeamsData>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingTeam, setEditingTeam] = useState<string | null>(null)
  const [formData, setFormData] = useState<TeamConfig>({
    name: '',
    emailNotifications: [''],
    slackWebhook: '',
    teamsWebhook: '',
    processors: [],
    storage: {
      enabled: true,
      retention: 30
    }
  })

  const API_BASE_URL = 'https://smart-trace-yr17.onrender.com/api'

  // Fetch all teams
  const fetchTeams = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/config/teams`)
      const data = await response.json()

      if (data.success) {
        setTeams(data.data)
      } else {
        setError('Failed to fetch teams')
      }
    } catch (err) {
      setError('Network error. Please ensure the backend is running on http://localhost:3000')
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  // Handle form input changes
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Handle email notifications array
  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...formData.emailNotifications]
    newEmails[index] = value
    setFormData(prev => ({ ...prev, emailNotifications: newEmails }))
  }

  const addEmailField = () => {
    setFormData(prev => ({
      ...prev,
      emailNotifications: [...prev.emailNotifications, '']
    }))
  }

  const removeEmailField = (index: number) => {
    const newEmails = formData.emailNotifications.filter((_, i) => i !== index)
    setFormData(prev => ({ ...prev, emailNotifications: newEmails }))
  }

  // Create new team
  const handleCreateTeam = async () => {
    if (!formData.name) {
      setError('Team name is required')
      return
    }

    const validEmails = formData.emailNotifications.filter(email => email.trim() !== '')
    if (validEmails.length === 0) {
      setError('At least one email notification is required')
      return
    }

    try {
      const payload = {
        teamName: formData.name,
        name: formData.name,
        emailNotifications: validEmails,
        slackWebhook: formData.slackWebhook || undefined,
        teamsWebhook: formData.teamsWebhook || undefined,
        processors: formData.processors || [],
        storage: formData.storage
      }

      const response = await fetch(`${API_BASE_URL}/config/teams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (data.success) {
        setShowAddModal(false)
        resetForm()
        fetchTeams()
      } else {
        setError(data.error || 'Failed to create team')
      }
    } catch (err) {
      setError('Failed to create team')
      console.error('Create error:', err)
    }
  }

  // Update existing team
  const handleUpdateTeam = async (teamName: string) => {
    const validEmails = formData.emailNotifications.filter(email => email.trim() !== '')
    if (validEmails.length === 0) {
      setError('At least one email notification is required')
      return
    }

    try {
      const payload = {
        name: formData.name,
        emailNotifications: validEmails,
        slackWebhook: formData.slackWebhook || undefined,
        teamsWebhook: formData.teamsWebhook || undefined,
        processors: formData.processors || [],
        storage: formData.storage
      }

      const response = await fetch(`${API_BASE_URL}/config/teams/${teamName}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (data.success) {
        setEditingTeam(null)
        resetForm()
        fetchTeams()
      } else {
        setError(data.error || 'Failed to update team')
      }
    } catch (err) {
      setError('Failed to update team')
      console.error('Update error:', err)
    }
  }

  // Delete team
  const handleDeleteTeam = async (teamName: string) => {
    if (!confirm(`Are you sure you want to delete the team "${teamName}"?`)) return

    try {
      const response = await fetch(`${API_BASE_URL}/config/teams/${teamName}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (data.success) {
        fetchTeams()
      } else {
        setError(data.error || 'Failed to delete team')
      }
    } catch (err) {
      setError('Failed to delete team')
      console.error('Delete error:', err)
    }
  }

  // Start editing a team
  const startEdit = (teamName: string, team: TeamConfig) => {
    setEditingTeam(teamName)
    setFormData({
      name: team.name,
      emailNotifications: team.emailNotifications,
      slackWebhook: team.slackWebhook || '',
      teamsWebhook: team.teamsWebhook || '',
      processors: team.processors || [],
      storage: team.storage || { enabled: true, retention: 30 }
    })
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      emailNotifications: [''],
      slackWebhook: '',
      teamsWebhook: '',
      processors: [],
      storage: {
        enabled: true,
        retention: 30
      }
    })
    setError(null)
  }

  const cancelEdit = () => {
    setEditingTeam(null)
    resetForm()
  }

  const cancelAdd = () => {
    setShowAddModal(false)
    resetForm()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Teams Management</h1>
              <p className="text-gray-600 mt-1">Configure and manage feedback teams</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={fetchTeams}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Team</span>
              </button>
            </div>
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
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 text-purple-600 animate-spin" />
            <span className="ml-2 text-gray-600">Loading teams...</span>
          </div>
        ) : Object.keys(teams).length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No teams found</h3>
            <p className="text-gray-600 mb-4">Get started by creating your first team</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Team</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(teams).map(([teamName, team]) => (
              <div key={teamName} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                  </div>
                  {editingTeam !== teamName && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEdit(teamName, team)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTeam(teamName)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {editingTeam === teamName ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Notifications</label>
                      {formData.emailNotifications.map((email, index) => (
                        <div key={index} className="flex space-x-2 mb-2">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => handleEmailChange(index, e.target.value)}
                            placeholder="email@example.com"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          {formData.emailNotifications.length > 1 && (
                            <button
                              onClick={() => removeEmailField(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={addEmailField}
                        className="text-sm text-purple-600 hover:text-purple-800"
                      >
                        + Add Email
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Slack Webhook (Optional)</label>
                      <input
                        type="url"
                        value={formData.slackWebhook}
                        onChange={(e) => handleInputChange('slackWebhook', e.target.value)}
                        placeholder="https://hooks.slack.com/..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Teams Webhook (Optional)</label>
                      <input
                        type="url"
                        value={formData.teamsWebhook}
                        onChange={(e) => handleInputChange('teamsWebhook', e.target.value)}
                        placeholder="https://outlook.office.com/webhook/..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdateTeam(teamName)}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">Email Notifications</p>
                        {team.emailNotifications.map((email, index) => (
                          <p key={index} className="text-sm text-gray-900">{email}</p>
                        ))}
                      </div>
                    </div>

                    {team.slackWebhook && (
                      <div className="flex items-start space-x-2">
                        <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-xs font-medium text-gray-500 uppercase mb-1">Slack Webhook</p>
                          <p className="text-sm text-gray-900 truncate">{team.slackWebhook}</p>
                        </div>
                      </div>
                    )}

                    {team.teamsWebhook && (
                      <div className="flex items-start space-x-2">
                        <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-xs font-medium text-gray-500 uppercase mb-1">Teams Webhook</p>
                          <p className="text-sm text-gray-900 truncate">{team.teamsWebhook}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Team Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Add New Team</h2>
              <button onClick={cancelAdd} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Team Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., frontend, backend, general"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Notifications *</label>
                {formData.emailNotifications.map((email, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => handleEmailChange(index, e.target.value)}
                      placeholder="email@example.com"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    {formData.emailNotifications.length > 1 && (
                      <button
                        onClick={() => removeEmailField(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addEmailField}
                  className="text-sm text-purple-600 hover:text-purple-800"
                >
                  + Add Email
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slack Webhook (Optional)</label>
                <input
                  type="url"
                  value={formData.slackWebhook}
                  onChange={(e) => handleInputChange('slackWebhook', e.target.value)}
                  placeholder="https://hooks.slack.com/services/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Slack webhook URL for notifications</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teams Webhook (Optional)</label>
                <input
                  type="url"
                  value={formData.teamsWebhook}
                  onChange={(e) => handleInputChange('teamsWebhook', e.target.value)}
                  placeholder="https://outlook.office.com/webhook/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Microsoft Teams webhook URL for notifications</p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.storage?.enabled}
                    onChange={(e) => handleInputChange('storage', { ...formData.storage, enabled: e.target.checked })}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Enable Storage</span>
                </label>
              </div>

              {formData.storage?.enabled && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data Retention (days)</label>
                  <input
                    type="number"
                    value={formData.storage?.retention || 30}
                    onChange={(e) => handleInputChange('storage', { ...formData.storage, retention: parseInt(e.target.value) })}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={cancelAdd}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTeam}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create Team</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamsManagement

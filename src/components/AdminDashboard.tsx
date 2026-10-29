import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Eye, Download, RefreshCw, User, Clock, Monitor, AlertCircle, Heart, Lightbulb, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface FeedbackItem {
  _id: string;
  type: 'bug' | 'feature' | 'appreciation';
  description: string;
  email?: string;
  team: string;
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
    };
    memory: string;
    cores: number;
    url: string;
    timestamp: string;
  };
  geoLocation?: {
    country: string;
    countryCode: string;
    region: string;
    regionCode: string;
    city: string;
    latitude?: number;
    longitude?: number;
    timezone: string;
    isp?: string;
    org?: string;
    ip?: string;
  };
  sessionRecording?: Array<{
    type: number;
    data: any;
    timestamp: number;
  }>;
  performanceMetrics?: {
    loadTime: number;
    domReady: number;
    firstContentfulPaint?: number;
    largestContentfulPaint?: number;
    cumulativeLayoutShift?: number;
  };
  processed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FeedbackResponse {
  success: boolean;
  data: {
    feedback: FeedbackItem[];
    total: number;
  };
  timestamp: string;
}

const JIRA_TICKET_URL = 'https://cision.atlassian.net/browse/DEE-4357'

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters and pagination
  const [filters, setFilters] = useState({
    team: '',
    type: '',
    email: '',
    country: '',
    city: '',
    startDate: '',
    endDate: '',
    search: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0
  });

  const [stats, setStats] = useState({
    total: 0,
    bugs: 0,
    features: 0,
    appreciation: 0,
    processed: 0
  });

  const API_BASE_URL = 'http://localhost:3000/api';

  // Fetch feedback data
  const fetchFeedback = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filters.team) params.append('team', filters.team);
      if (filters.type) params.append('type', filters.type);
      if (filters.email) params.append('email', filters.email);
      if (filters.country) params.append('country', filters.country);
      if (filters.city) params.append('city', filters.city);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      params.append('limit', pagination.limit.toString());
      params.append('skip', ((pagination.page - 1) * pagination.limit).toString());

      const response = await fetch(`${API_BASE_URL}/feedback?${params}`);
      const data: FeedbackResponse = await response.json();

      if (data.success) {
        setFeedbackList(data.data.feedback);
        setPagination(prev => ({ ...prev, total: data.data.total }));
        
        // Calculate stats
        const bugs = data.data.feedback.filter(f => f.type === 'bug').length;
        const features = data.data.feedback.filter(f => f.type === 'feature').length;
        const appreciation = data.data.feedback.filter(f => f.type === 'appreciation').length;
        const processed = data.data.feedback.filter(f => f.processed).length;
        
        setStats({
          total: data.data.total,
          bugs,
          features,
          appreciation,
          processed
        });
      } else {
        setError('Failed to fetch feedback data');
      }
    } catch (err) {
      setError('Network error. Please ensure the backend is running on http://localhost:3000');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [pagination.page, pagination.limit]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page when filtering
  };

  const applyFilters = () => {
    fetchFeedback();
  };

  const clearFilters = () => {
    setFilters({
      team: '',
      type: '',
      email: '',
      country: '',
      city: '',
      startDate: '',
      endDate: '',
      search: ''
    });
    setPagination(prev => ({ ...prev, page: 1 }));
    setTimeout(fetchFeedback, 100);
  };

  const viewSession = (feedback: FeedbackItem) => {
    navigate(`/admin/session/${feedback._id}`);
  };

  const openJiraTicket = () => {
    window.open(JIRA_TICKET_URL, '_blank', 'noopener,noreferrer')
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bug': return <AlertCircle className="w-4 h-4" />;
      case 'appreciation': return <Heart className="w-4 h-4" />;
      case 'feature': return <Lightbulb className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'bug': return 'bg-red-100 text-red-800 border-red-200';
      case 'appreciation': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'feature': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const exportFeedback = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/feedback/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters)
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `feedback-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Export error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Feedback Dashboard</h1>
              <p className="text-gray-600 mt-1">Monitor and analyze user feedback sessions</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={fetchFeedback}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button
                onClick={exportFeedback}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Feedback</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Monitor className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Bug Reports</p>
                <p className="text-3xl font-bold text-red-900">{stats.bugs}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Feature Requests</p>
                <p className="text-3xl font-bold text-blue-900">{stats.features}</p>
              </div>
              <Lightbulb className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-pink-600">Appreciation</p>
                <p className="text-3xl font-bold text-pink-900">{stats.appreciation}</p>
              </div>
              <Heart className="w-8 h-8 text-pink-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Processed</p>
                <p className="text-3xl font-bold text-green-900">{stats.processed}</p>
              </div>
              <Clock className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-8 gap-4">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="bug">Bug</option>
                <option value="feature">Feature</option>
                <option value="appreciation">Appreciation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={filters.email}
                onChange={(e) => handleFilterChange('email', e.target.value)}
                placeholder="Filter by email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                value={filters.country}
                onChange={(e) => handleFilterChange('country', e.target.value)}
                placeholder="e.g. United States"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                placeholder="e.g. New York"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
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

            <div className="flex items-end space-x-2">
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Apply
              </button>
              <button
                onClick={clearFilters}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Feedback List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Feedback Sessions</h3>
            <p className="text-sm text-gray-600 mt-1">
              Showing {Math.min(pagination.limit, feedbackList.length)} of {pagination.total} results
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 text-purple-600 animate-spin" />
              <span className="ml-2 text-gray-600">Loading feedback...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-red-600 font-medium">{error}</p>
                <button
                  onClick={fetchFeedback}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : feedbackList.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Monitor className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No feedback found matching your criteria</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {feedbackList.map((feedback) => (
                    <tr key={feedback._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(feedback.type)}`}>
                          {getTypeIcon(feedback.type)}
                          <span className="ml-1 capitalize">{feedback.type}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate" title={feedback.description}>
                          {feedback.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm text-gray-900">{feedback.email || 'Anonymous'}</div>
                            <div className="text-xs text-gray-500">{feedback.systemInfo.platform}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {feedback.geoLocation ? (
                            <div>
                              <div className="font-medium">{feedback.geoLocation.city}</div>
                              <div className="text-xs text-gray-500">{feedback.geoLocation.country}</div>
                            </div>
                          ) : (
                            <span className="text-gray-400 italic">Location unavailable</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.team === "frontend" ? 'MS - UI': feedback.team}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(feedback.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {feedback.performanceMetrics && (
                          <div className="text-xs text-gray-600">
                            <div>Load: {(feedback.performanceMetrics.loadTime / 1000).toFixed(2)}s</div>
                            <div>DOM: {(feedback.performanceMetrics.domReady / 1000).toFixed(2)}s</div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => viewSession(feedback)}
                            className="flex items-center space-x-1 text-purple-600 hover:text-purple-900 transition-colors"
                            disabled={!feedback.sessionRecording || feedback.sessionRecording.length === 0}
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Session</span>
                          </button>
                          {feedback.type === 'bug' && (
                            <button
                              onClick={openJiraTicket}
                              className="flex items-center space-x-1 text-blue-600 hover:text-blue-900 transition-colors"
                              title="Open JIRA Ticket"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>JIRA</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination.total > pagination.limit && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={pagination.page === 1}
                    className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={pagination.page * pagination.limit >= pagination.total}
                    className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
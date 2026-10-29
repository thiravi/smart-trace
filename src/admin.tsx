import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { Users, LayoutDashboard, BarChart3, Settings } from 'lucide-react'
import AdminDashboard from './components/AdminDashboard'
import TeamsManagement from './components/TeamsManagement'
import AnalyticsDashboard from './components/analytics-dashboard'
import SystemAdministration from './components/system-administration'
import SessionViewerPage from './components/session-viewer-page'
import './index.css'

function AdminLayout() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  // Don't show navigation for session viewer pages
  const isSessionViewer = location.pathname.startsWith('/admin/session/')

  if (isSessionViewer) {
    return (
      <Routes>
        <Route path="/admin/session/:id" element={<SessionViewerPage />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-purple-600">Smart Trace Admin</h1>
              </div>
              <div className="flex space-x-4">
                <Link
                  to="/admin"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/admin')
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Feedback Dashboard</span>
                </Link>
                <Link
                  to="/admin/analytics"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/admin/analytics')
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Analytics</span>
                </Link>
                <Link
                  to="/admin/teams"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/admin/teams')
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Teams</span>
                </Link>
                <Link
                  to="/admin/system"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/admin/system')
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>System</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Route Content */}
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
        <Route path="/admin/teams" element={<TeamsManagement />} />
        <Route path="/admin/system" element={<SystemAdministration />} />
        <Route path="/admin/session/:id" element={<SessionViewerPage />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </div>
  )
}

function AdminApp() {
  return (
    <BrowserRouter>
      <AdminLayout />
    </BrowserRouter>
  )
}

// Mount the admin app
const container = document.getElementById('admin-root')
if (container) {
  const root = createRoot(container)
  root.render(<AdminApp />)
} else {
  console.error('Admin root element not found')
}
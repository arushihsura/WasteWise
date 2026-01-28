import { useState, useEffect } from 'react'
import logo from './assets/logo.png'

const API_BASE_URL = 'http://localhost:3000/api'

export default function Dashboard() {
  const [selectedCity, setSelectedCity] = useState('pune')
  const [festivalMode, setFestivalMode] = useState(false)
  const [user, setUser] = useState(null)
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)

  const cities = {
    pune: { name: 'Pune' },
    indore: { name: 'Indore' },
    surat: { name: 'Surat' },
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    fetchDashboardStats()
  }, [selectedCity])

  const fetchDashboardStats = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}/dashboard/${selectedCity}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        setDashboardData(data.data)
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    }
    setLoading(false)
  }

  if (loading || !dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const currentCity = dashboardData
  
  const stats = [
    {
      label: 'Total Bins',
      value: currentCity.totalBins,
      icon: '🗑️',
      color: 'from-blue-400 to-blue-600',
    },
    {
      label: 'Bins at Risk',
      value: currentCity.binsAtRisk,
      icon: '⚠️',
      color: 'from-red-400 to-red-600',
    },
    {
      label: 'Trucks Needed',
      value: currentCity.trucksRequired,
      icon: '🚛',
      color: 'from-emerald-400 to-emerald-600',
    },
    {
      label: 'Efficiency Rate',
      value: currentCity.efficiency + '%',
      icon: '📈',
      color: 'from-purple-400 to-purple-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="WasteWise Logo" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                WasteWise
              </h1>
              <p className="text-xs text-gray-500">Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 capitalize">
                {user?.fullName || 'User'}
              </p>
              <p className="text-xs text-gray-500 capitalize">{user?.role || 'Role'}</p>
            </div>
            <button className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full text-white font-semibold text-sm flex items-center justify-center hover:shadow-lg transition-shadow">
              {user?.fullName?.charAt(0) || 'U'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Overview Dashboard</h2>
          <p className="text-gray-600">
            Quick city-wide snapshot for waste management decision makers
          </p>
        </div>

        {/* Control Panel */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* City Selector */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              🏙️ Select City
            </label>
            <div className="space-y-2">
              {Object.entries(cities).map(([key, city]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCity(key)}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all font-medium ${
                    selectedCity === key
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                      : 'border-gray-200 hover:border-emerald-300 text-gray-700'
                  }`}
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>

          {/* Festival Mode */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex flex-col justify-between">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                🎉 Festival Mode
              </label>
              <p className="text-xs text-gray-500 mb-4">
                Status: <span className={`font-bold ${festivalMode ? 'text-red-600' : 'text-green-600'}`}>
                  {festivalMode ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </p>
              <p className="text-xs text-gray-600 mb-4">
                Waste surge impact: <span className="font-semibold">×{currentCity.festivalImpact}</span>
              </p>
            </div>
            <button
              onClick={() => setFestivalMode(!festivalMode)}
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                festivalMode
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600'
              }`}
            >
              {festivalMode ? 'Disable Festival Mode' : 'Enable Festival Mode'}
            </button>
          </div>

          {/* Quick Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              📍 Current Status
            </label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">Active City</span>
                <span className="font-bold text-emerald-600">{currentCity.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">Zones</span>
                <span className="text-xs font-medium text-gray-700">
                  {currentCity.zones.join(', ')}
                </span>
              </div>
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="text-gray-600 text-sm">Last Updated</span>
                <span className="text-xs text-gray-500">Just now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">📊 Key Statistics</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className={`bg-gradient-to-r ${stat.color} p-6 text-white`}>
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <p className="text-sm opacity-90">{stat.label}</p>
                </div>
                <div className="p-6">
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {stat.label === 'Bins at Risk' ? 'Action required' : 'Last 24 hours'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Explanation */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex items-start space-x-4">
            <div className="text-4xl">💡</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-3">System Insight</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <span className="font-semibold">Market zones</span> show higher waste accumulation due to increased commercial activity and foot traffic.
                </p>
                <p>
                  During <span className="font-semibold text-red-600">Festival Mode</span>, expect waste levels to surge by approximately{' '}
                  <span className="font-semibold text-emerald-600">×{currentCity.festivalImpact}</span> compared to normal days.
                </p>
                <p>
                  Current bins at risk ({currentCity.binsAtRisk}) require immediate attention to prevent overflow and maintain city cleanliness standards.
                </p>
                <p className="bg-emerald-50 border-l-4 border-emerald-500 pl-4 py-2 rounded text-sm">
                  ✅ <span className="font-semibold">Recommendation:</span> Deploy {currentCity.trucksRequired} collection trucks across priority zones today.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">⚡ Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 font-medium transition-colors text-left border border-emerald-200">
                📍 View Zone Details
              </button>
              <button className="w-full px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-medium transition-colors text-left border border-blue-200">
                🚛 Schedule Collection
              </button>
              <button className="w-full px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 font-medium transition-colors text-left border border-purple-200">
                📈 View Analytics
              </button>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">🚨 Active Alerts</h3>
            <div className="space-y-3">
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <p className="font-semibold text-red-900 text-sm">Zone Overflow Alert</p>
                <p className="text-xs text-red-700 mt-1">Market zone - 3 bins at 95% capacity</p>
              </div>
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                <p className="font-semibold text-yellow-900 text-sm">Low Truck Availability</p>
                <p className="text-xs text-yellow-700 mt-1">Only 2 trucks available - High demand expected</p>
              </div>
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                <p className="font-semibold text-green-900 text-sm">Collection On Schedule</p>
                <p className="text-xs text-green-700 mt-1">95% of zones collected within SLA</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

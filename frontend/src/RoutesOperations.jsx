import { useState, useEffect } from 'react'
import logo from './assets/logo.png'

const API_BASE_URL = 'http://localhost:3000/api'

export default function RoutesOperations() {
  const [selectedCity, setSelectedCity] = useState('navimumbai')
  const [festivalMode, setFestivalMode] = useState(false)
  const [user, setUser] = useState(null)
  const [routesData, setRoutesData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    fetchRoutes()
  }, [selectedCity, festivalMode])

  const fetchRoutes = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `${API_BASE_URL}/routes/${selectedCity}?festival=${festivalMode}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      )
      const data = await response.json()
      if (data.success) {
        setRoutesData(data.data)
      }
    } catch (error) {
      console.error('Error fetching routes:', error)
    }
    setLoading(false)
  }

  if (loading || !routesData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-gray-600">Loading routes...</p>
        </div>
      </div>
    )
  }

  const currentRoute = routesData
  const activeTrucks = currentRoute.trucks

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200'
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getTotalStats = () => {
    const totalDistance = activeTrucks.reduce((sum, truck) => {
      return sum + parseFloat(truck.distance)
    }, 0)
    const totalStops = activeTrucks.reduce((sum, truck) => sum + truck.stops, 0)

    return { totalDistance: totalDistance.toFixed(1), totalStops }
  }

  const stats = getTotalStats()

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
              <p className="text-xs text-gray-500">Routes & Operations</p>
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
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Route & Operations</h2>
          <p className="text-gray-600">
            Cloud-optimized collection routes for maximum efficiency
          </p>
        </div>

        {/* Control Panel */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          {/* City Selector */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              🏙️ City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 font-medium"
            >
              <option value="navimumbai">Navi Mumbai</option>
              <option value="indore">Indore</option>
              <option value="surat">Surat</option>
            </select>
          </div>

          {/* Festival Mode Toggle */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex flex-col justify-between">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🎉 Festival Mode
              </label>
              <p className={`text-xs font-bold ${festivalMode ? 'text-red-600' : 'text-green-600'}`}>
                {festivalMode ? 'ACTIVE' : 'INACTIVE'}
              </p>
            </div>
            <button
              onClick={() => setFestivalMode(!festivalMode)}
              className={`w-full py-2 rounded-lg font-semibold transition-all text-sm ${
                festivalMode
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600'
              }`}
            >
              {festivalMode ? 'Disable' : 'Enable'}
            </button>
          </div>

          {/* Total Distance */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-6 border border-blue-200">
            <p className="text-sm font-semibold text-blue-700 mb-2">📍 Total Distance</p>
            <p className="text-3xl font-bold text-blue-900">{stats.totalDistance}</p>
            <p className="text-xs text-blue-600 mt-1">km</p>
          </div>

          {/* Total Stops */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl shadow-lg p-6 border border-emerald-200">
            <p className="text-sm font-semibold text-emerald-700 mb-2">🎯 Total Stops</p>
            <p className="text-3xl font-bold text-emerald-900">{stats.totalStops}</p>
            <p className="text-xs text-emerald-600 mt-1">collections</p>
          </div>
        </div>

        {/* Route Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {activeTrucks.map((truck) => (
            <div
              key={truck.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Truck Header */}
              <div className={`bg-gradient-to-r ${truck.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold">{truck.name}</h3>
                  <span className="text-4xl">🚛</span>
                </div>
                <p className="text-sm opacity-90">{truck.zone}</p>
              </div>

              {/* Truck Stats */}
              <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 border-b border-gray-100">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Distance</p>
                  <p className="text-lg font-bold text-gray-900">{truck.distance}</p>
                </div>
                <div className="text-center border-l border-r border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Time</p>
                  <p className="text-lg font-bold text-gray-900">{truck.estimatedTime}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Stops</p>
                  <p className="text-lg font-bold text-gray-900">{truck.stops}</p>
                </div>
              </div>

              {/* Bins List */}
              <div className="p-6">
                <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-lg mr-2">📦</span>
                  Collection Route ({truck.bins.length} bins)
                </h4>
                <div className="space-y-3">
                  {truck.bins.map((bin, idx) => (
                    <div
                      key={bin.id}
                      className={`p-4 rounded-lg border-2 ${getPriorityColor(bin.priority)}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-sm">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{bin.location}</p>
                            <p className="text-xs mt-1">Bin ID: {bin.id}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full bg-white ${
                          bin.priority === 'critical' ? 'text-red-600' :
                          bin.priority === 'high' ? 'text-orange-600' :
                          bin.priority === 'medium' ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {bin.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2">
                        <div
                          className={`h-full rounded-full transition-all ${
                            bin.fillLevel >= 90 ? 'bg-red-500' :
                            bin.fillLevel >= 75 ? 'bg-orange-500' :
                            bin.fillLevel >= 60 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${bin.fillLevel}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-2">{bin.fillLevel}% full</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explanation Panel */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex items-start space-x-4">
            <div className="text-5xl">🧠</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Route Intelligence</h3>
              <div className="space-y-4 text-gray-700">
              <div className={`bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded`}>
                  <p className="font-semibold text-emerald-900 mb-2">Smart Route Optimization</p>
                  <p className="text-sm">
                    {currentRoute.explanation}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <p className="font-semibold text-blue-900 mb-2">📊 Fill Level Priority</p>
                    <p className="text-xs text-blue-800">
                      Bins are prioritized by fill level and waste density. Critical bins (90%+) are collected first to prevent overflow.
                    </p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                    <p className="font-semibold text-purple-900 mb-2">🎉 Festival Adjustment</p>
                    <p className="text-xs text-purple-800">
                      When festival mode is active, additional trucks are deployed to high-traffic event areas to handle surge in waste.
                    </p>
                  </div>
                </div>

                <p className="text-sm pt-2 text-gray-600">
                  <span className="font-semibold">Why this works:</span> By avoiding low-fill residential bins and focusing on high-density commercial zones, we maximize efficiency and reduce unnecessary fuel consumption. Routes automatically adjust when cities or festival status change.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Driver Notes */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200 p-6">
          <p className="text-sm font-semibold text-amber-900 mb-3">⚠️ Driver Guidelines</p>
          <ul className="text-sm text-amber-800 space-y-2">
            <li>✓ Follow route order to ensure optimal time management</li>
            <li>✓ Contact dispatch for critical priority bins (red) if inaccessible</li>
            <li>✓ Report any issues or route delays immediately</li>
            <li>✓ During festivals, expect 25-35% longer collection times</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

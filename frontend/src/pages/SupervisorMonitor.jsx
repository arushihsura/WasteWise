import React, { useState, useEffect } from 'react'
import logo from '../assets/logo.png'

const SupervisorMonitor = () => {
  const [bins, setBins] = useState([
    { id: 'BIN-001', zone: 'Kharghar Sector 10', fill: 88, priority: 'high', reason: 'High fill + Market zone', lastCollected: '3 days ago', riskScore: 95 },
    { id: 'BIN-002', zone: 'Belapur Railway Station', fill: 72, priority: 'medium', reason: 'High-traffic transit area', lastCollected: '2 days ago', riskScore: 78 },
    { id: 'BIN-003', zone: 'Kharghar Sector 35', fill: 45, priority: 'low', reason: 'Normal capacity', lastCollected: '1 day ago', riskScore: 28 },
    { id: 'BIN-004', zone: 'Panvel Market Yard', fill: 82, priority: 'high', reason: 'Not collected recently', lastCollected: '4 days ago', riskScore: 85 },
    { id: 'BIN-005', zone: 'Kharghar Hills', fill: 38, priority: 'low', reason: 'Recently collected', lastCollected: '8 hours ago', riskScore: 20 },
  ])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBins(prevBins =>
        prevBins.map(bin => {
          const newFill = Math.min(100, bin.fill + (Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0))
          let newPriority = bin.priority
          let newReason = bin.reason
          let newRiskScore = bin.riskScore

          if (newFill >= 80) {
            newPriority = 'high'
            newReason = 'High fill level'
            newRiskScore = 80 + Math.floor(Math.random() * 20)
          } else if (newFill >= 60) {
            newPriority = 'medium'
            newRiskScore = 60 + Math.floor(Math.random() * 20)
          } else {
            newPriority = 'low'
            newRiskScore = Math.floor(Math.random() * 40)
          }

          return {
            ...bin,
            fill: newFill,
            priority: newPriority,
            reason: newReason,
            riskScore: newRiskScore,
          }
        })
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'high':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          badge: 'bg-red-500',
          text: 'text-red-900',
          light: 'bg-red-100',
          icon: '🔴',
          label: 'CRITICAL',
        }
      case 'medium':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          badge: 'bg-amber-500',
          text: 'text-amber-900',
          light: 'bg-amber-100',
          icon: '🟡',
          label: 'MEDIUM',
        }
      default:
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          badge: 'bg-emerald-500',
          text: 'text-emerald-900',
          light: 'bg-emerald-100',
          icon: '🟢',
          label: 'LOW',
        }
    }
  }

  const highCount = bins.filter(b => b.priority === 'high').length
  const mediumCount = bins.filter(b => b.priority === 'medium').length
  const lowCount = bins.filter(b => b.priority === 'low').length

  const sortedBins = [...bins].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

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
              <p className="text-xs text-gray-500">Supervisor Monitor</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 capitalize">
                {user?.fullName || 'Supervisor'}
              </p>
              <p className="text-xs text-gray-500 capitalize">{user?.role || 'Role'}</p>
            </div>
            <button className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full text-white font-semibold text-sm flex items-center justify-center hover:shadow-lg transition-shadow">
              {user?.fullName?.charAt(0) || 'S'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-emerald-700 uppercase tracking-widest mb-2">
            📊 Field Operations
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Bin Monitoring & Priority</h2>
          <p className="text-gray-600">
            AI-powered collection prioritization • Real-time IoT data • ML-based predictions
          </p>
        </div>

        {/* Priority Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* High Priority */}
          <div className="bg-white rounded-2xl shadow-lg border-l-4 border-red-500 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">🔴 CRITICAL</p>
                <p className="text-3xl font-bold text-red-600">{highCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-2xl">
                🚨
              </div>
            </div>
            <p className="text-xs text-gray-600">Immediate action required</p>
          </div>

          {/* Medium Priority */}
          <div className="bg-white rounded-2xl shadow-lg border-l-4 border-amber-500 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">🟡 MEDIUM</p>
                <p className="text-3xl font-bold text-amber-600">{mediumCount}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-2xl">
                ⏱️
              </div>
            </div>
            <p className="text-xs text-gray-600">Schedule within 24h</p>
          </div>

          {/* Low Priority */}
          <div className="bg-white rounded-2xl shadow-lg border-l-4 border-emerald-500 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">🟢 LOW</p>
                <p className="text-3xl font-bold text-emerald-600">{lowCount}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-2xl">
                ✓
              </div>
            </div>
            <p className="text-xs text-gray-600">Monitor only</p>
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">📋 Priority Queue</h3>
          <p className="text-gray-600 text-sm">
            Bins sorted by priority level. AI system analyzes fill levels, location characteristics, collection history, and predicted overflow risk.
          </p>
        </div>

        {/* Bins Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {sortedBins.map((bin) => {
            const styles = getPriorityStyles(bin.priority)
            const fillColor =
              bin.priority === 'high'
                ? 'bg-red-500'
                : bin.priority === 'medium'
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'

            return (
              <div
                key={bin.id}
                className={`${styles.bg} border-2 ${styles.border} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer`}
              >
                {/* Header with ID and Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 font-mono mb-1">{bin.id}</h4>
                    <p className="text-sm text-gray-600 flex items-center">
                      📍 {bin.zone}
                    </p>
                  </div>
                  <div className={`${styles.badge} text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1`}>
                    <span>{styles.icon}</span>
                    <span>{styles.label}</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-4 p-4 bg-white/50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1">FILL LEVEL</p>
                    <p className={`text-xl font-bold ${styles.text}`}>{bin.fill}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1">OVERFLOW RISK</p>
                    <p className={`text-xl font-bold ${styles.text}`}>{bin.riskScore}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1">HOURS AGO</p>
                    <p className={`text-lg font-bold ${styles.text}`}>{bin.lastCollected}</p>
                  </div>
                </div>

                {/* Fill Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${fillColor}`}
                      style={{ width: `${bin.fill}%` }}
                    />
                  </div>
                </div>

                {/* Priority Reason Box */}
                <div className={`${styles.light} rounded-lg p-4 mb-4 border border-gray-200`}>
                  <p className="text-xs text-gray-600 font-semibold mb-2">🧠 PRIORITY REASON</p>
                  <p className={`text-sm font-semibold ${styles.text}`}>{bin.reason}</p>
                </div>

                {/* Last Collected Info */}
                <div className="flex items-center space-x-2 mb-4 text-xs text-gray-600">
                  <span>🕒</span>
                  <span>Last collected: <strong>{bin.lastCollected}</strong></span>
                </div>

                {/* Action Button */}
                <button
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    bin.priority === 'high'
                      ? `${styles.badge} text-white hover:opacity-90 transform group-hover:scale-105`
                      : 'bg-white border-2 border-gray-200 text-gray-900 hover:border-gray-300'
                  }`}
                  onClick={() => alert(`Scheduling collection for ${bin.id}\n📍 ${bin.zone}\nPriority: ${styles.label}\n💡 ${bin.reason}`)}
                >
                  {bin.priority === 'high' ? '🚛 Schedule Collection' : '📊 View Details'}
                </button>
              </div>
            )
          })}
        </div>

        {/* Footer Info Box */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-8 text-center">
          <div className="text-sm text-gray-600 mb-3">
            ☁️ Cloud-powered intelligence • 📡 Real-time IoT data • 🤖 ML-based predictions
          </div>
          <div className="text-xs text-gray-500">
            Last updated: {new Date().toLocaleTimeString()} | Auto-refresh every 5 seconds
          </div>
        </div>
      </main>
    </div>
  )
}

export default SupervisorMonitor
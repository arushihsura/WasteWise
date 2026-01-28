import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from './assets/logo.png'

export default function Landing() {
  const [selectedRole, setSelectedRole] = useState(null)
  const navigate = useNavigate()

  const roles = [
    { id: 'admin', label: 'City Admin', icon: '🏛️', description: 'Manage city operations' },
    { id: 'supervisor', label: 'Supervisor', icon: '👔', description: 'Oversee teams' },
    { id: 'commissioner', label: 'Commissioner', icon: '📋', description: 'Review reports' },
  ]

  const handleSignIn = () => {
    navigate('/signin')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="WasteWise Logo" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                WasteWise
              </h1>
              <p className="text-xs text-gray-500">Smart Waste Management</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/signup')}
            className="text-sm text-emerald-700 hover:text-emerald-800 font-medium transition-colors"
          >
            Create account →
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Section - Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                Government Platform
              </div>
              <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                Waste<span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Wise</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Clean Cities. Smart Decisions. Powered by Cloud
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: '📊', label: 'Analytics' },
                { icon: '🚛', label: 'Tracking' },
                { icon: '📍', label: 'Mapping' }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all">
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <div className="text-sm font-medium text-gray-700">{feature.label}</div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-500">Cities</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div>
                <div className="text-3xl font-bold text-gray-900">1M+</div>
                <div className="text-sm text-gray-500">Collections</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div>
                <div className="text-3xl font-bold text-gray-900">99%</div>
                <div className="text-sm text-gray-500">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Section - Login Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-gray-900">Welcome Back</h3>
              <p className="text-gray-500">Select your role to continue</p>
            </div>

            {/* Role Selection */}
            <div className="space-y-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedRole === role.id
                      ? 'border-emerald-500 bg-emerald-50 shadow-md'
                      : 'border-gray-200 hover:border-emerald-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                      selectedRole === role.id ? 'bg-emerald-100' : 'bg-gray-100'
                    }`}>
                      {role.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{role.label}</div>
                      <div className="text-sm text-gray-500">{role.description}</div>
                    </div>
                    {selectedRole === role.id && (
                      <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            {selectedRole ? (
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleSignIn}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-200"
                >
                  Sign in as {roles.find(r => r.id === selectedRole)?.label}
                </button>
                <button
                  onClick={() => setSelectedRole(null)}
                  className="w-full border-2 border-gray-200 text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Clear Selection
                </button>
              </div>
            ) : (
              <div className="pt-2 text-center text-sm text-gray-400 italic">
                Please select a role above to continue
              </div>
            )}

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400">or</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <button
              onClick={() => navigate('/signup')}
              className="w-full text-emerald-600 hover:text-emerald-700 font-medium py-2 transition-colors"
            >
              Create a new account
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
          © 2026 WasteWise. Official Government Platform. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
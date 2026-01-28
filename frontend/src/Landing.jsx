import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'

export default function Landing() {
  const [selectedRole, setSelectedRole] = useState(null)
  const navigate = useNavigate()

  const roles = [
    { id: 'admin', label: 'City Admin', icon: '🏛️' },
    { id: 'supervisor', label: 'Supervisor', icon: '👔' },
    { id: 'commissioner', label: 'Commissioner', icon: '📋' },
  ]

  const handleSignIn = () => {
    navigate('/signin')
  }

  return (
    <div className="landing-container">
      {/* Header */}
      <header className="landing-header">
        <div className="header-content">
          <h1 className="app-title">WasteWise</h1>
          <p className="app-subtitle">Smart Waste Management System</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="landing-main">
        <div className="content-wrapper">
          {/* Left Section - Info */}
          <section className="info-section">
            <div className="info-content">
              <h2>Government Waste Management Platform</h2>
              <p>
                A comprehensive solution for managing municipal waste collection, tracking, and reporting.
              </p>
              <div className="city-logos">
                <div className="city-logo">🏙️</div>
                <div className="city-logo">🌆</div>
                <div className="city-logo">🏘️</div>
              </div>
            </div>
          </section>

          {/* Right Section - Login */}
          <section className="login-section">
            <div className="login-card">
              <h3>Select Your Role</h3>
              <p className="login-subtitle">Sign in to access the platform</p>

              <div className="roles-grid">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    className={`role-button ${selectedRole === role.id ? 'selected' : ''}`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <span className="role-icon">{role.icon}</span>
                    <span className="role-label">{role.label}</span>
                  </button>
                ))}
              </div>

              {selectedRole && (
                <div className="action-buttons">
                  <button 
                    className="login-btn primary"
                    onClick={handleSignIn}
                  >
                    Sign In as {roles.find(r => r.id === selectedRole)?.label}
                  </button>
                  <button className="login-btn secondary" onClick={() => setSelectedRole(null)}>
                    Clear Selection
                  </button>
                </div>
              )}

              {!selectedRole && (
                <p className="selection-prompt">Select a role to continue</p>
              )}

              <div className="divider">
                <span>or</span>
              </div>

              <button 
                className="signup-link"
                onClick={() => navigate('/signup')}
              >
                Create a new account
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <p>&copy; 2026 WasteWise. Official Government Platform.</p>
      </footer>
    </div>
  )
}

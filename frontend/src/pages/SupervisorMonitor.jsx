import React, { useState, useEffect } from 'react';

const SupervisorMonitor = () => {
  // Sample bin data with priority and reasoning - in production this would come from your cloud backend
  const [bins, setBins] = useState([
    { id: 'BIN-001', zone: 'Kharghar Sector 10', fill: 88, priority: 'high', reason: 'High fill + Market zone', lastCollected: '3 days ago', riskScore: 95 },
    { id: 'BIN-002', zone: 'Belapur Railway Station', fill: 72, priority: 'medium', reason: 'High-traffic transit area', lastCollected: '2 days ago', riskScore: 78 },
    { id: 'BIN-003', zone: 'Kharghar Sector 35', fill: 45, priority: 'low', reason: 'Normal capacity', lastCollected: '1 day ago', riskScore: 28 },
    { id: 'BIN-004', zone: 'Panvel Market Yard', fill: 82, priority: 'high', reason: 'Not collected recently', lastCollected: '4 days ago', riskScore: 85 },
    { id: 'BIN-005', zone: 'Kharghar Hills', fill: 38, priority: 'low', reason: 'Recently collected', lastCollected: '8 hours ago', riskScore: 20 },
  ]);

  // Get status based on priority level (3 tiers)
  const getPriorityStatus = (priority) => {
    if (priority === 'high') return { 
      color: '#DC2626', 
      label: 'HIGH', 
      icon: '🔴', 
      bgColor: '#FEE2E2',
      textColor: '#991B1B'
    };
    if (priority === 'medium') return { 
      color: '#D97706', 
      label: 'MEDIUM', 
      icon: '🟡', 
      bgColor: '#FEF3C7',
      textColor: '#92400E'
    };
    return { 
      color: '#059669', 
      label: 'LOW', 
      icon: '🟢', 
      bgColor: '#D1FAE5',
      textColor: '#065F46'
    };
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBins(prevBins => 
        prevBins.map(bin => {
          const newFill = Math.min(100, bin.fill + (Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0));
          let newPriority = bin.priority;
          let newReason = bin.reason;
          let newRiskScore = bin.riskScore;
          
          // Update priority based on new fill level
          if (newFill >= 80) {
            newPriority = 'high';
            newReason = 'High fill level';
            newRiskScore = 80 + Math.floor(Math.random() * 20);
          } else if (newFill >= 60) {
            newPriority = 'medium';
            newRiskScore = 60 + Math.floor(Math.random() * 20);
          } else {
            newPriority = 'low';
            newRiskScore = Math.floor(Math.random() * 40);
          }
          
          return {
            ...bin,
            fill: newFill,
            priority: newPriority,
            reason: newReason,
            riskScore: newRiskScore
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const highCount = bins.filter(b => b.priority === 'high').length;
  const mediumCount = bins.filter(b => b.priority === 'medium').length;
  const lowCount = bins.filter(b => b.priority === 'low').length;

  return (
    <div style={{ 
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <p style={{ 
              color: '#64748b', 
              margin: '0 0 0.5rem 0', 
              fontSize: '0.85rem',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Field Supervisor Dashboard • Intelligent Priority System
            </p>
            <h1 style={{ 
              color: '#1e3a3a', 
              fontSize: '2rem', 
              fontWeight: '700',
              margin: '0 0 0.5rem 0'
            }}>
              WasteWise - Bin Monitoring & Priority
            </h1>
            <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem' }}>
              AI-powered collection prioritization across Navi Mumbai
            </p>
          </div>
          <div style={{ 
            background: '#f1f5f9', 
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.25rem' }}>TOTAL BINS</div>
            <div style={{ color: '#1e3a3a', fontSize: '1.75rem', fontWeight: '700' }}>{bins.length}</div>
          </div>
        </div>

        {/* Priority Stats Row */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '1.5rem'
        }}>
          <div style={{
            background: '#FEF2F2',
            border: '2px solid #FCA5A5',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ color: '#DC2626', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '600' }}>🔴 HIGH</div>
            <div style={{ color: '#1e3a3a', fontSize: '2rem', fontWeight: '700' }}>{highCount}</div>
            <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem' }}>Immediate action required</div>
          </div>

          <div style={{
            background: '#FFFBEB',
            border: '2px solid #FCD34D',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ color: '#D97706', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '600' }}>🟡 MEDIUM</div>
            <div style={{ color: '#1e3a3a', fontSize: '2rem', fontWeight: '700' }}>{mediumCount}</div>
            <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem' }}>Schedule within 24h</div>
          </div>

          <div style={{
            background: '#F0FDF4',
            border: '2px solid #6EE7B7',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ color: '#059669', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '600' }}>🟢 LOW</div>
            <div style={{ color: '#1e3a3a', fontSize: '2rem', fontWeight: '700' }}>{lowCount}</div>
            <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem' }}>Monitor only</div>
          </div>
        </div>
      </div>

      {/* Divider with Section Header - Left Aligned */}
      <div style={{ 
        margin: '3rem 0 1rem 0',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{
          color: '#64748b',
          fontSize: '0.875rem',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          📋 Priority Queue - Bins Requiring Attention
        </div>
        <div style={{
          flex: 1,
          height: '1px',
          background: 'linear-gradient(to right, #e2e8f0, transparent)'
        }} />
      </div>

      {/* Subtext Section */}
      <div style={{
        marginBottom: '2rem',
        padding: '1rem 0',
        color: '#64748b',
        fontSize: '0.9rem',
        lineHeight: '1.6'
      }}>
        <p style={{ margin: '0 0 0.5rem 0' }}>
          AI system analyzes multiple factors to prioritize collection routes in Kharghar and surrounding areas: fill levels, location characteristics (market zones, railway stations), collection history, and predicted overflow risk.
        </p>
        <p style={{ margin: '0 0 0.5rem 0' }}>
          Each bin displays an <strong>explainable reason</strong> for its priority level and a <strong>risk score</strong> (0-100) indicating overflow probability. This helps you make informed decisions about collection scheduling.
        </p>
        <p style={{ margin: '0' }}>
          Bins are automatically sorted by priority level. Focus on <span style={{ color: '#DC2626', fontWeight: '600' }}>High</span> priority bins first, followed by <span style={{ color: '#D97706', fontWeight: '600' }}>Medium</span> priority bins to prevent overflow incidents.
        </p>
      </div>

      {/* Bin Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {bins.sort((a, b) => {
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }).map((bin) => {
          const status = getPriorityStatus(bin.priority);
          
          return (
            <div
              key={bin.id}
              style={{
                background: status.bgColor,
                borderRadius: '16px',
                padding: '1.75rem',
                border: `2px solid ${status.color}`,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Priority Badge */}
              <div style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: status.color,
                color: '#ffffff',
                padding: '0.4rem 0.85rem',
                borderRadius: '20px',
                fontSize: '0.7rem',
                fontWeight: '700',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                {status.icon} {status.label}
              </div>

              {/* Bin ID */}
              <div style={{
                color: '#1e3a3a',
                fontSize: '1.4rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
                fontFamily: 'monospace'
              }}>
                {bin.id}
              </div>

              {/* Zone */}
              <div style={{
                color: '#64748b',
                fontSize: '0.95rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                📍 {bin.zone}
              </div>

              {/* Risk Score & Fill Level Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1rem',
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '8px'
              }}>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.7rem', marginBottom: '0.25rem', fontWeight: '600' }}>OVERFLOW RISK</div>
                  <div style={{ color: status.textColor, fontSize: '1.5rem', fontWeight: '700' }}>{bin.riskScore}%</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.7rem', marginBottom: '0.25rem', fontWeight: '600' }}>FILL LEVEL</div>
                  <div style={{ color: status.textColor, fontSize: '1.5rem', fontWeight: '700' }}>{bin.fill}%</div>
                </div>
              </div>

              {/* Reason Section */}
              <div style={{
                marginBottom: '1rem',
                padding: '0.85rem',
                background: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '8px',
                border: `1px solid ${status.color}40`
              }}>
                <div style={{ 
                  color: '#64748b', 
                  fontSize: '0.7rem', 
                  marginBottom: '0.4rem', 
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  🧠 Priority Reason
                </div>
                <div style={{ 
                  color: status.textColor, 
                  fontSize: '0.875rem', 
                  fontWeight: '600',
                  lineHeight: '1.4'
                }}>
                  {bin.reason}
                </div>
              </div>

              {/* Last Collected */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                color: '#64748b',
                fontSize: '0.8rem'
              }}>
                <span>🕒</span>
                <span>Last collected: <strong>{bin.lastCollected}</strong></span>
              </div>

              {/* Progress Bar */}
              <div style={{
                width: '100%',
                height: '14px',
                background: 'rgba(0, 0, 0, 0.08)',
                borderRadius: '7px',
                overflow: 'hidden',
                marginBottom: '1.25rem',
                border: '1px solid rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  width: `${bin.fill}%`,
                  height: '100%',
                  background: status.color,
                  borderRadius: '7px',
                  transition: 'width 0.5s ease'
                }} />
              </div>

              {/* Action Button */}
              <button
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  background: bin.priority === 'high' ? status.color : '#f1f5f9',
                  color: bin.priority === 'high' ? '#ffffff' : '#1e3a3a',
                  border: bin.priority === 'high' ? 'none' : '1px solid #e2e8f0',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.85';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onClick={() => alert(`Scheduling collection for ${bin.id} in ${bin.zone}\nPriority: ${status.label}\nReason: ${bin.reason}`)}
              >
                {bin.priority === 'high' ? '🚨 Schedule Collection' : '📊 View Details'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        background: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        textAlign: 'center'
      }}>
        <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
          ☁️ Cloud-powered intelligence • 📡 Real-time IoT data • 🤖 ML-based predictions
        </div>
        <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.5rem' }}>
          Last updated: {new Date().toLocaleTimeString()} | Auto-refresh every 5s
        </div>
      </div>
    </div>
  );
};

export default SupervisorMonitor;
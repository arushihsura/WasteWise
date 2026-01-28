import React, { useState, useEffect, useRef } from 'react'
import logo from '../assets/logo.png'

const AIInsights = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! I\'m your WasteWise AI Assistant. I can help you understand waste collection patterns, bin priorities, and operational insights. Ask me anything about your waste management system!',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sampleResponses = {
    "Why is Zone B urgent?": "Zone B is urgent because 3 critical bins (90%+ fill) haven't been collected in 4 days. The Market Street area alone has 2 bins at 95% capacity, creating immediate overflow risk. I recommend dispatching Truck 1 to Zone B within the next 2 hours.",
    "What changed today?": "Today's changes: 5 bins crossed high priority threshold (up from 2 yesterday), average fill level increased 8%, and Zone A experienced 15% more waste than usual due to increased foot traffic. Festival mode would impact collection by approximately 1.6x surge.",
    "How efficient is our system?": "Your system is 94% efficient. Collections are scheduled optimally, with 95% of bins collected within SLA. Recommendation: Deploy additional trucks on weekends when fill rates increase 20% on average.",
    "What zones need attention?": "Current zone status: Zone A (5 bins, 2 critical), Zone B (4 bins, 3 high), Zone C (3 bins, all low). Zone B requires immediate attention due to high-density commercial activity. Zone A secondary priority.",
    "Forecast tomorrow's demand": "Based on patterns, Zone B will reach critical capacity by 6 PM today. Weekend waste typically peaks on Saturday mornings at 11 AM. Festival periods show 1.6-1.8x waste surge in market zones.",
  }

  const generateResponse = (input) => {
    const lowerInput = input.toLowerCase()

    if (
      lowerInput.includes('why') &&
      (lowerInput.includes('urgent') || lowerInput.includes('critical'))
    ) {
      return sampleResponses.urgent
    }
    if (lowerInput.includes('changed') || lowerInput.includes('today')) {
      return sampleResponses.changed
    }
    if (lowerInput.includes('zone')) {
      return sampleResponses.zones
    }
    if (
      lowerInput.includes('efficiency') ||
      lowerInput.includes('performance')
    ) {
      return sampleResponses.efficiency
    }
    if (
      lowerInput.includes('forecast') ||
      lowerInput.includes('predict') ||
      lowerInput.includes('tomorrow')
    ) {
      return sampleResponses.forecast
    }
    if (lowerInput.includes('help') || lowerInput.includes('what')) {
      return "I can help you with: understanding bin priorities, zone analysis, efficiency metrics, waste forecasting, festival impact predictions, and collection optimization. Try asking 'Why is Zone B urgent?' or 'What changed today?'"
    }

    return "Based on current data: Zone B has 3 high-priority bins requiring attention within 24 hours. Average system efficiency is 94%, with optimal collection scheduling in place. Would you like me to analyze specific zones, forecast demand, or explain priority calculations?"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue,
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    const currentQuery = inputValue
    setInputValue('')
    setLoading(true)

    try {
      // Check if it's a suggested question with hardcoded response
      if (sampleResponses[currentQuery]) {
        // Use hardcoded response for suggested questions
        setTimeout(() => {
          const botResponse = {
            id: messages.length + 2,
            type: 'bot',
            text: sampleResponses[currentQuery],
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, botResponse])
          setLoading(false)
        }, 500)
        return
      }

      // For other queries, call the API
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Authentication required')
      }

      const response = await fetch('http://localhost:3000/api/ai/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: currentQuery,
          city: user?.city || 'pune',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()

      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: data.response || 'Unable to generate response',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error('Error:', error)
      const errorResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: `Sorry, I encountered an error: ${error.message}. Please try again.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setLoading(false)
    }
  }

  const suggestedQuestions = [
    "Why is Zone B urgent?",
    "What changed today?",
    "How efficient is our system?",
    "What zones need attention?",
    "Forecast tomorrow's demand",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="WasteWise Logo" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                WasteWise
              </h1>
              <p className="text-xs text-gray-500">AI Insights</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 capitalize">
                {user?.fullName || 'Official'}
              </p>
              <p className="text-xs text-gray-500 capitalize">{user?.role || 'Role'}</p>
            </div>
            <button className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full text-white font-semibold text-sm flex items-center justify-center hover:shadow-lg transition-shadow">
              {user?.fullName?.charAt(0) || 'A'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-8 flex flex-col">
        {/* Title Section */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-emerald-700 uppercase tracking-widest mb-2">
            🤖 Intelligent Analysis
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">AI Insights Assistant</h2>
          <p className="text-gray-600">
            Ask natural language questions about your waste management system. Get instant insights powered by AI.
          </p>
        </div>

        {/* Chat Container */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-[500px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md lg:max-w-lg xl:max-w-2xl rounded-2xl px-6 py-4 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-900 rounded-bl-none border border-gray-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.type === 'user'
                        ? 'text-emerald-100'
                        : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 rounded-2xl rounded-bl-none px-6 py-4 border border-gray-200">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.4s' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions (show only if less than 2 messages) */}
          {messages.length <= 2 && (
            <div className="border-t border-gray-100 px-6 py-6 bg-gradient-to-br from-emerald-50 to-teal-50">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-3">
                💡 Try asking:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputValue(question)}
                    className="text-left text-sm px-4 py-2 bg-white border border-emerald-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 transition-colors text-gray-700 font-medium"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-100 bg-white p-6">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                placeholder="Ask me about bins, zones, efficiency, forecasts... (Press Enter to send)"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors resize-none"
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !inputValue.trim()}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2"
              >
                <span>📤</span>
                <span>Send</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 Tip: Ask about zone priorities, efficiency metrics, waste forecasts, or festival impact predictions.
            </p>
          </div>
        </div>

        {/* Info Panel */}
        <div className="mt-8 grid lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-emerald-200 p-6">
            <p className="text-sm font-semibold text-emerald-700 mb-2">💬 What I Can Do</p>
            <ul className="text-xs text-gray-600 space-y-2">
              <li>✓ Analyze bin priorities</li>
              <li>✓ Explain zone patterns</li>
              <li>✓ Forecast demand</li>
              <li>✓ Assess efficiency</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-teal-200 p-6">
            <p className="text-sm font-semibold text-teal-700 mb-2">📊 Current Context</p>
            <ul className="text-xs text-gray-600 space-y-2">
              <li>🗑️ 5 critical bins</li>
              <li>📈 94% efficiency</li>
              <li>🎉 Festival ready</li>
              <li>🚛 6 trucks active</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-amber-200 p-6">
            <p className="text-sm font-semibold text-amber-700 mb-2">🎯 Next Actions</p>
            <ul className="text-xs text-gray-600 space-y-2">
              <li>⚡ Urgent: Zone B</li>
              <li>📅 Schedule: Zone C</li>
              <li>📡 Monitor: Zone A</li>
              <li>🔄 Update: 5 mins</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-4 mt-auto">
        <div className="max-w-4xl mx-auto px-6 text-center text-xs text-gray-500">
          <p>
            🤖 Powered by AI • 📊 Real-time data integration • 💡 Natural language insights
          </p>
        </div>
      </footer>
    </div>
  )
}

export default AIInsights

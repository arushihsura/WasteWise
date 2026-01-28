import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './Landing'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Dashboard from './Dashboard'
import RoutesOperations from './RoutesOperations'
import SupervisorMonitor from './pages/SupervisorMonitor'
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/routes" element={<RoutesOperations />} />
        <Route path="/supervisor-monitor" element={<SupervisorMonitor />} />
      </Routes>
    </Router>
  )
}

export default App

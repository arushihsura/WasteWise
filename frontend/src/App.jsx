import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './Landing'
import SignIn from './SignIn'
import SignUp from './SignUp'
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App

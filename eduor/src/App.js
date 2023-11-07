import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ResetPass from './pages/ResetPass'
import SignupPage from './pages/SignupPage'
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom'

function App() {
  const isLoggedIn = window.localStorage.getItem('loggedIn');
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn==="true"? <HomePage/> : <LoginPage/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/signup" element={<SignupPage/>}></Route>
          <Route path="/home" element={<HomePage/>}></Route>
          <Route path="/reset-pass" element={<ResetPass/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

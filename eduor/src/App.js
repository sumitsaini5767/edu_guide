import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ForgotPassword from './pages/ForgotPassword'
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import ResetPassword from './pages/ResetPassword'

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
          <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
          <Route path="/reset-password/:id/:token" element={<ResetPassword/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

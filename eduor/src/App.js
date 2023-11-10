import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ForgotPassword from './pages/ForgotPassword'
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import ResetPassword from './pages/ResetPassword'
import VerifyEmail from './pages/VerifyEmail'

function App() {
  const isLoggedIn = window.localStorage.getItem('loggedIn');
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn==="true"? <HomePage/> : <SignupPage/>}></Route>
          <Route path="/signup" element={<SignupPage/>}></Route>
          <Route path="/verify-email/:email/:token" element={<VerifyEmail/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
          <Route path="/reset-password/:id/:token" element={<ResetPassword/>}></Route>
          <Route path="/home" element={<HomePage/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

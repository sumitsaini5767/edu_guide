import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ResetPass from './pages/ResetPass'
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
<<<<<<< HEAD
          <Route path="/reset-pass" element={<ResetPass/>}></Route>
=======
          <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
          <Route path="/reset-password/:id/:token" element={<ResetPassword/>}></Route>
>>>>>>> 24aa535d2ead05f69a116cee11595ce42f3e2751
        </Routes>
      </Router>
    </>
  )
}

export default App

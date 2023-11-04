import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom'

function App() {
<<<<<<< HEAD

  const isLoggedIn = window.localStorage.getItem("loggedIn");

=======
  const isLoggedIn = window.localStorage.getItem('loggedIn');
>>>>>>> ffe658eba891e264f957eed2f2d1fe9d6fe5135d
  return (
    <>
      <Router>
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={isLoggedIn==="true"?<HomePage/>:<LoginPage/>}></Route>
          <Route path="/" element={<LoginPage/>}></Route>
=======
          <Route path="/" element={isLoggedIn==="true"? <HomePage/> : <LoginPage/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
>>>>>>> ffe658eba891e264f957eed2f2d1fe9d6fe5135d
          <Route path="/signup" element={<SignupPage/>}></Route>
          <Route path="/home" element={<HomePage/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

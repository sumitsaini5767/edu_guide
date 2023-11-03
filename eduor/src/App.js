import './App.css'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>}></Route>
          <Route path="/signup" element={<SignupPage/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

import React from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <>
      <p className="spara mt-7">Already Have An Account ? <Link to="/signup" className="text-themecolor-600 cursor-pointer hover:text-black">Login</Link></p>
    </>
  )
}

export default LoginPage

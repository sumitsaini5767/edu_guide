import React from 'react'

const HomePage = () => {

    const logout=()=>{
      window.localStorage.clear();
      window.location.href="/login";
    }

  return (
    <>
        <h1 className='text-center head'>HOMEPAGE</h1>
        {/* <button className='btn' onClick={logout}>Logout</button> */}
    </>
  )
}

export default HomePage

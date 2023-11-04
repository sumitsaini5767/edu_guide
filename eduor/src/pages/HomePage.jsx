import React, { useEffect, useState } from 'react'

const HomePage = () => {

    const [details,setDetails] = useState("");


    useEffect(()=>{
        fetch("http://localhost:4000/home",{
              method:"POST",
              crossDomain:true,
              headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                token:window.localStorage.getItem("token"),
              }),
            })
            .then((res)=>res.json())
            .then((data)=>{
            setDetails(data.data);
            if(data.data==="token expire"){
              // alert("Token expired, please login again");
              logout();
            }  
          })
    },[details]);

    const logout=()=>{
      window.localStorage.clear();
      window.location.href="/login";
    }

  return (
    <>
        <h1 className='text-center head'>HOMEPAGE</h1>
        <p className='text-center subhead'>Name: {details.uname}</p>
        <p className='text-center subhead'>Email: {details.email}</p>
        <button className='btn' onClick={logout}>Logout</button>
    </>
  )
}

export default HomePage

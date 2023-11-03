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
            })
    },[]);


  return (
    <>
        <h1 className='text-center head'>HOMEPAGE</h1>
        <p className='text-center subhead'>{details.uname}</p>
        <p className='text-center subhead'>{details.email}</p>
        
    </>
  )
}

export default HomePage

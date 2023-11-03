import React, { useEffect, useState } from 'react'

const HomePage = () => {

    const [details,setDetails] = useState([]);

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
              console.log(data,"userData");
              
              setDetails((prev)=>[...prev,data]);
              console.log(details);
            })
    },[]);

  return (
    <>
        <h1 className='text-center head'>HOMEPAGE</h1>
        <p className='subhead'>Hii</p>
        
    </>
  )
}

export default HomePage

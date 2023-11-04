import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {FaFacebookF,FaLinkedinIn,FaTwitter,FaGoogle} from "react-icons/fa6";
import { Link } from "react-router-dom";

const LoginPage= () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  return (
    <div className="flex justify-center items-center w-full py-10">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!email) {
            errors.email = "*Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
          ) {
            errors.email = "*Invalid email address";
          }
          if (!password) {
            errors.password = "*Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // console.log("details", email,password);
            fetch("http://localhost:4000/",{
              method:"POST",
              crossDomain:true,
              headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                email,
                password
              }),
            })
            .then((res)=>res.json())
            .then((data)=>{
              console.log(data,"userLogin");
              if(data.status === "OK"){
                alert("Login successful!!");
                window.localStorage.setItem("token",data.data);
                window.location.href="/home";
              }
            })
            setSubmitting(false);
          }, 400); 
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col w-2/5  bg-bgcolor-600 rounded-md p-12">
            <p className="head">Welcome To Eduor!</p>
            <p className="para">Sign In To Continue</p>

            <label className="spara">Email</label>
            <Field
              type="email"
              name="email"
              placeholder="Enter email address"
              className="inputfield"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <ErrorMessage
              className="text-red-600 text-xs"
              name="email"
              component="div"
            />

            <label className="spara">Password</label>
            <Field
              type="password"
              name="password"
              placeholder="Enter password"
              className="inputfield"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <ErrorMessage
              className="text-red-600 text-xs"
              name="password"
              component="div"
            />

            <button className="btn mt-5 " type="submit" disabled={isSubmitting}>
              LOGIN
            </button>
            <div className="flex items-center mt-12">
                <p className=" z-10 text-white bg-themecolor-600 px-0.5 py-0.25 rounded-sm">OR</p>
                <div className=" w-full h-0.5 bg-themecolor-600"></div>
            </div>
            {/* <hr className="border-t-2 border-themecolor-600" /> */}
            
            <div className="mt-12 flex">
              <Link className="social-icons"><FaFacebookF/></Link>
              <Link className="social-icons"><FaLinkedinIn/></Link>
              <Link className="social-icons"><FaTwitter/></Link>
              <Link className="social-icons"><FaGoogle/></Link>
            </div>
            <p className="spara mt-7">Don't Have An Account ? <Link to="signup" className="text-themecolor-600 cursor-pointer hover:text-black">Create Account</Link></p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;

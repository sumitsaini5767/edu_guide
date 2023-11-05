import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaGoogle,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import app from "../firebase_config";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const SignupPage = () => {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [verifyButton, setVerifyButton] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);

  // const changeMobile = (e) => {
  //   setPhone(e.target.value);
  //   if(phone.length === 10){
  //     setVerifyButton(true);
  //   }
  //   else{
  //     setVerifyButton(false);
  //   }
  // }

  useEffect(()=>{
    if(phone.length === 10){
      setVerifyButton(true);
    }
    else{
      setVerifyButton(false);
    }
  },[phone]);

  const auth = getAuth(app);
  // const submit = () =>{
  //   console.log("details", name,phone,email,password);
  // }

  const onCaptchaVerify = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        onSignInSubmit();
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
      
    });
  }

  const onSignInSubmit = () => {
    onCaptchaVerify();
    const phoneNumber = "+91" + phone;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      alert("OTP sended!!");
      setVerifyOtp(true);
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
    });
  }

  const verifyCode = () => {
    window.confirmationResult.confirm(otp).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(user);
      alert("Verification Done!!");
      setVerifyOtp(false);
      // ...
    }).catch((error) => {
      alert("Invalid OTP");
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }

  return (
    <div className="flex justify-center items-center w-full py-10">
      <Formik
        initialValues={{
          name: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!name) {
            errors.name = "*Required";
          }

          if (isNaN(phone)) {
            errors.phone = "*Mobile number must be a number";
          } else if (phone.length !== 10) {
            errors.phone = "*Mobile number must be 10 digits";
          }
          

          if (!email) {
            errors.email = "*Required";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            errors.email = "*Invalid email address";
          }

          if (!password) {
            errors.password = "*Required";
          }

          if (password !== values.confirmPassword) {
            errors.confirmPassword = "*Passwords must match";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // console.log("details", name,phone,email,password);
            fetch("http://localhost:4000/signup", {
              method: "POST",
              crossDomain: true,
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                name,
                phone,
                email,
                password,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data,"userRegister");
                if (data.status === "OK") {
                  alert("Registeration successful!!");
                  window.location.href="/login";
                } 
                else {
                  console.log(data.status);
                }
              });
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col w-2/5  bg-bgcolor-600 rounded-md p-12">
            <p className="head">Welcome To Eduor!</p>
            <p className="para">Sign Up To Continue</p>
            <p id="recaptcha-container"></p>
            <label className="spara">Name</label>
            <Field
              type="text"
              name="name"
              placeholder="Enter your name"
              className="inputfield"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <ErrorMessage
              className="text-red-600 text-xs"
              name="name"
              component="div"
            />

            <label className="spara">Mobile Number</label>
            <Field
              type="text"
              name="phone"
              placeholder="Enter your mobile number"
              className="inputfield"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <ErrorMessage
              className="text-red-600 text-xs"
              name="phone"
              component="div"
            />
            {verifyButton ?
             <input type="button" onClick={onSignInSubmit} className="btn rounded-none" value="Verify Mobile Number"/>
             : null
            }
            
            {verifyOtp ? 
             <><label className="spara">OTP</label>
             <Field
               type="text"
               placeholder="Enter your OTP"
               className="inputfield"
               value={otp}
               onChange={(e) => setOtp(e.target.value)}
             />
             <ErrorMessage
               className="text-red-600 text-xs"
               name="phone"
               component="div"
             />
             <input type="button" onClick={verifyCode} className="btn rounded-none" value="Verify OTP"/>
             </>
             : null }
            

            <label className="spara">Email</label>
            <Field
              type="email"
              name="email"
              placeholder="Enter email address"
              className="inputfield"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <ErrorMessage
              className="text-red-600 text-xs"
              name="password"
              component="div"
            />

            <label className="spara">Confirm Password</label>
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Enter your password"
              className="inputfield"
            />
            <ErrorMessage
              className="text-red-600 text-xs"
              name="confirmPassword"
              component="div"
            />

            <button className="btn mt-5 " type="submit" disabled={isSubmitting}>
              SIGN UP
            </button>
            <div className="flex items-center mt-12">
              <p className=" z-10 text-white bg-themecolor-600 px-0.5 py-0.25 rounded-sm">
                OR
              </p>
              <div className=" w-full h-0.5 bg-themecolor-600"></div>
            </div>
            {/* <hr className="border-t-2 border-themecolor-600" /> */}

            <div className="mt-12 flex">
              <Link className="social-icons">
                <FaFacebookF />
              </Link>
              <Link className="social-icons">
                <FaLinkedinIn />
              </Link>
              <Link className="social-icons">
                <FaTwitter />
              </Link>
              <Link className="social-icons">
                <FaGoogle />
              </Link>
            </div>
            <p className="spara mt-7">
              Already Have An Account ?{" "}
              <Link
                to="/login"
                className="text-themecolor-600 cursor-pointer hover:text-black"
              >
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupPage;

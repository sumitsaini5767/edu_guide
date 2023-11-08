import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaGoogle,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const SignupPage = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  // const submit = () =>{
  //   console.log("details", name,email,password);
  // }

  return (
    <div className="flex justify-center items-center w-full py-10">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!name) {
            errors.name = "*Required";
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
            // console.log("details", name,password);
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
                email,
                password,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data, "userRegister");
                if (data.status === "OK") {
                  alert("Email sent successful!!");
                  setEmailSent(true);
                }
                else {
                  console.log(data.status);
                }
              });

          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col w-2/5  bg-bgcolor-600 rounded-md p-12">
            {emailSent ? <div className="flex flex-col items-center"><p className="text-center">Email has been sent to your email address<br />
              Please check your email for verification</p>
              <Link to="/" onClick={()=>window.open("https://mail.google.com/","_blank")} className="btn text-center w-fit my-5 px-10">Check Mail</Link>

            </div> :
              <>
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
                </p></>}

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupPage;
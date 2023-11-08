import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaGoogle,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  return (
    <div className="flex justify-center items-center w-full py-10">
      <Formik
        initialValues={{
          email: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!email) {
            errors.email = "*Required";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            errors.email = "*Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // console.log("details", email,password);
            fetch("http://localhost:4000/forgot-password", {
              method: "POST",
              crossDomain: true,
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                email,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data, "userRegister");
                if (data.status === "OK") {
                  alert("Email Sent");
                  setEmailSent(true);
                } else {
                  alert(data.status);
                }
              });
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col w-2/5  bg-bgcolor-600 rounded-md p-12">
            {emailSent ? (
              <p className="text-center">Email sent.<br/> Please check your Inbox.</p>
            ) : (
              <>
                <p className="head">Welcome To Eduor!</p>
                <p className="para">Forgot Password</p>

                <label className="spara">Email Address</label>
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

                <button
                  className="btn mt-5 "
                  type="submit"
                  disabled={isSubmitting}
                >
                  SUBMIT
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
                  Don't Have An Account ?{" "}
                  <Link
                    to="/signup"
                    className="text-themecolor-600 cursor-pointer hover:text-black"
                  >
                    Create Account
                  </Link>
                </p>
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;

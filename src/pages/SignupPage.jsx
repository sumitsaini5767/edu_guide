import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {FaFacebookF,FaLinkedinIn,FaTwitter,FaGoogle} from "react-icons/fa6";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="flex justify-center items-center w-full py-10">
      <Formik
        initialValues={{
          fullname: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.fullname) {
            errors.fullname = "*Required";
          }
          if (isNaN(values.phone)) {
            errors.phone = "*Mobile number must be a number";
          } else if (values.phone.length !== 10) {
            errors.phone = "*Mobile number must be 10 digits";
          }

          if (!values.email) {
            errors.email = "*Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "*Invalid email address";
          }
          if (!values.password) {
            errors.password = "*Required";
          }
          if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "*Passwords must match";
          }
          return errors;
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col w-2/5  bg-bgcolor-600 rounded-md p-12">
            <p className="head">Welcome To Eduor!</p>
            <p className="para">Sign Up To Continue</p>
            <label className="spara">Name</label>
            <Field
              type="text"
              name="fullname"
              placeholder="Enter your name"
              className="inputfield"
            />
            <ErrorMessage
              className="text-red-600 text-xs"
              name="fullname"
              component="div"
            />

            <label className="spara">Mobile Number</label>
            <Field
              type="text"
              name="phone"
              placeholder="Enter your mobile number"
              className="inputfield"
            />
            <ErrorMessage
              className="text-red-600 text-xs"
              name="phone"
              component="div"
            />

            <label className="spara">Email</label>
            <Field
              type="email"
              name="email"
              placeholder="Enter email address"
              className="inputfield"
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
                <p className=" z-10 text-white bg-themecolor-600 px-0.5 py-0.25 rounded-sm">OR</p>
                <div className=" w-full h-0.5 bg-themecolor-600"></div>
            </div>
            {/* <hr className="border-t-2 border-themecolor-600" /> */}
            
            <div className="mt-12 flex">
              <a className="social-icons"><FaFacebookF/></a>
              <a className="social-icons"><FaLinkedinIn/></a>
              <a className="social-icons"><FaTwitter/></a>
              <a className="social-icons"><FaGoogle/></a>
            </div>
            <p className="spara mt-7">Already Have An Account ? <Link to="/" className="text-themecolor-600 cursor-pointer hover:text-black">Login</Link></p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupPage;

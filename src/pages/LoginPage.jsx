import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {FaFacebookF,FaLinkedinIn,FaTwitter,FaGoogle} from "react-icons/fa6";
import { Link } from "react-router-dom";

const LoginPage= () => {
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
            <p className="para">Sign In To Continue</p>

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

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

const LoginPage = () => {
  return (
    <div className="flex justify-center h-screen w-full">
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
      >

        {({ isSubmitting }) => (
          <Form className='flex justify-center items-center flex-col h-screen rounded-md w-2/5 bg-bgColor-600'>
            <p className="head">Welcome To Eduor!</p>
            <p className="para">Sign Up To Continue</p>
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
            <p className="spara mt-7">Dont’t Have An Account ? <a className="text-themecolor-600 cursor-pointer hover:text-black">Create Account</a></p>
          </Form>
        )}

      </Formik>
    </div>
  )
}

export default LoginPage

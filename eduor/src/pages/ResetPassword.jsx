import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaGoogle,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  let link = window.location.href;
  let nlink=link.replace("localhost:3000","localhost:4000");
  console.log("new",nlink);
  return (
    <div className="flex justify-center items-center w-full py-10">
      <Formik
        initialValues={{
          newPassword: "",
          confirmPassword: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!newPassword) {
            errors.newPassword = "*Required";
          }
          if (newPassword !== values.confirmPassword) {
            errors.confirmPassword = "*Passwords must match";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // console.log("details", email,password);
            fetch(nlink, {
              method: "POST",
              crossDomain: true,
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                newPassword,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data, "userLogin");
                if(data.status==="OK"){
                    alert("Password updated successfully");
                    window.location.href="/";
                }
                else{
                    alert(data.data);
                    console.log(data);
                }
              });
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col w-2/5  bg-bgcolor-600 rounded-md p-12">
            <p className="head">Welcome To Eduor!</p>
            <p className="para">Reset Password</p>

            <label className="spara">Password</label>
            <Field
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              className="inputfield"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <ErrorMessage
              className="text-red-600 text-xs"
              name="newPassword"
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
              Not your Email Id ?{" "}
              <Link
                to="/forgot-password"
                className="text-themecolor-600 cursor-pointer hover:text-black"
              >
                Change Email Id
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;

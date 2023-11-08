import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";

const VerifyEmail = () => {

  const [verified,setVerified] = useState(false);

  let link = window.location.href;
  let nlink=link.replace("localhost:3000","localhost:4000");
  console.log("new",nlink);
  return (
    <div className="flex justify-center items-center w-full py-10">
      <Formik
        initialValues={{
          
        }}
        validate={(values) => {
          const errors = {};
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
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data, "userLogin");
                if(data.status==="OK"){
                    alert("verification successful");
                    setVerified(true);
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
          <Form className="flex flex-col w-2/5  bg-bgcolor-600 rounded-md p-12 items-center">
            {verified? <><p className="text-center">Your accounted has been created, please go to the login page</p>
            <Link to="/" className="btn my-5 px-10">Login here</Link></>:<><p className="text-center">Click on verify now and your account will be created</p>
            <button className="btn my-5 px-10" type="submit" disabled={isSubmitting}>Verify Now</button></>}
            
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VerifyEmail;

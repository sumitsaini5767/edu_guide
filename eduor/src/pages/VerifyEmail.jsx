import React from "react";
import { Formik, Form } from "formik";

const VerifyEmail = () => {


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
                if(data.status==="OK"){
                    alert("verification successful");
                    window.location.href='/';
                }
                else{
                  if(data.status.code === 11000){      
                      alert("Email already verified, Please login")
                      window.location.href='/';
                      console.log(data.status);  
                  }
                  else{
                    alert(data.data.message);
                  }
                }
              });
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col w-2/5  bg-bgcolor-600 rounded-md p-12 items-center">
          <p className="text-center">Click on verify now and your account will be created</p>
            <button className="btn my-5 px-10" type="submit" disabled={isSubmitting}>Verify Now & Login</button>
            
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VerifyEmail;

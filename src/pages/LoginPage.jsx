import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

const LoginPage = () => {
  return (
    <div className="flex justify-center h-screen w-full">
      <Formik
         initialValues={{ fullname: "", email: "", password: "" }}
         validate={(values) => {
           const errors = {};
           if (!values.fullname) {
             errors.fullname = "Required";
           }

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
             <h2></h2>
             <Field
               type="text"
               name="fullname"
               placeholder="Enter your fullname"
             />
             <ErrorMessage name="fullname" component="div" />

             <Field
               type="email"
               name="email"
               placeholder="Enter email address"
             />
             <ErrorMessage name="email" component="div" />

             <Field type="password" name="password" />
             <ErrorMessage name="password" component="div" />

             <button type="submit" disabled={isSubmitting}>
               Submit
             </button>
           </Form>
         )}

       </Formik>
    </div>
  )
}

export default LoginPage

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

const SignupPge = () => {
  return (
    <div className='flex justify-center items-center h-screen w-full'>
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
           <Form className="flex flex-col w-2/5 h-screen bg-bgcolor-600 rounded-md p-12">
             <p className='head'>Welcome To Eduor!</p>
             <p className='para'>Sign Up To Continue</p>
             <label className='spara'>Name</label>
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

             <Field type="password" name="password" placeholder="Enter password"/>
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

export default SignupPge

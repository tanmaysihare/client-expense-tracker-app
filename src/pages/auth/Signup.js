import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Signup() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const submitHandler = async (data) => {
    try {
      await axios.post("http://localhost:3001/user/signup", data);
      console.log("posted");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Email already exists");
      } else {
        alert(error.message);
      }
    } 
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(4).max(25),
    email: Yup.string().required().email(),
    password: Yup.string().required().min(6),
  });
  return (
    <div className="min-h-screen py-6 flex flex-col items-center justify-center sm:py-12">
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={validationSchema}
      >
      
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <Form className="text-white relative px-4 py-8 bg-indigo-400 shadow-lg sm:rounded-3xl sm:p-20">
              <div className="text-center pb-4">
                <h1 className="text-3xl uppercase">Signup Form</h1>
                <p className="text-gray-300">Please Enter Correct Detail</p>
              </div>
              <label>Full Name</label>

              <Field
                id="signupFormName"
                name="name"
                placeholder="Full Name"
                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="name"
                component="span"
                className="text-red-800 ml-4"
              />
              <label>Email Address</label>

              <Field
                type="email"
                id="signupFormEmail"
                name="email"
                placeholder="Correct Email"
                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="email"
                component="span"
                className="text-red-800 ml-4"
              />
              <label>Password</label>

              <Field
                type="password"
                id="signupFormPassword"
                name="password"
                placeholder="Password"
                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="password"
                component="span"
                className="text-red-800 ml-4"
              />
              <button
                type="submit"
              
                className="shadow bg-blue-800 hover:bg-white hover:text-blue-800 hover:font-extrabold py-2 px-4 rounded text-white font-bold focus:outline-none focus:shadow-outline"
              >
                SUBMIT
              </button>
              <a href="/login" className="ml-8 border-l pl-8">
                Click Hare to Login
              </a>
            </Form>
          </div>
       
      </Formik>
    </div>
  );
}

export default Signup;

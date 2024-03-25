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
  const submitHandler = (data) => {
    axios
      .post("", data)
      .then(() => {
        console.log("posted");
      })
      .catch((err) => console.log(err));
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(4).max(25),
    email: Yup.string().required(),
    password: Yup.string().required(),
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
            <ErrorMessage name="name" component="span" className="text-red-800 ml-4" />
            <Field
              id="signupForm"
              name="name"
              placeholder="Full Name"
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label>Email Address</label>
            <ErrorMessage name="email" component="span" className="text-red-800 ml-4" />
            <Field
              type="email"
              id="signupForm"
              name="email"
              placeholder="Correct Email"
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label>Password</label>
            <ErrorMessage name="password" component="span" className="text-red-800 ml-4" />
            <Field
              type="password"
              id="signupForm"
              name="password"
              placeholder="Password"
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />

            <button
              type="submit"
              className="shadow bg-blue-800 hover:bg-white hover:text-blue-800 hover:font-extrabold py-2 px-4 rounded text-white font-bold focus:outline-none focus:shadow-outline"
            >
              SUBMIT
            </button>
            <a href="/login" className="ml-8 border-l pl-8">  Already signup Click Hare to Login </a>
          </Form>
        </div>
      </Formik>
    </div>
  );
}

export default Signup;

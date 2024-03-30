import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "sonner";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function Signup() {
  const history = useHistory();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const submitHandler = async (data) => {
    try {
      await axios.post("http://localhost:3001/user/signup", data);
      console.log("posted");
      toast.success("Sign up successfully");
      history.push("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Email already exists");
      } else {
        toast.error(error.message);
      }
    }
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(4).max(25),
    email: Yup.string().required().email(),
    password: Yup.string().required().min(6),
  });
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={validationSchema}
      >
        <div className="field is-grouped is-grouped-centered mt-6 pt-6">
          <Form>
            <div className="field has-text-centered">
              <h1 className="has-text-success is-size-2 is-uppercase">
                SignUp
              </h1>
              <p className="is-size-6 ">Please Enter Correct Detail</p>
            </div>

            <div className="field">
              <label className="label">Full Name</label>
              <div className="control">
                <Field
                  id="signupFormName"
                  name="name"
                  placeholder="Full Name"
                  className="input"
                />
              </div>
              <ErrorMessage
                name="name"
                component="span"
                className="help is-danger"
              />
            </div>
            <div className="field">
              <label className="label">Email Address</label>
              <div className="control">
                <Field
                  type="email"
                  id="signupFormEmail"
                  name="email"
                  placeholder="Correct Email"
                  className="input"
                />
              </div>
              <ErrorMessage
                name="email"
                component="span"
                className="help is-danger"
              />
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <Field
                  type="password"
                  id="signupFormPassword"
                  name="password"
                  placeholder="Password"
                  className="input"
                />
              </div>
              <ErrorMessage
                name="password"
                component="span"
                className="help is-danger"
              />
            </div>
            <div className="field is-grouped">
              <button type="submit" className="button">
                SUBMIT
              </button>
              <label className="label">
                <a href="/login" className="label mt-2 ml-1">
                  Click Hare to Login
                </a>
              </label>
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  );
}

export default Signup;

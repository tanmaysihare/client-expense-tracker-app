import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "sonner";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import {useDispatch} from 'react-redux';
import { AuthActions } from "../../store/AuthSlice";
import { buyPremium } from "../../store/PremiumMember";

function Login() {
  const dispatch = useDispatch();
 const history = useHistory();
  const initialValues = {
    email: "",
    password: "",
  };
  const submitHandler = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/user/login",
        data
      );
      toast.success(response.data.message);
       history.push('/homepage'); 
       dispatch(AuthActions.login(response.data.authenticate));
       dispatch(buyPremium(response.data.isPremium));
       localStorage.setItem("token",response.data.authenticate);
       localStorage.setItem("isLoggedIn",response.data.success);
       localStorage.setItem("isPremium",response.data.isPremium);
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.error);
        
      } else {
        toast.err(error.response.data.message);
        
      }
      // console.error("Error:", error);
    }
  };

  const validationSchema = Yup.object().shape({
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
        <div className="box column is-half is-offset-one-quarter is-grouped is-grouped-centered mt-6 pt-6">
          <Form>
            <div className="field has-text-centered">
              <h1 className="has-text-success is-size-2 is-uppercase">
                Login Form
              </h1>
              <p className="is-size-6 ">Please Enter Correct Detail</p>
            </div>
            <div className="field">
              <label className="label">User Email</label>
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
            <div className=" grid " >
              <div className=" cell "> 
                <button type="submit" className="button is-success ml-4">
                SUBMIT
              </button>
              </div>
             <div className=" cell is-col-span-2 " > 
              <label className="label">
                <div className="grid pb-2" >
                  <div className="cell has-text-right" > <Link to="/forget_password" className="label mt-2">Forget Password</Link></div>
                  <div className="cell pl-2" style={{borderLeft:"1px solid white"}}><Link to="/signup" className="label mt-2 ">
                  New User - Signup Now
                </Link></div></div>
                
                
              </label>
              </div>
            
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  );
}

export default Login;

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "sonner";
import {useParams,useHistory} from "react-router-dom";

function ResetPassword() {
    const {uuid} = useParams();
    console.log(uuid)
    const history = useHistory();
    const initialValues = {
        password: "",
    };
    const submitHandler = async (data) => {
        try{
            const response = await axios.post("http://localhost:3001/password/new-password",data,{headers:{"uuid":uuid}});
            toast.success(response.data.message);
            history.push('/login');
        }catch(error){
            toast.error(error);
        }
    };
    const validationSchema = Yup.object().shape({
        password: Yup.string().required("Email is required").min(6),
    });
  return (
    <div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitHandler} >
            <div className='container is-grouped is-grouped-centered mt-6 pt-6'>
                <div className='box column is-half is-offset-one-quarter'>
                <Form>
                <div className="field has-text-centered">
              <h1 className="has-text-success is-size-2 is-uppercase">
                Reset Password
              </h1>
              <p className="is-size-6 ">Enter Your min 6 character new password</p>
            </div>

                    <div className='field p-4'>
                         <label className='label'>New-Password</label>
                    <div className='control'>
                        <Field type="password" className='input' name="password" placeholder="new-password" />
                    </div>
                        <ErrorMessage name="password" component="span" className='help is-danger'/>
                        
                    <button type="submit" className='button is-success mt-3'>Submit</button>
                    </div>
                   
                </Form>
                </div>
            </div>
      </Formik>
    </div>
  )
}

export default ResetPassword;

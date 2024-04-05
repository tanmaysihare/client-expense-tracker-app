import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "sonner";
//import { useSelector } from 'react-redux';
function ForgetPassword() {
    //const token = useSelector((state)=>state.Auth.token) || localStorage.getItem("token");
    const initialValues = {
        email: "",
    };
    const submitHandler = async (data) => {
        try{
            const response = await axios.post("http://localhost:3001/password/forget-password",data);
            toast.success(response.data.message);
        }catch(error){
            toast.error(error);
        }
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email is invalid"),
    });
  return (
    <div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitHandler} >
            <div className='container is-grouped is-grouped-centered mt-6 pt-6'>
                <div className='box column is-half is-offset-one-quarter'>
                <Form>
                    <div className='field has-text-centered'>
                         <label className='label mx-6'>Email Id</label>
                    <div className='control'>
                        <Field type="email" className='input' name="email" placeholder="Email" />
                    </div>
                        <ErrorMessage name="email" component="span" className='help is-danger'/>
                    <button type="submit" className='button is-success mt-3'>Submit</button>
                    </div>
                   
                </Form>
                </div>
            </div>
      </Formik>
    </div>
  )
}

export default ForgetPassword;

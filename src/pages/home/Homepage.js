import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "sonner";


function Homepage() {
    const [expenses, setExpenses] = useState([]);
    useEffect(()=> {
        axios.get("http://localhost:3001/expense").then((res)=>{
            setExpenses(res.data);
        }).catch(err=> toast.error(err))
    },[]);
  const initialValues = {
    money: "",
    description: "",
    category: "",
  };
  const submitHandler = async (data) => {
    try{
        const response = await axios.post("http://localhost:3001/expense",data);
        toast.success(response.data.message);
        axios.get("http://localhost:3001/expense").then((res)=>{
            setExpenses(res.data);
        }).catch(err=> toast.error(err))
    }catch(error){
        toast.error(error);
    }
    
  };
  const deleteHandler = async(id)=>{

    try{
        const response = await axios.delete(`http://localhost:3001/expense/${id}`);
        toast.warning("Expense Delete",response.status);
        axios.get("http://localhost:3001/expense").then((res)=>{
            setExpenses(res.data);
        }).catch(err=> toast.error(err))
    }catch(error){
        toast.error(error);
    }
  };
  const validationSchema = Yup.object().shape({
    money: Yup.number().required(),
    description: Yup.string().required().min(3),
    category: Yup.string().required(),
  });
  return (
    <div className="container is-fluid ">
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={validationSchema}
      >
        <div className="field is-grouped is-grouped-centered mt-6 pt-6">
          <Form>
            <div className="field has-text-centered">
              <h1 className="has-text-success is-size-1 is-uppercase">
                Expense Tracker
              </h1>
              <p className="is-size-6 ">Please Enter Correct Details</p>
            </div>
            <div className="field">
              <label className="label">Money Spent</label>
              <div className="control">
                <Field
                  id="expenseFormMoney"
                  name="money"
                  placeholder="Money Spent"
                  className="input"
                />
              </div>
              <ErrorMessage
                name="money"
                component="span"
                className="help is-danger"
              />
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <Field
                  id="expenseFormDescription"
                  name="description"
                  placeholder="Description"
                  className="input"
                />
              </div>
              <ErrorMessage
                name="description"
                component="span"
                className="help is-danger"
              />
            </div>
            <div className="field">
              <label className="label"></label>
              <div className="select is-rounded">
                <Field
                  id="expenseFormCategory"
                  as="select"
                  name="category"
                  placeholder="Select"
                  className=""
                >
                    <option value="" key="0">Select</option>
                  <option value="food" key="1">
                    Food
                  </option>
                  <option value="salary" key="2">
                    Salary
                  </option>
                  <option value="transportation" key="3">
                    Transportation
                  </option>
                </Field>
              </div>
              <ErrorMessage
                name="category"
                component="span"
                className="help is-danger"
              />
            </div>
            <button type="submit" className="button">
              SUBMIT
            </button>
          </Form>
        </div>
      </Formik>
    <div className="container is-fluid my-6 ">
        {expenses.map((value,key)=>{
            return(
                <div className=" grid ml-6 pl-6 box">
                    <div className="cell">
                        <label className="label">Money</label>
                        <div>{value.money}</div>
                    </div>
                    <div className="cell">
                        <label className="label">Description</label>
                       <div>{value.description}</div> 
                    </div>
                    <div className="cell">
                        <label className="label">Category</label>
                        <div>{value.category}</div>
                    </div>
                    <div className="cell is-col-from-end-1"> <button className="delete is-large mt-3" onClick={()=> deleteHandler(value.id)}></button></div>
                   
                </div>
            )
        })}
    </div>

     </div>
  );
}

export default Homepage;

import React,{useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "sonner";
import ExpenseList from "./ExpenseList";

function Homepage() {
  const [expenses, setExpenses] = useState([]);
  const initialValues = {
    money: "",
    description: "",
    category: "",
  };
  const submitHandler = async (data) => {
    try{
        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:3001/expense",data,{headers:{"access-token":token}});
    
        toast.success(response.data.message);
        axios.get("http://localhost:3001/expense",{headers:{"access-token":token}}).then((res)=>{
            setExpenses(res.data);
        }).catch(err=> toast.error(err))
    }catch(error){
      console.log(error);
        toast.error(error);
    }
   };
  const validationSchema = Yup.object().shape({
    money: Yup.number().required(),
    description: Yup.string().required().min(3),
    category: Yup.string().required(),
  });
  return (
    <div className="grid">
    <div className="container is-fluid cell">
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
     </div>
     <div className="cell container is-fluid mt-6 pt-4 px-1">
      <ExpenseList expenses={expenses} setExpenses={setExpenses}/>
     </div>
     </div>
  );
}

export default Homepage;

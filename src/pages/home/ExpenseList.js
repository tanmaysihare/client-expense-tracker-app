import React, { useEffect } from 'react'
import { toast } from "sonner";
import axios from "axios";

function ExpenseList(props) {
    
    useEffect(()=> {
        axios.get("http://localhost:3001/expense").then((res)=>{
            
           props.setExpenses(res.data);
        }).catch(err=> toast.error(err))
    },[]);

    const deleteHandler = async(id)=>{

        try{
            const response = await axios.delete(`http://localhost:3001/expense/${id}`);
            toast.warning("Expense Delete",response.status);
            axios.get("http://localhost:3001/expense").then((res)=>{
                props.setExpenses(res.data);
            }).catch(err=> toast.error(err))
        }catch(error){
            toast.error(error);
        }
      };
  return (
    <div >
       <div className="container is-fluid my-6 ">
        {props.expenses.map((value,key)=>{
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
  )
}

export default ExpenseList

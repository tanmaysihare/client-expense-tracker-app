import React, { useEffect } from 'react'
import { toast } from "sonner";
import axios from "axios";
import { useSelector } from 'react-redux';
function ExpenseList(props) {
    const token = useSelector((state)=>state.Auth.token) || localStorage.getItem("token");
    useEffect(()=> {
        const fetchExpenses = async()=>{
            props.setLoading(true);
            const res = await axios.get("http://localhost:3001/expense",{headers:{"access-token":token}});
            props.setExpenses(res.data);
            props.setLoading(false);
        }
        fetchExpenses();
    },[]);
 
    const deleteHandler = async(id)=>{

        try{
            const response = await axios.delete(`http://localhost:3001/expense/${id}`,{headers:{"access-token":token}});
            toast.warning("Expense Delete",response.status);
            axios.get("http://localhost:3001/expense",{headers:{"access-token":token}}).then((res)=>{
                props.setExpenses(res.data);
            }).catch(err=> toast.error(err))
        }catch(error){
            toast.error(error);
        }
      };
      if(props.loading) return <p>Loading...</p>
  return (
    <div className='container is-fluid is-mobile ' style={{padding:"50px"}}>
       <div className="container box is-fluid my-6 ">
        {props.expenses.map((value,key)=>{
            return(
                <div className=" grid box level is-fluid is-mobile" key={key}>
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

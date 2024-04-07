import React, { useEffect,useState } from "react";
import Axios  from "axios";
import { useSelector } from 'react-redux';
import { toast } from "sonner";
function DownloadPage() {
  const token = useSelector((state)=>state.Auth.token) || localStorage.getItem("token");
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/expense",{headers:{"access-token":token}}).then((res)=>{
      setExpenses(res.data);
    }).catch(err=> toast.error(err));
  },[token]);
  return (
    <div>
      <div className="container mt-6 mb-5 has-text-centered">
        <div className="box">
          <div className="title is-5">Monthly Expense</div>
          <div className="grid">
            <div className="cell">Date</div>
            <div className="cell">Description</div>
            <div className="cell">Category</div>
            <div className="cell">Expense</div>
          </div>
          {expenses.map((value, key) => {
            return (
              <div className="grid box" key={key}>
            <div className="cell">{value.createdAt}</div>
            <div className="cell">{value.description}</div>
            <div className="cell">{value.category}</div>
            <div className="cell">{value.money}</div>
          </div>
            )
          })}
          
        </div>
        <div className="box">
          <div className="title is-5">Yearly Expense</div>
          <div className="grid">
            <div className="cell">Month</div>
            <div className="cell">Expense</div>
          </div>
          {expenses.map((value, key) => {
            return (
              <div className="grid box" key={key}>
            <div className="cell">{value.createdAt}</div>
            <div className="cell">{value.money}</div>
          </div>
            )
          })}
         
        </div>

        <div>
          <button className="button is-success">Download</button>
        </div>
      </div>
    </div>
  );
}

export default DownloadPage;

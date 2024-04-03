import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from 'react-redux';
function LeaderBoard() {
  const [leaderBoardName, setLeaderBoardName] = useState([]);
  const [leaderBoardMoney, setLeaderBoardMoney] = useState([]);
  const token = useSelector((state)=>state.Auth.token) || localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:3001/leader_board",{headers:{"access-token":token}})
      .then((res) => {
        setLeaderBoardName(res.data.userData);
        setLeaderBoardMoney(res.data.expenses);
      })
      .catch((error) => {
        toast.error(error);
        console.log(error);
      });
  }, []);
  return (
    <div className="container is-fluid grid has-2-cols">
      <div className="cell has-text-centered">
      <h1>Premium Member Name</h1>
        {leaderBoardName.map((value, key) => {
          return (
            <div key={key} >
              <h1>{value.name}</h1>
            </div>
          );
        })}
      </div>
      <div className="cell has-text-left">
        <h1>Premium Member Expense</h1>
        {leaderBoardMoney.map((value, key) => {
          return (
            <div key={key}>
              <h1>{value.money}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LeaderBoard;

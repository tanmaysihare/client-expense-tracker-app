import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
//import PremiumMember from "../../store/PremiumMember";
function LeaderBoard() {
  const [leaderBoardName, setLeaderBoardName] = useState([]);
  const [isPremium2, setIsPremium2] = useState(false);
  const token =
    useSelector((state) => state.Auth.token) || localStorage.getItem("token");

  const PremiumUserHandler = () => {
    axios
    .get("http://localhost:3001/leader_board/premium", {
      headers: { "access-token": token },
    })
    .then((res) => {
      setLeaderBoardName(res.data);
      setIsPremium2(true);
    })
    .catch((error) => {
      toast.error(error);
      console.log(error);
    });
  }

  const allUserHandler = () => {
    axios
    .get("http://localhost:3001/leader_board/non-premium", {
      headers: { "access-token": token },
    })
    .then((res) => {
      setLeaderBoardName(res.data);
      setIsPremium2(false);
    })
    .catch((error) => {
      toast.error(error);
      console.log(error);
    });
  }

  return (
    <div className="container is-fluid">
      <div className="buttons mt-6">
        <button className="button is-info" onClick={PremiumUserHandler}>Premium User</button>
        <button className="button is-info" onClick={allUserHandler}>All User</button>
      </div>
      <div className="title is-1">{isPremium2 ? "Leader Board For Premium Members" : "Leader Board For All Members"}</div>
      <div>
        <div className="grid">
          <h1 className="cell title is-5">{isPremium2 ? "Premium Members Name" : "All Members Name"}</h1>
          <h1 className="cell title is-5">Total Expense</h1>
        </div>

        {leaderBoardName.map((value, key) => {
          return (
            <div key={key}>
              <div className="grid">
                <h1 className="cell">{value.userName}</h1>
                <h1 className="cell">{value.totalExpense}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LeaderBoard;

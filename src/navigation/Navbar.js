import React from "react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../store/AuthSlice";
import { Link } from "react-router-dom/cjs/react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const isLoggedIn =
    useSelector((state) => state.Auth.isAuthenticated) ||
    localStorage.getItem("isLoggedIn");
  const token =
    useSelector((state) => state.Auth.token) || localStorage.getItem("token");
  const isPremium = useSelector((state) => state.premium_membership.isPremium);
  const logoutHandler = () => {
    dispatch(AuthActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isPremium");
    toast.success("logged out Successfully");
  };
  const buyPremiumHandler = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/orders/premium_membership",
        {
          headers: { "access-token": token },
        }
      );

      const { key, amount, order_id, userName, userEmail } = response.data;

      const options = {
        key: key,
        amount: amount,
        currency: "INR",
        name: userName,
        order_id: order_id,
        callback_url: `http://localhost:3001/orders/update_transaction_status?access-token=${token}`,
        prefill: {
          name: userName,
          email: userEmail,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
     
      rzp1.open();
      toast.success("Payment Successful");
    } catch (error) {
      console.log("Error:", error);
      toast.error(error);
    }
  };

  return (
    <nav
      className="navbar has-background-danger-15"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-menu">
          <div className="title is-3 mt-2 pt-2">Expense Tracker</div>
          <div className="navbar-start">
            <div className="navbar-item ">
              {isLoggedIn && (
                <Link to="/homepage" className="navbar-link">
                  Home
                </Link>
              )}
              {isPremium && isLoggedIn && (
                <Link to="/leader_board" className="navbar-link">
                  Leader Board
                </Link>
              )}
              {isPremium && isLoggedIn && (
                <Link to="/download" className="navbar-link">
                  Report Download
                </Link>
              )}
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {!isLoggedIn && (
                  <Link to="/signup" className="button is-primary">
                    <strong>Sign up</strong>
                  </Link>
                )}
                {!isLoggedIn && (
                  <Link to="/login" className="button is-light">
                    <strong>Log in</strong>
                  </Link>
                )}
                {isLoggedIn && !isPremium && (
                  <button
                    onClick={buyPremiumHandler}
                    className="button is-light"
                  >
                    <strong>Buy Premium</strong>
                  </button>
                )}
                {isLoggedIn && (
                  <Link
                    to="/login"
                    className="button is-danger"
                    onClick={logoutHandler}
                  >
                    <strong>Log out</strong>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from '../store/AuthSlice';

function Navbar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state)=>state.Auth.isAuthenticated) || localStorage.getItem("isLoggedIn");
  const token = useSelector((state)=>state.Auth.token) || localStorage.getItem("token");
  const logoutHandler = ()=>{
    dispatch(AuthActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    toast.success("logged out Successfully");
  };
  const buyPremiumHandler = async () => {
    try {
        const response = await axios.get("http://localhost:3001/orders/premium_membership", {
            headers: { "access-token": token }
        });

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
                color: "#3399cc"
            }
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
    <nav className='navbar has-background-danger-15' role='navigation' aria-label='main navigation'>
        <div className='container'>
      <div className='navbar-menu'>
        <div className='navbar-start'>
          <div className='navbar-item'>
          {isLoggedIn && <a href="/homepage" className='navbar-link'>Home</a>} 
          </div>
        </div>
        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
             {! isLoggedIn && <a href="/signup" className='button is-primary'>
                <strong>Sign up</strong>
              </a>} 
              {! isLoggedIn && <a href="/login" className='button is-light'>
                <strong>Log in</strong>
              </a>} 
             {isLoggedIn && <a href="/login" className='button is-danger' onClick={logoutHandler}>
                <strong>Log out</strong>
              </a>} 
              {isLoggedIn && <button onClick={buyPremiumHandler} className='button is-light'>
                <strong>Buy Premium</strong>
              </button>}
            </div>
          </div>
        </div>
      </div>
      </div>
    </nav>
  );
}

export default Navbar; 

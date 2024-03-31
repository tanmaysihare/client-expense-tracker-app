import React from 'react';
import { toast } from 'sonner';


function Navbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const logoutHandler = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    toast.success("logged out Successfully");
  
  }
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
            </div>
          </div>
        </div>
      </div>
      </div>
    </nav>
  );
}

export default Navbar; 

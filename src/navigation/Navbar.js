import React from 'react';

function Navbar() {
  return (
    <nav className='navbar has-background-danger-15' role='navigation' aria-label='main navigation'>
        <div className='container'>
      <div className='navbar-menu'>
        <div className='navbar-start'>
          <div className='navbar-item'>
            <a href="/homepage" className='navbar-link'>Home</a>
          </div>
        </div>
        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              <a href="/signup" className='button is-primary'>
                <strong>Sign up</strong>
              </a>
              <a href="/login" className='button is-light'>
                <strong>Log in</strong>
              </a>
              <a href="/logout" className='button is-danger'>
                <strong>Log out</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </nav>
  );
}

export default Navbar; 

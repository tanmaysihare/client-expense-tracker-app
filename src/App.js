import React from 'react'
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import {Route,Switch} from 'react-router-dom'
import Navbar from './navigation/Navbar';
import {Toaster} from 'sonner';
import Homepage from './pages/home/Homepage';
import WelcomePage from './pages/home/WelcomePage';
import {useSelector} from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state)=>state.Auth.isAuthenticated) || localStorage.getItem("isLoggedIn");
  
  
  return (
    <div className="">
      <Navbar/>
      <Toaster richColors closeButton position='top-left' toastOptions={{style:{padding:'1rem',marginTop:'4rem'}}}/>
    <Switch>
      <Route path='/' exact><WelcomePage/></Route>
      <Route path='/signup'><Signup/></Route>
      <Route path='/login'><Login/></Route>
    {isLoggedIn && <Route path='/homepage'><Homepage/></Route>}  
    </Switch>
    </div>
  );
}

export default App;
 
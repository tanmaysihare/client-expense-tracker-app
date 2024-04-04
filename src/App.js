import React from 'react'
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import {Route,Switch} from 'react-router-dom'
import Navbar from './navigation/Navbar';
import {Toaster} from 'sonner';
import Homepage from './pages/home/Homepage';
import WelcomePage from './pages/home/WelcomePage';
import {useSelector} from 'react-redux';
import LeaderBoard from './pages/leaderBoard/LeaderBoard';

function App() {
  const isLoggedIn = useSelector((state)=>state.Auth.isAuthenticated) || localStorage.getItem("isLoggedIn");
  const isPremium = useSelector((state)=>state.premium_membership.isPremium) 
 
  return (
    <div className="">
      <Navbar/>
      <Toaster richColors closeButton position='top-right' toastOptions={{style:{padding:'1rem',marginTop:'4rem'}}}/>
    <Switch>
      <Route path='/' exact><WelcomePage/></Route>
      <Route path='/signup'><Signup/></Route>
      <Route path='/login'><Login/></Route>
    {isLoggedIn && <Route path='/homepage'><Homepage/></Route>}  
    {isPremium && <Route path='/leader_board'><LeaderBoard/></Route>}
    </Switch>
    </div>
  );
}

export default App;
 
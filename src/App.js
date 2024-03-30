import React from 'react'
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import {Route,Switch} from 'react-router-dom'
import Navbar from './navigation/Navbar';
import {Toaster} from 'sonner';
import Homepage from './pages/home/Homepage';


function App() {
  
  
  
  return (
    <div className="">
      <Navbar/>
      <Toaster richColors closeButton position='top-left' toastOptions={{style:{padding:'1rem',marginTop:'4rem'}}}/>
    <Switch>
      <Route path='/signup' exact><Signup/></Route>
      <Route path='/login'><Login/></Route>
      <Route path='/homepage'><Homepage/></Route>
    </Switch>
    </div>
  );
}

export default App;
 
import React from 'react'
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import {Route,Switch} from 'react-router-dom'

function App() {
  return (
    <div className="">
    <Switch>
      <Route path='/signup'><Signup/></Route>
      <Route path='/login'><Login/></Route>
    </Switch>
    </div>
  );
}

export default App;

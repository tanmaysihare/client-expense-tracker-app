import React from 'react'
import Signup from './pages/auth/Signup';
import {Route,Switch} from 'react-router-dom'

function App() {
  return (
    <div className="">
    <Switch>
      <Route path='/signup'><Signup/></Route>
    </Switch>
    </div>
  );
}

export default App;

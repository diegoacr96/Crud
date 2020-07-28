import React from 'react';
import {BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import './App.css';


import Login from './views/login';
import Admin from './views/Admin';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/"><Login /></Route>
        <Route exact={true} path="/admin"><Admin /></Route>
      </Switch>
    </Router>
  );
}

export default App;

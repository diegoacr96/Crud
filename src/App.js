import React from 'react';
import {BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import './App.css';

import Login from './views/login';
import Admin from './views/Admin';

const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyBk7D9UnQIg4hPH0JUsrVypoUeqf57kjXs",
    authDomain: "prueba-front-2a3bd.firebaseapp.com",
    databaseURL: "https://prueba-front-2a3bd.firebaseio.com",
    projectId: "prueba-front-2a3bd",
    storageBucket: "prueba-front-2a3bd.appspot.com",
    messagingSenderId: "657100764252",
    appId: "1:657100764252:web:88d5402b426464cd102299",
    measurementId: "G-6BDNQ7SF76"
  };
  
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();




function App() {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/"><Login db={db} firebase={firebase} /></Route>
        <Route exact={true} path="/admin"><Admin db={db} firebase={firebase} /></Route>
      </Switch>
    </Router>
  );
}

export default App;

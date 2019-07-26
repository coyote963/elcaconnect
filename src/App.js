import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Index from './components/Index' 
import Login from './components/Login'
import Register from './components/Register'
import './App.css';

function App() {
  return (
    <div>
      <nav className = "navbar navbar-light bg-light justify-content-between">           
        <span className="navbar-brand">ELCA Connect</span>
        <a href="/login/" className="btn btn-outline-success my-2">Log in</a>
      </nav>
      <Router>
        <Route path="/" exact component={Index} />
        <Route path="/login/" exact component={Login} />
        <Route path="/register/" exact component={Register} />
      </Router>
    </div>  
  );
}

export default App;

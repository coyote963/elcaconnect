import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Index from './components/Index' 
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Prayer from './components/Prayer/Prayer'
import Hymn from './components/Hymn/Hymn'
import Profile from './components/Profile'
import withAuth from './components/withAuth'
class App extends React.Component {
  
  render () {
    return (
      <div>
          <Router>
            <Route path="/" exact component={Index} />
            <Route path="/login/" exact component={Login} />
            <Route path="/register/" exact component={Register} />
            <Route path="/profile" component={withAuth(Profile)} />
            <Route path="/prayer" component={withAuth(Prayer)} />
            <Route path="/hymn" component={withAuth(Hymn)} />
          </Router>
      </div>
    );
  }
}

export default App;

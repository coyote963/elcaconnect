import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Index from './components/Index' 
import Login from './components/Login'
import Register from './components/Register'
import './App.css';
import Protected from './components/Profile'
import withAuth from './components/withAuth'
class App extends React.Component {
  
  render () {
    return (
      <div>
          <Router>
            <Route path="/" exact component={Index} />
            <Route path="/login/" exact component={Login} />
            <Route path="/register/" exact component={Register} />
            <Route path="/profile" component={withAuth(Protected)} />
          </Router>
      </div>
    );
  }
}

export default App;

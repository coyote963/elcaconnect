import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Index from './components/Index' 
import './App.css';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Index} />
    </Router>
      
  );
}

export default App;

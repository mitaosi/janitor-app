import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Panel from './Panel';

import { BrowserRouter as Router, Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Route exact path="/" component={Home}/>
          <Route exact path="/panel" component={Panel}/>
        </div>
      </Router>
    );
  }
}

export default App;

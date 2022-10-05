import React, { Component } from 'react';
import './App.css';
import Search from './components/search/search';
import Home from './components/home/home';

class App extends Component {
   
  render() { 
    return (
      <React.Fragment>
        <Home/>
      </React.Fragment>
    );
  }
}
 
export default App;

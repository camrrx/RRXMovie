import React, { Component } from 'react';
import NavBar from './components/navbar';
import './App.css';
import Search from './components/search';

class App extends Component {
   
  render() { 
    return (
      <React.Fragment>
        <NavBar />
        <Search />
      </React.Fragment>
    );
  }
}
 
export default App;

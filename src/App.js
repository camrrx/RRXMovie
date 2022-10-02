import React, { Component } from 'react';
import './App.css';
import Search from './components/search';
import Menu from './components/menu';

class App extends Component {
   
  render() { 
    return (
      <React.Fragment>
        <Menu/>
        <Search />
      </React.Fragment>
    );
  }
}
 
export default App;

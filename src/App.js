import React, { Component } from 'react';
import './App.css';
import Search from './components/search/search';
import Home from './components/home/home';
import {store} from './redux'
import { Provider } from 'react-redux'

class App extends Component {
   
  render() { 
    return (
      <React.StrictMode>
      <Provider store={store}>
        <Home/>
        <Search />
        
        </Provider>
        </React.StrictMode>
    );
  }
}
 
export default App;

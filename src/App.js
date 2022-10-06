import React, { Component } from 'react';
import './App.css';
import Search from './components/search/search';
import Home from './components/home/home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './redux';

class App extends Component {
   
  render() { 
    return (
      <React.Fragment>
        <Provider store={store}>
          <Router>
            <Routes>
            <Route exact path="/home" element={<Home />}></Route>
            <Route exact path="/search" element={<Search />}></Route>
            </Routes>
            
          </Router>
        </Provider>
        </React.Fragment>

      
    );
  }
}
 
export default App;

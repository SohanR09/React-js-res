import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Main from './Components/Main';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConfigureStore} from './Redux/configureStore';

const store = ConfigureStore();
class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
      
      
  );
  }
  
}

export default App;

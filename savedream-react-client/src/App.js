import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Layout/Header';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";


import "bootstrap/dist/css/bootstrap.min.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import Landing from './components/Layout/Landing';
import Register from './components/Members/Register';
import Login from './components/Members/Login';
import People from './components/Members/People';

library.add(faIgloo);
library.add(faPlusCircle);
// library.add(faPlusCircle);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />

            {
              // Public Routes
            }
            <Route exact path="/" component={Landing} />

            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            <Route exact path="/people" component={People} />

          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

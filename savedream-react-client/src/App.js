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

import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from './actions/types';
import { logout } from './actions/securityActions';
import SecureRoute from './securityUtils/SecureRoute';
import Profile from './components/Members/Profile';


// Set jwt token for every rquest
const jwtToken = localStorage.jwtToken;
if (jwtToken) {
  setJWTToken(jwtToken);

  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now()/1000;
  if (decoded_jwtToken.exp < currentTime) {
    
    // handle logout
    store.dispatch(logout());
    window.location.href = "/";
  }
}

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
            
            {
              // Private Routes
            }
            <Switch>
              <SecureRoute exact path="/people" component={People} />
              <SecureRoute exact path="/profile/:id" component={Profile} />
            </Switch>

          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

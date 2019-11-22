import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import MainNav from "./components/mainNav";
import Main from "./components/main";
import Footer from "./components/footer";

import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
// , logoutUser

if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode Token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and is authenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  // const currentTime = Date.now() / 1000;
  // if (decoded.exp < currentTime) {
  // logout user
  // store.dispatch(logoutUser());
  // clear current Profile
  // store.dispatch(clearCurrentProfile());
  // redirect to login
  // window.location.href = "/login";
  // }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <MainNav />
          <BrowserRouter>
            <div>
              <Main />
            </div>
          </BrowserRouter>
          <Footer />
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;

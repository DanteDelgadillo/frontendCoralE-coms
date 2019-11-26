import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import MainNav from "./components/mainNav";
import Main from "./components/main";
// import Footer from "./components/footer";

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
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: []
    };
  }


  // componentDidMount() {
  //   this.fetchData()
  // }
  componentDidMount = () => {
    if (localStorage.getItem("cart") != null) {
      this.setState({
        selectedItems: JSON.parse(localStorage.getItem("cart"))
      })
    }
  }

  render() {
    const addItem = item => {
      this.setState({
        selectedItems: [...this.state.selectedItems, item]
      }, () => {
        const dog = this.state.selectedItems;
        localStorage.setItem("cart", JSON.stringify(dog))
      }, [this.state.selectedItems]);

    };

    return (
      <Provider store={store}>
        <React.Fragment>
          <MainNav selected={this.state.selectedItems} />
          <BrowserRouter>
            <div>
              <Main add={item => addItem(item)} selected={this.state.selectedItems} />
            </div>
          </BrowserRouter>
          {/* <Footer /> */}
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;

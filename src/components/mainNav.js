import React from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

// ***********images***********
import ShoppingCart from "../images/icons8-shopping-cart-100.png";

class MainNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingCartList: []
    };
  }
  onLogOutClick(e) {
    e.preventDefault();

    this.props.logoutUser();
    window.location.href = "/";
  }

  onClick = e => {
    e.preventDefault();
  };

  componentDidMount() {
    if (this.state.shoppingCartList == null) {
      this.setState({
        shoppingCartList: "0"
      });
    } else {
    }
  }

  // ******props update change state********
  componentDidUpdate = prevProps => {
    if (prevProps.selected !== this.props.selected) {
      this.setState({
        shoppingCartList: this.props.selected
      });
    }
  };

  //function to called from default class (with args)
  functionWithArg = oneCoral => {
    console.log(oneCoral);
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <a
        href="/"
        className="btn btn-secondary loginandlogoff"
        role="button"
        onClick={this.onLogOutClick.bind(this)}
      >
        LogOut
      </a>
    );
    const authLinks2 = (
      <a href="/Stock" className="btn btn-info loginandlogoff" role="button">
        DashBoard
      </a>
    );

    const guestLinks = (
      <a
        href="/login"
        className="btn btn-primary btn-lg loginandlogoff"
        role="button"
        aria-pressed="true"
      >
        LogIn
      </a>
    );

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <a className="navbar-brand" href="/">
            Home
          </a>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/coralStock">
                  Live Stock
                </a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <a
                className="btn btn-warning my-2 my-sm-0"
                href="/ShoppingCart"
              >
                <img className="shoppingCartImage" src={ShoppingCart} alt="" />
                {this.state.shoppingCartList.length}
              </a>

              {isAuthenticated ? authLinks : guestLinks}
              {isAuthenticated ? authLinks2 : ""}
            </form>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

MainNav.vprototype = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(MainNav);

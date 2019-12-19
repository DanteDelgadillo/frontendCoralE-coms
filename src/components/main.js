import React from "react";
import { Switch, Route } from "react-router-dom";

// ***********************import pages*************************

import Login from "../containers/login";
import LandingPage from "../containers/landingpage";
import StockPage from "../containers/stockpage";
import CoralStock from "../containers/coralStock";
import CoralInfoPage from "../containers/coralPage";
import ShoppingCart from "../components/shoppingCart"

const Main = ({ add, selected, remove }) => (
  <React.Fragment>
    <Switch>
      <Route exact path="/" component={LandingPage} />
    </Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/CoralInfoPage" component={CoralInfoPage} add={add} />
    <Route exact path="/stock" component={StockPage} />
    <Route
      exact
      path="/coralStock"
      render={props => <CoralStock {...props} add={add} />}
    />
    <Route
      exact path="/ShoppingCart"
      render={props => <ShoppingCart {...props} selected={selected} remove={remove} />}
    />


  </React.Fragment>
);

export default Main;

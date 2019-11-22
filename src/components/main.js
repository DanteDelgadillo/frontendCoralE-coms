import React from "react";
import { Switch, Route } from "react-router-dom";

// ***********************import pages*************************

import Login from "../containers/login";
import LandingPage from "../containers/landingpage";
import StockPage from "../containers/stockpage";
import test from "../containers/test";
import CoralStock from "../containers/coralStock";
import CoralInfoPage from "../containers/coralPage"

const Main = () => (
  <React.Fragment>
    {/* ****************landing page****************** */}
    <Switch>
      <Route exact path="/" component={LandingPage} />
    </Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/CoralInfoPage" component={CoralInfoPage} />
    <Route exact path="/stock" component={StockPage} />
    <Route exact path="/test" component={test} />
    <Route exact path="/coralStock" component={CoralStock} />
  </React.Fragment>
);

export default Main;

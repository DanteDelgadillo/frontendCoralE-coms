import React, { Component } from "react";
import Zoa from "../images/zoaGarden.jpg";
import Mushroom from "../images/mushrooms.jpg";
import Sps from "../images/spc.jpg";
import Lps from "../images/lps.jpg";
import Monti from "../images/monti.jpg";
import { Link } from "react-router-dom";

class LandingPage extends Component {
  render() {
    const Zoanthids = {
      pathname: "coralStock",
      param1: "Zoanthids"
    }
    const Mushrooms = {
      pathname: "coralStock",
      param1: "Mushrooms"
    }
    const SPS = {
      pathname: "coralStock",
      param1: "SPS"
    }
    const LPS = {
      pathname: "coralStock",
      param1: "LPS"
    }
    const WYSIWYG = {
      pathname: "coralStock",
      param1: "WYSIWYG"
    }
    return (
      <React.Fragment>
        <div className="backGround">
          <div className="centertext">Coral Selling site</div>
        </div>
        <div className="Cate">Categories :</div>

        <div className="flex-container">

          <div className="box">
            <Link to={Zoanthids}>
              <img className="flexImg" src={Zoa} alt="zoa" />
              <h4 className="categorieName">Zoanthids</h4>
            </Link>
          </div>
          <div className="box">
            <Link to={Mushrooms}>
              <img className="flexImg" src={Mushroom} alt="mushroom" />
              <h4 className="categorieName">Mushrooms</h4>
            </Link>
          </div>
          <div className="box">
            <Link to={SPS}>
              <img className="flexImg" src={Sps} alt="sps" />
              <h4 className="categorieName">SPS</h4>
            </Link>
          </div>
          <div className="box">
            <Link to={LPS}>
              <img className="flexImg" src={Lps} alt="lps" />
              <h4 className="categorieName">LPS</h4>
            </Link>
          </div>
          <div className="box">
            <Link to={WYSIWYG}>
              <img className="flexImg" src={Monti} alt="WYSIWYG" />
              <h4 className="categorieName">WYSIWYG</h4>
            </Link>
          </div>

        </div>
      </React.Fragment>
    );
  }
}

export default LandingPage;

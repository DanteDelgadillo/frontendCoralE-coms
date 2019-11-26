import React, { Component } from "react";

class CoralPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coralData: ""
        };
    }

    componentDidMount() {
        if (this.props.location.param2 == null) {

        } else {
            this.setState({
                coralData: this.props.location.param2
            })
        }
    }

    render() {
        return (

            <React.Fragment>
                <div className="flex-container3 ">
                    <div className="coralPageBox">
                        <img className="coralPageImage" src={this.state.coralData.imageURL} alt="coralforsale" ></img>
                    </div>
                    <div className="coralPageBox2">
                        <div className="coralPageInfoBox">
                            <h4>Name:</h4>
                            <p>{this.state.coralData.coralname}</p>
                            <h4>Description:</h4>
                            <p> {this.state.coralData.descrption}</p>
                            <h4>Type:</h4>
                            <p> {this.state.coralData.categories}</p>
                            <h5>${this.state.coralData.price}</h5>
                            <br />
                            <button type="button" className="btn btn-primary" >Add To Cart</button>
                        </div>
                    </div>
                </div>
                <br></br>

            </React.Fragment >
        )
    }


}

export default CoralPage
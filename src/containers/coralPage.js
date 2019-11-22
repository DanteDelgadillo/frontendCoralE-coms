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
        { console.log(this.props.location.param2) }
        return (

            <React.Fragment>
                <div className="flex-container3 ">
                    <div className="coralPageBox">
                        <img className="coralPageImage" src={this.state.coralData.imageURL} ></img>
                    </div>
                    <div className="coralPageBox2">
                        <h4>{this.state.coralData.coralname}</h4>
                        <center>
                            <h5>${this.state.coralData.price}</h5>
                        </center>

                        <button type="button" className="btn btn-primary" >Add To Cart</button>
                    </div>
                </div>
                <br></br>
                <div className="descriptionBox">
                    <div className="descriptionTitle">
                        <h4>Description:</h4>
                    </div>
                    <div className="description">
                        <p> <h6>{this.state.coralData.descrption}</h6></p>
                    </div>
                </div>
            </React.Fragment>
        )
    }


}

export default CoralPage
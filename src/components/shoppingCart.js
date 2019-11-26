import React, { Component } from "react";



export default class ShoppingCart extends Component {
    constructor(props) {
        super(props)
        this.state = {

        };
    }

    render() {

        var sum = this.props.selected.reduce((a, { price }) => a + parseInt(price), 0);

        const taxs = sum * 0.075

        return (
            <React.Fragment>
                <div className="shoppingCartBox table-responsive">
                    <table className="table">
                        <thead>
                            <tr>

                                <th ><h4>Coral</h4></th>
                                <th><h4>Price</h4></th>
                            </tr>
                        </thead>

                        {this.props.selected.map((shopCoral, i) => {
                            return (

                                <tbody key={i}>
                                    <tr>
                                        <td><h6>{shopCoral.coralname}</h6></td>
                                        <td><h6>${shopCoral.price}</h6></td>
                                        <td><button type="button" className="btn btn-danger">Delete</button></td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>


                    <div className="shoppingCartBox2">
                        <div>
                            <h2>Taxes = ${taxs}</h2>
                            <h2>Shipping over night = $60</h2>
                            <h2>Total= ${sum + 60 + taxs}</h2>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
import React, { Component } from 'react'
import axios from "axios"
import Pagination from "../components/pagination";
import { Link } from "react-router-dom";
import MainNav from "../components/mainNav";




const Stock = props => (
    <div className="box2">
        <img className="imageSize " src={props.oneCoral.imageURL} alt="coral" />
        <center>
            <h4>{props.oneCoral.coralname}</h4>
            <h4>${props.oneCoral.price}</h4>
        </center>
        <center>
            <Link to={{
                pathname: "CoralInfoPage",
                param2: props.oneCoral
            }}  >
                <button type="button" className="btn btn-success" >More Info</button>
            </Link>
            <button type="button" className="btn btn-primary" onClick={() => props.copyBasket(props.oneCoral)}>Add To Cart</button>
        </center>
    </div>
)

export default class coralStock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allStock: [],
            searchCoral: "",
            currentPage: 1,
            postPerPage: 4,
            copyToBasket: [],
        }


    }



    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            currentPage: 1
        })

    }

    componentDidMount() {
        axios.get("http://localhost:3001/getAllStock")
            .then(response => {
                this.setState({
                    allStock: response.data
                }, () => {

                })
            })
            .catch(function (error) {
                console.log(error)
            })

        if (this.props.location.param1 == null) {

        } else {
            this.setState({
                searchCoral: this.props.location.param1
            })
        }



    }

    copyBasket = oneCoral => {
        //Calling a function of other class (with argument)
        // new MainNav().functionWithArg(oneCoral);
    };


    render() {


        console.log("props", this.props.location.param1)
        // filter array
        const newarray = this.state.allStock.filter((stock) => {
            return stock.coralname.toLowerCase().includes(this.state.searchCoral.toLowerCase()) + stock.categories.toLowerCase().includes(this.state.searchCoral.toLowerCase())


        })


        // // get current post paginate
        const indexOfLastPost = this.state.currentPage * this.state.postPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postPerPage;
        const currentPost = newarray.slice(indexOfFirstPost, indexOfLastPost);



        // change page
        const paginate = (pageNumer) => this.setState({
            currentPage: pageNumer
        })




        return (
            <React.Fragment>

                <div>
                    <form
                        className="coralSearchBar">
                        <label><h5>Search:</h5></label>
                        <input
                            className="form-control"
                            name="searchCoral"
                            type="text"
                            value={this.state.searchCoral}
                            onChange={this.onChange}
                        />
                    </form>
                </div>
                <div className="flexbox">

                    {currentPost.map((currentCoral, i) => {
                        return <Stock oneCoral={currentCoral} copyBasket={this.copyBasket.bind(this)} key={i} />

                    })}


                </div>

                <Pagination postPerPage={this.state.postPerPage} totalPost={this.state.allStock.length} paginate={paginate} />

            </React.Fragment>
        )
    }
}

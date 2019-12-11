import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import Missingimg from "../images/icons8-picture-480.png";
import axios from "axios";
import circle from "../images/25.png"

import Select from "react-select";

const Stock = props => (
  <tr>

    <td>{props.oneCoral.coralname}</td>
    <td>{props.oneCoral.categories}</td>
    <td>${props.oneCoral.price}</td>
    <td><button type="button" onClick={() => props.deleteOneStock(props.oneCoral._id)} className="btn btn-danger " > Delete </button ></td>
  </tr>
)

class PostCoral extends Component {
  constructor() {
    super();
    this.state = {
      coralname: "",
      categories: "",
      price: "",
      descrption: "",
      file: "",
      imagePreviewUrl: Missingimg,
      coralStock: [],
      newCoral: [],
      spinnerImage: false,
      coralnameError: "",
      categoriesError: "",
      priceError: "",
      imageError: "",
      descriptionError: ""

    };
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChangeIcon = this.onChangeIcon.bind(this);
    this.onSubmit = this.onSubmit.bind(this)

  }

  // ****************get all stock + Authentication **********************
  componentDidMount() {
    if (this.props.auth.isAuthenticated === false) {
      window.location.href = "/";
    }

    axios.get("http://localhost:3001/getAllStock")
      .then(response => {
        this.setState({ coralStock: response.data })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  onFormSubmit(e) {
    e.preventDefault()
    this.onSubmit(this.state.file)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeIcon = categories => {
    this.setState({ categories });
  };

  handleChange(event) {
    this.setState({ descrption: event.target.value });
  }


  // *******************Submit**********
  onSubmit(file) {
    const isValid = this.validate();

    if (isValid) {

      this.setState({
        spinnerImage: true
      })

      const coralname = this.state.coralname;
      const categories = this.state.categories;
      const price = this.state.price;
      const descrption = this.state.descrption;
      // const  imageURL= this.state.file;

      const url = "http://localhost:3001/postStock"
      const formData = new FormData();
      formData.append("file", file);
      formData.append("coralname", coralname);
      formData.append("categories", categories.value);
      formData.append("price", price);
      formData.append("descrption", descrption);

      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        },
      }

      return axios.post(url, formData, config)
        .then(response => {
          this.setState({
            newCoral: response.data
          }, () => {
            const newArray = this.state.coralStock;
            const PushArray = newArray.push(this.state.newCoral);
            console.log(PushArray)
            this.setState({
              coralStock: newArray,
              coralname: "",
              categories: "",
              price: "",
              descrption: "",
              imagePreviewUrl: Missingimg,
              file: "",
              spinnerImage: false
            })

          })
        })

    }
  }



  // ***********image*************
  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];



    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);

  }

  // *************DELETE*****************

  deleteOneStock(stockid) {
    const newStock = this.state.coralStock.filter(stock => stock._id !== stockid)

    this.setState({
      coralStock: newStock
    })

    axios.delete("http://localhost:3001/deleteStock/" + stockid)
      .then(res => console.log(res.data))
      .catch(function (error) {
        console.log(error);
      })

  }

  // *********************map stock**************
  coralStockList = () => {
    return this.state.coralStock.map((currentCoral, i) => {
      return <Stock oneCoral={currentCoral} deleteOneStock={this.deleteOneStock.bind(this)} key={i} />
    })
  }

  // *********
  onUploadProgress = (progressEvent) => {
    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
    this.setState({
      upLoadPercentage: percentCompleted
    })
  }


  // ********************** validate***********************


  validate = (file) => {
    let coralnameError = "";
    let categoriesError = "";
    let priceError = "";
    let imageError = "";
    let descriptionError = "";


    if (!this.state.coralname) {
      coralnameError = "Field is Empty";
    }

    if (!this.state.categories) {
      categoriesError = "Field is Empty";
    }

    if (!this.state.price) {
      priceError = "Field is Empty";
    }
    if (!this.state.file) {
      imageError = "Field is Empty";
    }
    if (!this.state.descrption) {
      descriptionError = "Field is Empty";
    }

    if (coralnameError || categoriesError || priceError || imageError || descriptionError) {
      this.setState({ coralnameError, categoriesError, priceError, imageError, descriptionError });
      return false;
    }
    return true;
  };

  render() {
    return (
      <React.Fragment>
        <div>


        </div>


        {/* **********flex***** */}
        <div className="flex-container2">
          <div className="postcoral">
            <form onSubmit={this.onFormSubmit}>
              <label>Coral Name:</label>
              <input
                className="form-control"
                name="coralname"
                type="text"
                value={this.state.coralname}
                onChange={this.onChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.coralnameError}
              </div>
              <label>Categories:</label>
              <Select
                placeholder=""
                multi={false}
                simpleValue={true}
                name="categories"
                id="categories"
                value={this.state.categories}
                onChange={this.onChangeIcon}
                options={[
                  {
                    value: "Zoanthids",
                    label: <React.Fragment>Zoanthids</React.Fragment>
                  },
                  {
                    value: "Mushrooms",
                    label: <React.Fragment>Mushrooms</React.Fragment>
                  },
                  {
                    value: "SPS",
                    label: <React.Fragment>SPS</React.Fragment>
                  },
                  {
                    value: "LPS",
                    label: <React.Fragment>LPS</React.Fragment>
                  },
                  {
                    value: "WYSIWYG",
                    label: <React.Fragment>WYSIWYG</React.Fragment>
                  }
                ]}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.categoriesError}
              </div>
              <label>Price:</label>
              <input
                className="form-control"
                name="price"
                type="number"
                value={this.state.price}
                onChange={this.onChange}
              />
              <div>
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.priceError}
                </div>
                <div className="form-group  ">
                  <label>Image:</label>
                  <input
                    className="form-control-file"
                    type="file"
                    name="file"
                    onChange={e => this._handleImageChange(e)}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.imageError}
                  </div>
                  <img
                    src={this.state.imagePreviewUrl}
                    alt="missing"
                    className="imagepost"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="dec"
                  type="textarea"
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={this.state.descrption}
                  onChange={this.handleChange}
                />
              </div>
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.descriptionError}
              </div>
              <button type="submit" className="btn  btn-block submit btn-primary">
                <img src={this.state.spinnerImage ? circle : ""} alt="" className="spinner" />
                Submit
              </button>

            </form>
          </div>
          {/* *****************Table********* */}
          <div className="postcoral table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th >Coral</th>
                  <th>Categorie</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {this.coralStockList()}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

PostCoral.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(PostCoral);

import React, { Component } from 'react'

import { withAuth } from "../../context/authContext";

import apiClient from "../../services/apiClient";

const STATUS = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};

class AddSneaker extends Component {

  state = {
    userId: '',
    name: '',
    image: '',
    brand: '',
    info: '',
    brands: [],
    status: STATUS.LOADING,
  };
  componentDidMount = () => {
    let userID = '';
    if (this.props.user !== null){
      if(this.props.user.data !== undefined){
          userID = this.props.user.data._id
        
      }else{
        userID = this.props.user._id
        this.setState({
          userLoggedIn: userID
        })
      }
  }
    this.setState({
      userId: userID
    })
    apiClient
    .brands()
    .then((response) =>{
      this.setState({
        brands: response.data,
        status: STATUS.LOADED,
      })
      
    })
    .catch((error) => {
      this.setState({
        error: error.name,
        status: STATUS.ERROR,
      })
    })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const {
      name,
      image,
      brand,
      info,
      userId,
    } = this.state;

    apiClient
    .addSneaker({
      name,
      image,
      brand,
      info,
      userId
    })
    .then((res) =>{
    history.push("/sneakers")
    })
    .catch((err) =>{
      console.log(err)
    });
  };
  optionBrands = () => {
    const {brands} = this.state;
    console.log(brands)
    return brands.map((brand, index) => {
      
      return <option value={brand._id} key={index}>{brand.name}</option>
    })
  }
  render(){
    return(
      <div>
      <h1>Add Sneakers</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Model Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Air Jordan 1"
            onChange={this.handleChange}
          />
          <label htmlFor="brand">Choose Brand</label>
          <select
            id="brand" 
            name="brand"
            required
            onChange={this.handleChange}
          >
          {this.optionBrands()}         
          </select>
          <label htmlFor="image">Link the model images</label>
          <input
            type="text"
            name="image"
            id="image"
            placeholder="Link here the image"
            onChange={this.handleChange}
          />
          <label htmlFor="info">Info</label>
          <input
            type="text"
            name="info"
            id="info"
            placeholder="Add extra info if you want"
            onChange={this.handleChange}
          />
          <br/>
          <input
            type='submit'
            value='publish'
          />
        </form>
      </div>
    )
  }
}
export default withAuth(AddSneaker);


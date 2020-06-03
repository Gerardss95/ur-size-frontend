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
  
    return brands.map((brand, index) => {
      
      return <option value={brand._id} key={index}>{brand.name}</option>
    })
  }
  render(){
    return(
      <div className="pt-20 w-screen text-center bg-gray-900 text-red-200 h-screen">
      <div className="w-5/6 my-8 bg-red-200 shadow-md rounded px-8 pt-6 pb-8 my-0 mx-auto text-black">
      <h1 className="text-2xl font-bold text-center text-gray-900 my-8">Add a new Sneaker</h1>
        <form className="flex flex-col text-center" onSubmit={this.handleSubmit}>
          <label className="block text-gray-900 font-bold mb-2 text-center w-4/5 my-0 mx-auto" htmlFor="name">Model Name</label>
          <input
           className="appearance-none border my-0 mx-auto w-4/5 py-2 px-3 bg-gray-900 text-red-200 rounded"
            type="text"
            name="name"
            id="name"
            placeholder="Air Jordan 1"
            onChange={this.handleChange}
          />
          <label  className="block text-gray-900 font-bold mb-2 text-center w-4/5 my-0 mx-auto"  htmlFor="brand">Choose Brand</label>
          <select
           className="appearance-none border my-0 mx-auto w-4/5 py-2 px-3 bg-gray-900 text-red-200 rounded"
            id="brand" 
            name="brand"
            required
            onChange={this.handleChange}
          >
          {this.optionBrands()}         
          </select>
          <label  className="block text-gray-900 font-bold mb-2 text-center w-4/5 my-0 mx-auto"  htmlFor="image">Link the image</label>
          <input
           className="appearance-none border my-0 mx-auto w-4/5 py-2 px-3 bg-gray-900 text-red-200 rounded"
            type="text"
            name="image"
            id="image"
            placeholder="Paste here a link"
            onChange={this.handleChange}
          />
          <br/>
          <div className="mx-auto w-4/5 my-8">
          <input
          className="bg-gray-900 text-red-200 font-bold py-2 px-8 rounded"
            type='submit'
            value='Publish'
          />
          </div>
        </form>
      </div>
      </div>
    )
  }
}
export default withAuth(AddSneaker);


import React, { Component } from 'react';

import { withAuth } from "../../context/authContext";

import apiClient from '../../services/apiClient';

const STATUS = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};

class UpdateSneaker extends Component {
state = {
  sneaker: null,
  error: undefined,
  status: STATUS.LOADING,
  userLoggedIn: '',
  owner: undefined,
  brands: [],
}
componentDidMount = () => {
  const sneakerId = this.props.match.params._id;
  if (this.props.user !== null){
    this.setState({
      userLoggedIn: this.props.user.data._id
    })
  }
 
  apiClient
  .oneSneaker(sneakerId)
  .then((res) => {
    this.setState({
      sneaker: res.data,
      status: STATUS.LOADED
    })
  })
  .then(() => {
    const { history } = this.props;
    const {sneaker, userLoggedIn } = this.state;
    if(sneaker.userId === userLoggedIn) {
      this.setState({
        owner: true
      })
    }else{
      history.push("/sneakers")
    }
  })
  .catch((error) => {
    this.setState({
      error: error.name,
      status: STATUS.ERROR,
    })
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
    const { sneaker } = { ...this.state };
    const actualSneaker = sneaker;
    const { name, value } = e.target;
    actualSneaker[name] = value;
    this.setState({
      sneaker: actualSneaker
    });
  };

  handleDelete = (id) => {
    const { history } = this.props;
   
    apiClient
      .deleteSneaker(id)
      .then(() => {
        history.push("/sneakers");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const sneakerId = this.props.match.params._id;
    const { sneaker } = this.state;
    const { history } = this.props;
    apiClient
    .updateSneaker(sneakerId, sneaker)
    .then((res) =>{
      history.push(`/sneakers/${sneakerId}`)
      
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
  

  render() {
    const { sneaker, status, error, owner } = this.state;
    
    const sneakerId = this.props.match.params._id;
        // eslint-disable-next-line default-case
        switch (status) {
      case STATUS.LOADING:
        return <div>Loading...</div>
      case STATUS.LOADED:
        return <div>
                { owner &&
                  <div className="pt-20 w-screen text-center bg-gray-900 text-red-200 h-screen">
                    <div className="w-5/6 my-8 bg-red-200 shadow-md rounded px-8 pt-6 pb-8 my-0 mx-auto text-black">
                      <form className="flex flex-col text-center" onSubmit={this.handleSubmit}>
                      <label className="block text-gray-900 font-bold mb-2 text-center w-4/5 my-0 mx-auto" htmlFor="name">Model Name</label>
                      <input
                       className="appearance-none border my-0 mx-auto w-4/5 py-2 px-3 bg-gray-900 text-red-200 rounded"
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={sneaker.name}
                        onChange={this.handleChange}
                      />
                      <label className="block text-gray-900 font-bold mb-2 text-center w-4/5 my-0 mx-auto"  htmlFor="brand">Choose Brand</label>
                      <select
                       className="appearance-none border my-0 mx-auto w-4/5 py-2 px-3 bg-gray-900 text-red-200 rounded"
                        id="brand" 
                        name="brand"
                        defaultValue={sneaker.brand}
                        onChange={this.handleChange}
                      >
                      {this.optionBrands()}         
                      </select>
                      <label className="block text-gray-900 font-bold mb-2 text-center w-4/5 my-0 mx-auto"  htmlFor="image">Link the model images</label>
                      <input
                       className="appearance-none border my-0 mx-auto w-4/5 py-2 px-3 bg-gray-900 text-red-200 rounded"
                        type="text"
                        name="image"
                        id="image"
                        defaultValue={sneaker.image}
                        onChange={this.handleChange}
                      />
                      <br/>
                      <div className="mx-auto w-4/5 my-8">
                      <input className="bg-gray-900 text-red-200 font-bold py-2 px-8 rounded" type="submit" value="Update" />
                      </div>
                    </form>
                    <div className="mx-auto w-4/5 my-8">
                    <button  className="bg-red-500 text-red-200 font-bold py-2 px-8 rounded" onClick={(e) => {this.handleDelete(sneakerId) }}> Delete </button>
                    </div>
                  </div>  
                  </div>
                }
               
              </div>
      case STATUS.ERROR:
        return <div>{error}</div>
    }
  }
}

export default withAuth(UpdateSneaker);
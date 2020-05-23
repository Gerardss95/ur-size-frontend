import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'


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
    
    const { history } = this.props;
    const sneakerId = this.props.match.params._id;
        // eslint-disable-next-line default-case
        switch (status) {
      case STATUS.LOADING:
        return <div>Loading...</div>
      case STATUS.LOADED:
        return <div>
                { owner &&
                <div>
                      <form onSubmit={this.handleSubmit}>
                      <label htmlFor="name">Model Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={sneaker.name}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="brand">Choose Brand</label>
                      <select
                        id="brand" 
                        name="brand"
                        defaultValue={sneaker.brand}
                        onChange={this.handleChange}
                      >
                      {this.optionBrands()}         
                      </select>
                      <label htmlFor="image">Link the model images</label>
                      <input
                        type="text"
                        name="image"
                        id="image"
                        defaultValue={sneaker.image}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="info">Info</label>
                      <input
                        type="text"
                        name="info"
                        id="info"
                        defaultValue={sneaker.info}
                        onChange={this.handleChange}
                      />
                      <br/>
                      <input type="submit" value="Update" />
                    </form>
                    <button onClick={(e) => {this.handleDelete(sneakerId) }}> Delete </button>
                  </div>  
                }
               
              </div>
      case STATUS.ERROR:
        return <div>{error}</div>
    }
  }
}

export default withAuth(UpdateSneaker);
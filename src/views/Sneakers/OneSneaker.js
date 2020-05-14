import React, { Component } from 'react';

import apiClient from "../../services/apiClient";

import SingleSneaker from "../../components/Sneakers/SingleSneaker";
const STATUS = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};

export default class OneSneaker extends Component {

  state = {
    sneaker: null,
    error: undefined,
    status: STATUS.LOADING,
  }
  componentDidMount = () => {
    const sneakerID = this.props.match.params._id;
    
    apiClient
    .oneSneaker(sneakerID)
    .then((response) => {
      this.setState({
        sneaker: response.data,
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
  render(){
    const { sneaker, status, error } = this.state;
      // eslint-disable-next-line default-case    
      switch (status) {
        case STATUS.LOADING:
          return <div>Loading...</div>
        case STATUS.LOADED:
          return <div>

          <SingleSneaker sneaker={sneaker}/>
          </div>
        case STATUS.ERROR:
          return <div>{error}</div>
      } 
  } 
} 
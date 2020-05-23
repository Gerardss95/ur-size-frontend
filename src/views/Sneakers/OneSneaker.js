import React, { Component } from 'react';

import apiClient from "../../services/apiClient";
import { withAuth } from "../../context/authContext";


import SingleSneaker from "../../components/Sneakers/SingleSneaker";
const STATUS = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};

 class OneSneaker extends Component {

  state = {
    sneaker: null,
    error: undefined,
    status: STATUS.LOADING,
    userLoggedIn: '',
    owner: undefined,
  }
  componentDidMount = () => {
    const sneakerId = this.props.match.params._id;
    if (this.props.user !== null){
      this.setState({
        userLoggedIn: this.props.user.data._id
      })
    }
   
    console.log(this.props)
    apiClient
    .oneSneaker(sneakerId)
    .then((res) => {
      this.setState({
        sneaker: res.data,
        status: STATUS.LOADED
      })
    })
    .then(() => {
      const {sneaker, userLoggedIn } = this.state;
      if(sneaker.userId === userLoggedIn) {
        this.setState({
          owner: true
        })
      }
    })
    .catch((error) => {
      this.setState({
        error: error.name,
        status: STATUS.ERROR,
      })
    })
  }

  render(){
    const { sneaker, status, error, owner } = this.state;
    console.log(owner)
      // eslint-disable-next-line default-case    
      switch (status) {
        case STATUS.LOADING:
          return <div>Loading...</div>
        case STATUS.LOADED:
          return <div>

          <SingleSneaker sneaker={sneaker} owner={owner}/>
          </div>
        case STATUS.ERROR:
          return <div>{error}</div>
      } 
  } 
} 
export default withAuth(OneSneaker);
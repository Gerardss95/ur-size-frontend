import React, { Component } from 'react';

import apiClient from "../../services/apiClient";
import { withAuth } from "../../context/authContext";


import SingleSneaker from "../../components/Sneakers/SingleSneaker";
import AddSize from "../../components/Reviews/Add";
import ReadReview from "../../components/Reviews/ReadReviews";
import Comparator from "../../components/Reviews/Comparator";


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
    reviews: [],
    userHaveReview: false,
    
  }
  componentDidMount = () => {
    let userID = '';
    const sneakerId = this.props.match.params._id;
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
    const { reviews } = this.state;
   
     reviews.map(review => {
       
      if (review.user._id === this.props.data.user._id){
        this.setState({
          userHaveReview: true,
        })
      }
    })
    
  
    apiClient
    .reviewFilterSneaker(sneakerId)
    .then((res) =>{
      this.setState({
        reviews: res.data, 
      })
    })
    .catch((error) => {
      this.setState({
        error: error.name,
        status: STATUS.ERROR,
      })
    })
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

  listReviews = () => {
    const { reviews } = this.state;
    return reviews.map((review, index) =>{
      return <ReadReview  review={review} key={index}  />
    })
    
  }
    

  

  render() {
    const { sneaker, status, error, owner } = this.state;
   
      // eslint-disable-next-line default-case    
      switch (status) {
        case STATUS.LOADING:
          return <div>Loading...</div>
        case STATUS.LOADED:
          return <div>

          <SingleSneaker sneaker={sneaker} owner={owner}/>
          <AddSize sneaker={sneaker} user={this.props.user}/>
          {this.listReviews()}
          <Comparator sneaker={sneaker} user={this.props.user}/>

          </div>
        case STATUS.ERROR:
          return <div>{error}</div>
      } 
  } 
} 
export default withAuth(OneSneaker);
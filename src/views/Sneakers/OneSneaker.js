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
    userHaveReview: undefined,
    
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
    let sneakerVar = '';
    apiClient
    .oneSneaker(sneakerId)
    .then((res) => {
       sneakerVar = res.data;
       this.userChecker(userID, sneakerVar)
      this.setState({
        sneaker: res.data,
        status: STATUS.LOADED
      })
    })
    .then(() => {
      const {sneaker } = this.state;
      if(sneaker.userId === userID) {
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
  userChecker = (userID, sneakerVar) => {
    apiClient
    .reviewFilterUser(userID)
    .then(res =>{
      res.data.map(review =>{
          if(review.brand._id === sneakerVar.brand._id ){
            this.setState({
              userHaveReview: true
            })
          }
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
    const { sneaker, status, error, owner, reviews, userHaveReview } = this.state;
  
      // eslint-disable-next-line default-case    
      switch (status) {
        case STATUS.LOADING:
          return <div>Loading...</div>
        case STATUS.LOADED:
          return <div className="bg-gray-900 h-max">
          <SingleSneaker sneaker={sneaker} owner={owner}/>
          <Comparator sneaker={sneaker} user={this.props.user} reviews={reviews}/>
         { userHaveReview &&
          this.listReviews()
         } 
         { !userHaveReview &&
          <div>
          <AddSize sneaker={sneaker} user={this.props.user}/>
          {this.listReviews()}
          </div>
         }
          </div>
        case STATUS.ERROR:
          return <div>{error}</div>
      } 
  } 
} 
export default withAuth(OneSneaker);
import React, { Component } from 'react';

import apiClient from "../../services/apiClient";


class Comparator extends Component{
state = {
  userReviews: [],
 reviewsBrand: [],
 userSize: '',
 sizeDiff: '',
 brandDiff: '',
 brandUserDiff: '',
}
comparator = () =>{
  const { sizeDiff, brandDiff } = this.state
  apiClient
  .reviewFilterUser(this.props.user.data._id)
    .then((res) =>{
      res.data.map((review)=>{
        if(review.brand._id === brandDiff._id){
          this.setState({
            userSize: (review.userSize + sizeDiff),
          })

        }
      })
    })
}
componentDidMount = () =>{
  const sneaker = this.props.sneaker;
  if(this.props.user !== null){
    apiClient
    .reviewFilterUser(this.props.user.data._id)
    .then((res) =>{
      res.data.map((review) => {
        this.setState({
          userReviews: review,
        })
        if(review.brand._id === sneaker.brand ){
          this.setState({
            userSize: review.userSize,
          })
          
        }else{ 
          let allUserReviews = this.state.userReviews;
           apiClient
          .reviewFilterBrand(sneaker.brand)
          .then((res) =>{
           res.data.map((reviews) => {
             apiClient
             .reviewFilterUser(reviews.user._id)
             .then((res) =>{
              res.data.map((review) => {
                this.setState({
                  reviewsBrand: review,
                })
                if(this.state.reviewsBrand.brand._id === allUserReviews.brand._id){
                  if(this.state.reviewsBrand.userSize > allUserReviews.userSize){
                    return (this.setState({
                      sizeDiff: this.state.reviewsBrand.userSize - allUserReviews.userSize,
                      brandDiff: allUserReviews.brand,
                    }),  this.comparator())
                  } else {
                    return (this.setState({
                      sizeDiff: (allUserReviews.userSize - this.state.reviewsBrand.userSize),
                      brandDiff: allUserReviews.brand
                    }),  this.comparator())
                  }
                }
                
              })
             })
           })
          
            
          })
         
          .catch((err) =>{
            console.log(err)
          });
        }
      })
    })
  
    .catch((err) =>{
      console.log(err)
    })

  } 
 


}




render(){
  const { userSize } = this.state;
  if(this.props.user !== null){
    if(userSize === ''){
      return(
        <div>
          
        </div>
      )
    }return(
      <div>
       <h2> Based on our system you should wear {userSize}</h2>
      </div>
    )

  }else{
    return(<div>
    </div>
      ) 
     
  }
}
}

export default Comparator;
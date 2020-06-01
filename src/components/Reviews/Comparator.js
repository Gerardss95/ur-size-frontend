import React, { Component } from 'react';

import apiClient from "../../services/apiClient";


class Comparator extends Component{
state = {
  userReviews: [],
  reviewsBrand: [],
  userSize: '',

}
comparator = (allUserReviews, sizeDiff, brandDiff ) =>{
  console.log(brandDiff)
  console.log(sizeDiff)
  console.log(allUserReviews)
  
  let userID = '';
  if(this.props.user.data !== undefined){
    userID = this.props.user.data._id
  }else{
    userID = this.props.user._id 
   }
  apiClient
  .reviewFilterUser(userID)
    .then((res) =>{
      res.data.map((review)=>{
        if(review.brand._id === brandDiff._id){
          this.setState({
            userSize: (review.userSize + sizeDiff),
            userReviews: allUserReviews,
          })
        }
      })
    })
}
componentDidMount = () =>{
  const sneaker = this.props.sneaker;
  let allUserReviews = '';
  let userID = '';
  let brandReviews = '';
  if(this.props.user.data !== undefined){
    userID = this.props.user.data._id
  }else{
    userID = this.props.user._id 
   }
  if(this.props.user !== null){
    apiClient
    .reviewFilterUser(userID)
    .then((res) =>{
      res.data.map((review) => {
        allUserReviews = review
        if(review.brand._id === sneaker.brand ){
          this.setState({
            userSize: review.userSize,
          }) 
        }else{ 
           apiClient
          .reviewFilterBrand(sneaker.brand)
          .then((res) =>{
           res.data.map((reviews) => {
             console.log(reviews)
             apiClient
             .reviewFilterUser(reviews.user._id)
             .then((res) =>{
              res.data.map((review) => {
                brandReviews = review
                if(brandReviews.brand._id === allUserReviews.brand._id){
                  if(brandReviews.userSize > allUserReviews.userSize){
                     let sizeDiff = brandReviews.userSize - allUserReviews.userSize;
                      let brandDiff = allUserReviews.brand;
                  return this.comparator(allUserReviews, sizeDiff, brandDiff )
                  } else {
                      let sizeDiff = (allUserReviews.userSize - brandReviews.userSize);
                      let brandDiff = allUserReviews.brand;
                      return this.comparator(allUserReviews, sizeDiff, brandDiff )
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
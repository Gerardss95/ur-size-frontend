import React, { Component } from 'react';

import apiClient from "../../services/apiClient";
import { Link } from 'react-router-dom';


class Comparator extends Component{
state = {
  userReviews: [],
  reviewsBrand: [],
  userSize: '',

}
comparator = (allUserReviews, sizeDiff, brandDiff ) =>{
  let userID = '';
  if(this.props.user === null){
   
  }else if(this.props.user.data !== undefined){
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
  if(this.props.user === null){
  
  }else if(this.props.user.data !== undefined){
    userID = this.props.user.data._id
  }else{
    userID = this.props.user._id 
   }
  if(this.props.user !== null){
    let userHasSize = false;
    apiClient
    .reviewFilterUser(userID)
    .then((res) =>{
      res.data.map((review) => {
        allUserReviews = review
        if(review.brand._id === sneaker.brand ){
          console.log(review.userSize)
          userHasSize = true;
          this.setState({
            userSize: review.userSize,
          }) 
        }
        if(userHasSize !== true) { 
           apiClient
          .reviewFilterBrand(sneaker.brand)
          .then((res) =>{
           res.data.map((reviews) => {
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
      <div className="bg-red-200 rounded relative text-center flex justify-center flex-col m-3 p-3">
        <h2 className="font-bold text-gray-900 text-xl"> Based on UR-SIZE Algorithm you should wear</h2>
        <h1 className="font-bold text-6xl text-gray-900">{userSize} US</h1>
      </div>
    )

  }else{
    return(<div className="flex pt-4 flex-col items-center ">
    <Link to={"/signup"}><button className="bg-red-200 p-4 rounded font-bold">Register to use the Algorithm</button></Link>
    <Link to={"/login"}><button className="bg-red-200 p-4 rounded font-bold mt-2">If you have an account Log in</button></Link>
    </div>
      ) 
     
  }
}
}

export default Comparator;
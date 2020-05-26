import React, { Component } from 'react';

import apiClient from "../../services/apiClient";


class Comparator extends Component{
state = {
 reviewsUser: [],
 reviewsBrand: [],
 userSize: '',
}
componentDidMount = () =>{
  const sneaker = this.props.sneaker;
  console.log(sneaker.brand)
  apiClient
  .reviewFilterBrand(sneaker.brand)
  .then((res) =>{
    this.setState({
      reviewsBrand: res.data,
    })
  })
  .catch((err) =>{
    console.log(err)
  });
  apiClient
  .reviewFilterUser(this.props.user.data._id)
  .then((res) =>{
    res.data.map((review) => {
      if(review.brand._id === sneaker.brand ){
        this.setState({
          userSize: review.userSize
        })
      }
    })
  })
  .catch((err) =>{
    console.log(err)
  })
 
  

}


render(){
  const { userSize } = this.state;
  
  return(
    <div>
     <h2> You should wear {userSize}</h2>
    </div>
  )
}
}

export default Comparator;
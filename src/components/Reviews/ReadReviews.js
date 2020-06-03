import React, { Component } from 'react'

class ReadReviews extends Component {

  render(){  
    const review = this.props.review
    if(review.review === ''){
      return(<div></div>)
    }return(
      <div className="bg-red-200 m-4 rounded flex flex-col p-4 pb-4 text-center">
       <h1 className=" uppercase text-center font-bold">{review.user.username}</h1>
       <p className="text-center">{review.review}</p>
       <p ClassName="text-center"> User Size: {review.userSize} US</p>
      </div>
    )
  }
}
export default ReadReviews;
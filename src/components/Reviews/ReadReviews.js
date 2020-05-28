import React, { Component } from 'react'

class ReadReviews extends Component {

  render(){  
    const review = this.props.review
    if(review.review === ''){
      return(<div></div>)
    }return(
      <div>
       <h1>{review.user.username}</h1>
       <p>{review.review}</p>
      </div>
    )
  }
}
export default ReadReviews;
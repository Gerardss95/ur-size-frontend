import React, { Component } from 'react'

class ReadReviews extends Component {
  listReview = () => {
      if(this.props.sneaker._id === this.props.review.sneaker._id){
        return  <div>
                  <h2>{this.props.review.user.username}</h2>
                  <p>{this.props.review.review}</p>
                </div>
       }
  }
  render(){  
    return(
      <div>
        {this.listReview()}
      </div>
    )
  }
}
export default ReadReviews;
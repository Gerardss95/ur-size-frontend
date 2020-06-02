import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import "./sneakersStyle.css";

export default class SingleSneaker extends Component {
  render(){
    const {sneaker, owner } = this.props;

    return(
      <div className="single-sneaker">
      { owner &&
        <Link to={`/sneakers/${sneaker._id}/update`}><button>Update</button></Link>
      }
        <img src={sneaker.brand.image} alt={sneaker.brand.name}/>
        <h2 className="sneaker-card-text">{sneaker.name}</h2> 
        <img src={ sneaker.image[0]} alt={sneaker.name}/>
      </div>
    );
  }
}
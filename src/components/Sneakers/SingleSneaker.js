import React, { Component } from 'react'


import "./sneakersStyle.css";

export default class SingleSneaker extends Component {
  render(){
    const {sneaker} = this.props;

    return(
      
      <div className="single-sneaker">
        <img src={sneaker.brand.image} alt={sneaker.brand.name}/>
        <h2 className="sneaker-card-text">{sneaker.name}</h2> 
        <img src={ sneaker.image[0]} alt={sneaker.name}/>
        <img src={ sneaker.image[1]} alt={sneaker.name}/>
      </div>
      
    );
  }
}
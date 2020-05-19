import React, { Component } from 'react'

import { Link } from "react-router-dom";
import "./sneakersStyle.css";

export default class SneakerCard extends Component {
  render(){
    const {sneaker, index} = this.props;
    console.log(sneaker)
    return(
      <Link key={index} to={`/sneakers/${sneaker._id}`}>
      <div className="sneaker-card">
        <img className="sneaker-image" src={ sneaker.image[0]} alt={sneaker.name}/>
        <h2 className="sneaker-card-text">{sneaker.name}</h2>
       <img className="sneaker-brand-image" src={sneaker.brand.image} alt={sneaker.brand.name}/> 
      </div>
      </Link>
    );
  }
}
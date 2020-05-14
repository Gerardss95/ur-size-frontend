import React, { Component } from 'react'

import { Link } from "react-router-dom";
import "./sneakersStyle.css";

export default class SneakerCard extends Component {
  render(){
    const {sneaker, index} = this.props;

    return(
      <Link key={index} to={`/sneakers/${sneaker._id}`}>
      <div className="sneaker-card">
        <img src={ sneaker.image[0]} alt={sneaker.name}/>
        <h2 className="sneaker-card-text">{sneaker.name} {sneaker.brand.name}</h2>
      </div>
      </Link>
    );
  }
}
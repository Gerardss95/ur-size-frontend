import React, { Component } from 'react'

import { Link } from "react-router-dom";
import "./sneakersStyle.css";

export default class BrandCard extends Component {
  render(){
    const { brand , index} = this.props;
    
    return(
      <Link key={index} to={`/brands/${brand._id}`}>
      <div className="sneaker-card">
        <img className="brand-image" src={ brand.image } alt={brand.name}/>
      </div>
      </Link>
    );
  }
}
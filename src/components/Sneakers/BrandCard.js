import React, { Component } from 'react'

import { Link } from "react-router-dom";
import "./sneakersStyle.css";

export default class BrandCard extends Component {
  render(){
    const { brand , index} = this.props;
    
    return(
      <Link key={index} to={`/brands/${brand._id}`}>
      <div className="flex flex-col items-center">
        <img className="w-auto h-32 p-4" src={ brand.image } alt={brand.name}/>
      </div>
      </Link>
    );
  }
}
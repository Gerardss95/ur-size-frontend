import React, { Component } from 'react'

import { Link } from "react-router-dom";
import "./sneakersStyle.css";

export default class BrandCard extends Component {
  render(){
    const { brand , index} = this.props;
    
    return(
      <Link key={index} to={`/brands/${brand._id}`}>
      <div className="flex flex-row flex-wrap justify-center  ">
        <img className="w-48 h-36 p-4" src={ brand.image } alt={brand.name}/>
      </div>
      </Link>
    );
  }
}
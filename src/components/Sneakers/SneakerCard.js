import React, { Component } from 'react'

import { Link } from "react-router-dom";
import "./sneakersStyle.css";

export default class SneakerCard extends Component {
  render(){
    const {sneaker, index} = this.props;
    return(
      <div className="flex  bg-red-200 w-11/12 my-0 mx-auto mb-6 rounded">

      <Link key={index} to={`/sneakers/${sneaker._id}`}>
      <div className="relative text-center flex justify-center flex-col ">
        <img className="mx-auto rounded" src={ sneaker.image[0]} alt={sneaker.name}/>
        <div className="flex flex-row p-4">
          <img className="h-8 w-auto" src={sneaker.brand.image} alt={sneaker.brand.name}/> 
          <h2 className="pl-2 pt-1 uppercase font-bold ">{sneaker.name}</h2>
        </div>
      </div>
      </Link>
      </div>
    );
  }
}
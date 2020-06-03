import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import "./sneakersStyle.css";

export default class SingleSneaker extends Component {
  render(){
    const {sneaker, owner } = this.props;
    return(
      <div className="flex  bg-red-200 w-11/12 my-0 mx-auto mb-6  rounded">
        <div className="relative text-center flex justify-center flex-col ">
          <div className="h-32 bg-gray-900 border border-gray-900"></div>
            <img className="mx-auto rounded"   src={ sneaker.image[0]} alt={sneaker.name}/>
            <h2 className=" p-4 uppercase font-bold ">{sneaker.name}</h2> 
        { owner &&
        <div className="bg-gray-900 border border-red-200 rounded">
          <Link to={`/sneakers/${sneaker._id}/update`}><button className="text-red-200 p-3 rounded font-bold text-2xl">Update</button></Link>
        </div>
        }
        </div>
       
      </div>
    );
  }
}
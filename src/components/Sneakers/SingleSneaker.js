import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import "./sneakersStyle.css";

export default class SingleSneaker extends Component {
  render(){
    const {sneaker, owner } = this.props;
    
    return(
      <div className="pt-24 px-3">
        <img className="rounded "  src={ sneaker.image[0]} alt={sneaker.name}/>
        <h2 className="bg-red-200 text-center font-bold">{sneaker.name}</h2> 
        { owner &&
        <Link to={`/sneakers/${sneaker._id}/update`}><button>Update</button></Link>
        }
      </div>
    );
  }
}
import React, { Component } from 'react';

import ImgCarousel from "../components/ImgCarousel/ImgCarousel";
import SearchBar from "../components/SearchBar/SearchBar";

export default class Home extends Component{

  render(){
    return(
      <div>
      <ImgCarousel imgs={["https://cdn.flightclub.com/2600/TEMPLATE/803887/1.jpg", "https://cdn.flightclub.com/2600/TEMPLATE/164192/1.jpg", "https://cdn.flightclub.com/2600/TEMPLATE/012234/1.jpg", "https://cdn.flightclub.com/2600/TEMPLATE/801601/1.jpg" ]}/>
     

      </div>
    )
  }
}
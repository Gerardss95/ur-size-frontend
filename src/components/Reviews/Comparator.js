import React, { Component } from 'react'

import apiClient from "../../services/apiClient";

class Comparator extends Component{
state = {
  brands: [],

}
componentDidMount = () =>{
  apiClient
  .brands()
  
}
  sizeComparator = () => {

  }
  render(){
    return(
      <div></div>
    )
  }

}
export default Comparator;
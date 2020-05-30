import React, { Component } from 'react'

import SneakerCard from "../../components/Sneakers/SneakerCard";

import apiClient from "../../services/apiClient";

const STATUS = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};

export default class BrandsSneakerList extends Component {
  
  state = {
    brand: null,
    sneakers: [],
    error: undefined,
    status: STATUS.LOADING,
    searchQuery: '',
  }
  componentDidMount = () => {
    const brandID = this.props.match.params._id;
    apiClient
    .oneBrand(brandID)
    .then((response) =>{
      this.setState({
        brand: response.data,
        sneakers: response.data.sneakers,
        status: STATUS.LOADED,
      })
     
    })
 
    .catch((error) => {
      this.setState({
        error: error.name,
        status: STATUS.ERROR,
      })
    })
  }
  listSneakers = () => {
    const { sneakers } = this.state;
    return sneakers.map((sneaker, index) => {
      return <SneakerCard sneaker={sneaker} index={index}/>
    })
  }



  render() {
    const { status, error, brand } = this.state;
    // eslint-disable-next-line default-case
    switch (status) {
      case STATUS.LOADING:
          return <div>Loading...</div>
        case STATUS.LOADED:
          console.log(brand.brand.name)
          return <div>
                <h1>{brand.brand.name}</h1>
                
                  {this.listSneakers()}
                </div>
        case STATUS.ERROR:
          return <div>{error}</div>
      }
    }
  }
  
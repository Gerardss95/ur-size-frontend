import React, { Component } from 'react'

import BrandCard from "../../components/Sneakers/BrandCard";


import apiClient from "../../services/apiClient";

const STATUS = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};

export default class Sneakers extends Component {
  
  state = {
    brands: [],
    error: undefined,
    status: STATUS.LOADING,
    searchQuery: '',
  }
  componentDidMount = () => {
    apiClient
    .brands()
    .then((response) =>{
      this.setState({
        brands: response.data,
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
  listBrands = () => {
    const { brands } = this.state;
    console.log('brands :>> ', brands);

    return brands.map((brand, index) => {
      return <BrandCard brand={brand} index={index}/>
    })
  }


  render() {
    const { status, error } = this.state;
    // eslint-disable-next-line default-case
    switch (status) {
      case STATUS.LOADING:
          return <div>Loading...</div>
        case STATUS.LOADED:
          return <div className="pt-24 pl-4 pr-4 bg-gray-900 pb-4">
                  <h1 className="text-red-200 text-center font-bold text-xl">All the Brands </h1>
                  <div className="flex flex-col flex-wrap pb-8 border-black bg-red-200">
                  {this.listBrands()}
                  </div>
                </div>
        case STATUS.ERROR:
          return <div>{error}</div>
      }
    }
  }
  
import React, { Component } from 'react'

import SearchBar from "../../components/SearchBar/SearchBar";
import SneakerCard from "../../components/Sneakers/SneakerCard";

import apiClient from "../../services/apiClient";

const STATUS = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};

export default class Sneakers extends Component {
  
  state = {
    sneakers: [],
    error: undefined,
    status: STATUS.LOADING,
  }
  componentDidMount = () => {
    apiClient
    .sneakers()
    .then((response) =>{
      this.setState({
        sneakers: response.data,
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

  render(){
    const { status, error } = this.state;
    // eslint-disable-next-line default-case
    switch (status) {
      case STATUS.LOADING:
          return <div>Loading...</div>
        case STATUS.LOADED:
          return <div>
                  <SearchBar searchPlaceHolder={"Search Sneakers..."}/>
                  <h1>Sneakers</h1>
                  {this.listSneakers()}
                </div>
        case STATUS.ERROR:
          return <div>{error}</div>
      }
  }
}
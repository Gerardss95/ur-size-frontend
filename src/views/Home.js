import React, { Component } from 'react';

import SneakerCard from '../components/Sneakers/SneakerCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import HowItWorks from '../components/Sneakers/HowItWorks';
import apiClient from '../services/apiClient';

const STATUS = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
};
export default class Home extends Component{
  state = {
    sneakers: null,
    error: undefined,
    status: STATUS.LOADING
  }
  componentDidMount = () =>{
    apiClient
    .sneakers()
    .then(res =>{
      const shuffled = res.data.sort(() => 0.5 - Math.random());
      const fourSneakers = shuffled.slice(0, 4);
      this.setState({
        sneakers: fourSneakers,
        status: STATUS.LOADED,
      });
    })
    .catch(error => {
      this.setState({
        error: error.name,
        status: STATUS.ERROR,
      });
    });
  }
  listSneakers = () => {
    const { sneakers } = this.state;
    return sneakers.map((sneaker, index) => {
      return <SneakerCard sneaker={sneaker} index={index}/>
    })
  }
  render(){
    const { status, error } = this.state;
    switch(status){
      case STATUS.LOADING:
        return <Loading />
      case STATUS.LOADED:
        return (
          <div className="absolute mt-16 pt-4 bg-gray-900">
          <HowItWorks />
          <h1 className="text-center pb-4 text-red-200 font-bold" > 🔥🔥🔥 Check this Sneakers!🔥🔥🔥 </h1>
          {this.listSneakers()}
          </div>
        );
        case STATUS.ERROR:
          return <Error error={error} />
       //no default   
    }
  }
}
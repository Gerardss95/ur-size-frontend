import React, { Component } from 'react'

import apiClient from "../../services/apiClient";

const STATUS = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};
export default class Add extends Component {
  state ={
    user: '',
    brand: '',
    userSize: '',
    review: '',
    status: STATUS.LOADING,
  };
  componentDidMount = () => {
    this.setState({
      user: this.props.user.data._id,
      brand: this.props.sneaker.brand,
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const{ user, brand, userSize, review } = this.state;
    apiClient
    .addReview({
      user,
      brand,
      userSize,
      review
    })
    .then((res) =>{
      console.log(res)
    })
    .catch((err) =>{
      console.log(err)
    });
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  
  render(){
    return(
      <div>
      <h1>Add UR SIZE</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="userSize">Choose US Size</label>
          <select 
            id="userSize"
            name="userSize"
            required
            onChange={this.handleChange}
            >
              <option value="5" > 5 </option>
              <option value="5.5" > 5.5 </option>
              <option value="6" > 6 </option>
              <option value="6.5" > 6.5 </option>
              <option value="7" > 7 </option>
              <option value="7.5" > 7.5 </option>
              <option value="8" > 8 </option>
              <option value="8.5" > 8.5 </option>
              <option value="9" > 9 </option>
              <option value="9.5" > 9.5 </option>
              <option value="10" > 10 </option>
              <option value="10.5" > 10.5 </option>
              <option value="11" > 11 </option>
              <option value="11.5" > 11.5 </option>
              <option value="12" > 12 </option>
              <option value="12.5" > 12.5 </option>
              <option value="13" > 13 </option>
              <option value="13.5" > 13.5 </option>
          </select>
          <br></br>
          <label htmlFor="review"> Review </label>
          <input
            type="text"
            name="info"
            id="info"
            placeholder="Add extra info if you want"
            onChange={this.handleChange}
          />
           <br></br>
           <input
            type='submit'
            value='Submit'
          />
        </form>
      </div>
    )
  }
}
import React, { Component } from 'react'

import apiClient from "../../services/apiClient";
import { withAuth } from "../../context/authContext";
import { Redirect } from 'react-router-dom';


class Add extends Component {
  state ={
    user: '',
    brand: '',
    sneaker: '',
    userSize: '',
    review: '',
    loggedIn: false,
  };
  componentDidMount = () => {
    if( this.props.user !== null ){
      if (this.props.user.data !== undefined){
        this.setState({
          user: this.props.user.data._id,
          brand: this.props.sneaker.brand,
          loggedIn: true,
          sneaker: this.props.sneaker._id,
        })
      }else{
        this.setState({
          user: this.props.user._id,
          brand: this.props.sneaker.brand,
          loggedIn: true,
          sneaker: this.props.sneaker._id,
        })
      }
    }
   
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const{ user, brand, userSize, review, sneaker } = this.state;
    apiClient
    .addReview({
      sneaker,
      user,
      brand,
      userSize,
      review
    })
    .then((res) =>{
      window.location.reload();
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
    const { loggedIn } = this.state;
    return(
      <div>
      { loggedIn && 
        <div className="pt-20 w-screen text-center bg-gray-900 text-red-200 h-screen">
        <div className="w-5/6 bg-red-200 shadow-md rounded px-8 pb-4 my-0 mx-auto text-black">
        <img className="h-32 mx-20" src="https://i.ibb.co/dJ59KL8/UrSize5.png" alt="UrSize5" border="0"></img>
        <form className="flex flex-col text-center" onSubmit={this.handleSubmit}>
          <label className="block text-gray-900 font-bold mb-2 text-center w-4/5 my-0 mx-auto" htmlFor="userSize">Choose Size (US)</label>
          <select 
           className="appearance-none border my-0 mx-auto w-4/5 py-2 px-3 bg-gray-900 text-red-200 rounded"
            id="userSize"
            name="userSize"
            required
            onChange={this.handleChange}
            >
              <option value={5} > 5 </option>
              <option value={5.5} > 5.5 </option>
              <option value={6} > 6 </option>
              <option value={6.5} > 6.5 </option>
              <option value={7} > 7 </option>
              <option value={7.5} > 7.5 </option>
              <option value={8} > 8 </option>
              <option value={8.5} > 8.5 </option>
              <option value={9} > 9 </option>
              <option value={9.5} > 9.5 </option>
              <option value={10} > 10 </option>
              <option value={10.5} > 10.5 </option>
              <option value={11} > 11 </option>
              <option value={11.5} > 11.5 </option>
              <option value={12} > 12 </option>
              <option value={12.5} > 12.5 </option>
              <option value={13} > 13 </option>
              <option value={13.5} > 13.5 </option>
          </select>
          <br></br>
          <label className="block text-gray-900 font-bold mb-2 text-center w-4/5 my-0 mx-auto" htmlFor="review"> Review </label>
          <input
            className="appearance-none border my-0 mx-auto w-4/5 py-2 px-3 bg-gray-900 text-red-200 rounded"
            type="text"
            name="review"
            id="review"
            placeholder="Add a review if you want"
            onChange={this.handleChange}
          />
           <br></br>
           <div className="mx-auto w-4/5 my-8">
           <input
            className="bg-gray-900 text-red-200 font-bold py-2 px-8 rounded"
            type='submit'
            value='Submit'
          />

           </div>
          
        </form>
        </div>
      </div>
      }
     
      </div>
    )
  }
}
export default withAuth(Add);

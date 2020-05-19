import React, { Component } from 'react'

import { withAuth } from "../../context/authContext";

import apiClient from "../../services/apiClient";

class AddSneaker extends Component {

  state = {
    userOwner: '',
    name: '',
    image: '',
    brand: '',
    info: '',
  };
  componentDidMount = () => {
    this.setState({
      userOwner: this.props.user.data._id
    })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const {
      name,
      image,
      brand,
      info,
    } = this.state;
  
  apiClient
    .addSneaker({
      name,
      image,
      brand,
      info
    })
    .then((res) =>{
      history.push("/sneakers")
    })
    .catch((err) =>{
      console.log(err)
    });
  };
  render(){
    return(
      <div>
      <h1>Add Sneakers</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Model Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Air Jordan 1"
            onChange={this.handleChange}
          />
          <label htmlFor="brand">Choose Brand</label>
          <select
            id="brand" 
            name="brand"
            required
            onChange={this.handleChange}
          >
          <option value={"5ec3e659a082421580c96b2e"}>Nike</option>
          <option value={"5ec3e659a082421580c96b2e"}>Adidas</option>
          <option value={"5ec3e659a082421580c96b2e"}>Vans</option>
          <option value={"5ec3e659a082421580c96b2e"}>Converse</option>
          <option value={"5ec3e659a082421580c96b2e"}>New Balance</option>
          <option value={"5ec3e659a082421580c96b2e"}>Asics</option>
          <option value={"5ec3e659a082421580c96b2e"}>Reebook</option>
          <option value={"5ec3e659a082421580c96b2e"}>Puma</option>
          </select>
          <label htmlFor="image">Link the model images</label>
          <input
            type="text"
            name="image"
            id="image"
            placeholder="Link here the image"
            onChange={this.handleChange}
          />
          <label htmlFor="info">Info</label>
          <input
            type="text"
            name="info"
            id="info"
            placeholder="Add extra info if you want"
            onChange={this.handleChange}
          />
          <br/>
          <input
            type='submit'
            value='publish'
          />
        </form>
      </div>
    )
  }
}
export default withAuth(AddSneaker);


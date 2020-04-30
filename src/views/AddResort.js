import React, { Component } from "react";
import apiClient from "../services/resorts";

export default class AddResort extends Component {
  state = {
    name: "",
    latitude: "",
    longitude: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { name, longitude, latitude } = this.state;
    apiClient
      .createResort({ name, latitude, longitude })
      .then((res) => {
        history.push("/resorts");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={this.handleChange}
          />
          <label htmlFor="latitude">Lat</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            onChange={this.handleChange}
          />
          <label htmlFor="longitude">Lon</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            onChange={this.handleChange}
          />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

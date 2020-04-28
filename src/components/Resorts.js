import React, { Component } from "react";
import axios from "axios";

export default class Resorts extends Component {
  state = {
    resorts: [],
  };

  componentDidMount() {
    axios
      .get("http://localhost:3000/resorts")
      .then(({ data }) => {
        this.setState({
          resorts: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderResorts = () => {
    const { resorts } = this.state;
    return resorts.map((resort, index) => {
      return <li key={index}>{resort.name}</li>;
    });
  };

  render() {
    return (
      <div>
        <h1>Listado de pistas</h1>
        <ul>{this.renderResorts()}</ul>
      </div>
    );
  }
}

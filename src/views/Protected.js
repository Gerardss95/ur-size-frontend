import React, { Component } from "react";
import apiClient from "../services/resorts";
import { withAuth } from "../context/authContext";

class Resorts extends Component {
  state = {
    resorts: [],
  };

  loadResorts = () => {
    apiClient
      .getAllResorts()
      .then(({ data }) => {
        console.log("data", data);
        // this.setState({
        // resorts: data,
        // });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.loadResorts();
  }

  handleDelete = (id) => {
    apiClient
      .deleteResort(id)
      .then(() => {
        console.log("done");
        this.loadResorts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderResorts = () => {
    const { resorts } = this.state;
    return resorts.map((resort, index) => {
      return (
        <li key={index}>
          {resort.name}
          <button
            onClick={(e) => {
              this.handleDelete(resort._id);
            }}
          >
            delete
          </button>
        </li>
      );
    });
  };

  render() {
    const { onLogout } = this.props;
    return (
      <div>
        <h1>Listado de pistas</h1>
        <button onClick={onLogout}>Loogut</button>
        <ul>{this.renderResorts()}</ul>
      </div>
    );
  }
}

export default withAuth(Resorts);

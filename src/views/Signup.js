import React, { Component } from 'react';
import { withAuth } from "../context/authContext";
import apiClient from "../services/apiClient";

class Signup extends Component {
	state = {
    username: "",
    password: "",
	};

	handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
	handleSubmit = (e) => {
		e.preventDefault();
		const { history } = this.props;
		const { username, password } = this.state;
		apiClient
		.signup({username, password})
		.then((res) =>{
			history.push("/protected")
		})
		.catch((err) => {
			console.log(err);
		})
	}
	render() {
    const { username, password } = this.state;

    return (
      <div>
        <h1>Signup</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            value={username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={this.handleChange}
          />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}
export default withAuth(Signup);
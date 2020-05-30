import React, { Component } from "react";
import { withAuth } from "../context/authContext";
import { Link } from 'react-router-dom';

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  handleSubmit = (e) => {
    const { history } =this.props;
    e.preventDefault();
    const { username, password } = this.state;
    const { onLogin } = this.props;
    if (username !== "" && password !== "") {
      onLogin({ username, password });
      history.push('/sneakers')
    }
  };

  cleanForm = () => {
    this.setState({
      username: "",
      password: "",
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <h1>Login</h1>
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
        <p>Don't have an account?</p><Link to={'/signup'}><button>Sign Up</button></Link>
      </div>
    );
  }
}

export default withAuth(Login);

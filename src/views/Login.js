import React, { Component } from "react";
import { withAuth } from "../context/authContext";
import { Link } from 'react-router-dom';

class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {
      username: false,
      password: false,
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const { onLogin } = this.props;
    if (username !== '' && password !== '') {
      onLogin({ username, password });
      this.setState({
        errors: {
          username: !username,
          password: !password,
        },
      });
    } else if (username === '' && password === '') {
      this.setState({
        errors: {
          username: !username,
          password: !password,
        },
      });
    } else if (username === '' && password !== '') {
      this.setState({
        errors: {
          username: !username,
        },
      });
    } else if (username !== '' && password === '') {
      this.setState({
        errors: {
          password: !password,
        },
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { username, password , errors } = this.state;
    const { error } = this.props;
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
          {errors.username && (<div>Username cannot be empty</div>)}
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={this.handleChange}
          />
          {errors.password && (<div>Password cannot be empty</div>)}
          {!errors.password && !errors.username && error && (<div>{error}</div>)}
          <input type="submit" value="submit" />
        </form>
        <p>Don't have an account?</p><Link to={'/signup'}><button>Sign Up</button></Link>
      </div>
    );
  }
}

export default withAuth(Login);

import React, { Component } from 'react';
import { withAuth } from "../context/authContext";
import { Link } from 'react-router-dom';

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
    const { username, password } = this.state;
    const { onSignup } = this.props;
    if ( username !== '' && password !== ''){
      onSignup({username, password})
    }
    
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
          <input type="submit" value="sign up" />
        </form>
        <p>Already have an account?</p><Link to={'/login'}><button>Log In</button></Link> 
      </div>
    );
  }
}
export default withAuth(Signup);
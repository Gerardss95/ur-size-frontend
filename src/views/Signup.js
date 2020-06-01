import React, { Component } from 'react';
import { withAuth } from "../context/authContext";
import { Link } from 'react-router-dom';

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
}

class Signup extends Component {
	state = {
    username: "",
    password: "",
    errors: {
      username: '',
      password: '',
    }
	};
  
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const { errors } = this.state;
    switch (name) {
    
      case 'username':
        errors.username  = value.length === 0 ? 'Please enter a Username' : '';
        break;
      case 'password':
        errors.password = value.length < 6 ? 'Password must be at least 6 characters long' : '';
        break;
      // no default
    }
    this.setState({ errors, [name]: value });
  };
	handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, errors } = this.state;
    const { onSignup } = this.props;
    if ( validateForm(errors) && username !== '' && password !== ''){
      onSignup({username, password})
    }else{
      console.error('invalid form')
    }
    
	};
	render() {
    const { username, password, errors } = this.state;
    const { error } = this.props;
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
          {errors.username.length > 0 &&(
            <span>{errors.username}</span>
          )}
          {errors.username.length === 0 && username !== '' &&(
            <span>Your username is correct</span>
          )}
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={this.handleChange}
          />
          {errors.password.length > 0 &&(
            <span>{errors.password}</span>
          )}
          {errors.password.length === 0 && password !== '' &&(
            <span>Your password is correct</span>
          )}
          <input type="submit" value="sign up" />
        </form>
        <p>Already have an account?</p><Link to={'/login'}><button>Log In</button></Link> 
      </div>
    );
  }
}
export default withAuth(Signup);
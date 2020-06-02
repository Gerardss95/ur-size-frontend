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
      <div className="pt-20 w-screen text-center bg-gray-900 text-red-200 h-screen">
      <div className="w-5/6 my-8 bg-red-200 shadow-md rounded px-8 pt-6 pb-8 my-0 mx-auto text-black">
        <h1 className="text-2xl font-bold text-center text-gray-900 my-8">Welcome to UR-SIZE</h1>
        <form className="flex flex-col text-center"  onSubmit={this.handleSubmit}>
        <label className="block text-gray-900 font-bold mb-2 text-center w-4/5 my-0 mx-auto" htmlFor="username">
             Username
            </label>
          <input
            className="appearance-none border my-0 mx-auto w-4/5 py-2 px-3 bg-gray-900 text-red-200 rounded"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={this.handleChange}
          />
          {errors.username.length > 0 &&(
            <span className="text-red-500 font-bold">{errors.username}</span>
          )}
          {errors.username.length === 0 && username !== '' &&(
            <span className="text-green-500 font-bold">Your username is correct</span>
          )}
          <label className="block text-gray-900 font-bold mb-2 text-center w-4/5 my-0 mx-auto" htmlFor="password">
             Password
          </label>
          <input
            className="appearance-none border my-0 mx-auto w-4/5 py-2 px-3 bg-gray-900 text-red-200 rounded"
            type="password"
            name="password"
            id="password"
            placeholder="******"
            value={password}
            onChange={this.handleChange}
          />
          {errors.password.length > 0 &&(
            <span className="text-red-500 font-bold">{errors.password}</span>
          )}
          {errors.password.length === 0 && password !== '' &&(
            <span className="text-green-500 font-bold">Your password is correct</span>
          )}
          <div className="mx-auto w-4/5 my-8">
          <input 
            className="bg-gray-900 text-red-200 font-bold py-2 px-8 rounded"
            type="submit"
            value="Sign up" />
          </div>
        </form>
      </div>
        <p>Already have an account?</p><Link to={'/login'}><button className="mt-1 text-2xl p-1 bg-red-200 text-gray-900 rounded">Log In</button></Link> 
      </div>
    );
  }
}
export default withAuth(Signup);
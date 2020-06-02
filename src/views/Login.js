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
      <div className="pt-20 w-screen text-center bg-gray-900 text-red-200 h-screen">
      <div className="w-5/6 my-8 bg-red-200 shadow-md rounded px-8 pt-6 pb-8 my-0 mx-auto text-black">

        <h1 className="text-2xl font-bold text-center text-gray-900 my-8">Happy to see you back!</h1>
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
          {errors.username && (<div className="text-red-500 font-bold">Username cannot be empty</div>)}
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
          {errors.password && (<div className="text-red-500 font-bold">Password cannot be empty</div>)}
          {!errors.password && !errors.username && error && (<div className="text-red-500 font-bold">{error}</div>)}
         <div className="mx-auto w-4/5 my-8">

          <input
           className="bg-gray-900 text-red-200 font-bold py-2 px-8 rounded"
           type="submit" 
           value="Log in" />
         </div>
        </form>
      </div>
      <div>
        <p>Don't have an account?</p><Link to={'/signup'}><button className="mt-1 text-2xl p-1 bg-red-200 text-gray-900 rounded">Sign Up</button></Link>

      </div>
      </div>
    );
  }
}

export default withAuth(Login);

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render(){
    return(
      <header>
        <Link to="/" className="nav-logo">UR-SIZE</Link>
        <div>
          <Link to={"/sneakers"}>Sneakers</Link>
          <Link to={"/brands"}>Brands</Link>
          <Link to={"/signup"}>Sign Up</Link>
          <Link to={"/login"}>Log In</Link>
        </div>
      </header>
    )
  }
}
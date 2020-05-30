import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render(){
    return(
      <header>
        <Link to="/" className="nav-logo"><img src="https://i.ibb.co/C2qYx3B/Ur-Size-Banner.png" alt="Ur-Size-Banner" border="0"/></Link>
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
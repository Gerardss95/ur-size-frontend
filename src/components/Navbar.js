import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withAuth } from "../context/authContext";


class Navbar extends Component {
  state={
    showMenu: false,
  }
  showMenu = e => {
    e.preventDefault();
    this.setState({ showMenu: !this.state.showMenu }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  };
  closeMenu = () => {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  };
  render(){
    const { onLogout, isLoggedIn } = this.props;
    const { showMenu } = this.state;
    return(
      <div className="fixed z-20">
      <nav className='bg-red-200 w-screen pl-4 pr-4 py-4 flex justify-between '>
        <Link to="/" ><img className="h-12 w-auto" src="https://i.ibb.co/KGmM6Tn/Ur-Sumepre.png" alt="Ur-Size-Banner" border="0"/></Link>
        <img className="h-12 w-auto relative cursor-pointer " src="https://i.ibb.co/c8GNpfQ/Zapa.png" alt="ur-icon" onClick={this.showMenu}></img>
      </nav>
      { showMenu && (
        <ul className="z-20 absolute right-0 mr-0 flex flex-col bg-red-200 border border-red-200 bg-opacity-75">
         <Link  className="px-12 py-3" to={"/sneakers"}>Sneakers</Link>
          <Link className="px-12 py-3" to={"/brands"}>Brands</Link>
         {!isLoggedIn && <Link className="px-12 py-3" to={"/signup"}>Sign Up</Link>}
         {!isLoggedIn &&  <Link className="px-12 py-3" to={"/login"}>Log In</Link>}
         {isLoggedIn && <Link className="px-12 py-3" to={"/sneakers/add"} >Add Sneaker</Link>}
         {isLoggedIn &&  <button className="px-12 py-3" onClick={onLogout}>Log out</button>}
        </ul>
      )}

      </div>

    )
  }
}
export default withAuth(Navbar);

import React, { Component } from "react";
import { Switch } from "react-router-dom";

import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PriveteRoute";

import Protected from "./views/Protected";
import LoginWithAuth from "./views/Login";
import SignupWithAuth from './views/Signup';

import AuthProvider from "./context/authContext";

import Navbar from "./components/Navbar";
import ImgCarousel from "./components/ImgCarousel/ImgCarousel"
class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div>
          <div className="App">
            <Navbar />
            <ImgCarousel   imgs={["https://cdn.flightclub.com/2600/TEMPLATE/803887/1.jpg", "https://cdn.flightclub.com/2600/TEMPLATE/164192/1.jpg", "https://cdn.flightclub.com/2600/TEMPLATE/012234/1.jpg", "https://cdn.flightclub.com/2600/TEMPLATE/801601/1.jpg" ]}/>
            <Switch>
              <AnonRoute exact path={"/login"} component={LoginWithAuth} />
              <AnonRoute exact path={"/signup"} component={SignupWithAuth} />
              <PrivateRoute exact path={"/protected"} component={Protected} />
            </Switch>
          </div>
        </div>
      </AuthProvider>
    );
  }
}

export default App;

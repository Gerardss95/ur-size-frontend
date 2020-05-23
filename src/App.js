import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PriveteRoute";

import Protected from "./views/Protected";
import LoginWithAuth from "./views/Login";
import SignupWithAuth from './views/Signup';

import AuthProvider from "./context/authContext";

import Navbar from "./components/Navbar";

import Home from "./views/Home";
import Sneakers from "./views/Sneakers/Sneakers";
import OneSneaker from "./views/Sneakers/OneSneaker";
import AddSneaker from "./views/Sneakers/AddSneaker";
import Brands from "./views/Brands/Brands";
import BrandSneakerList from "./views/Brands/BrandsSneakerList";
import UpdateSneaker from "./views/Sneakers/UpdateSneaker";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path={"/"} component={Home}/>
              <AnonRoute exact path={"/login"} component={LoginWithAuth} />
              <AnonRoute exact path={"/signup"} component={SignupWithAuth} />
              <Route exact path={"/brands"} component={Brands} />
              <Route exact path={"/brands/:_id"} component={BrandSneakerList} />
              <Route exact path={"/sneakers"} component={Sneakers} />
              <PrivateRoute exact path={"/sneakers/add"} component={AddSneaker} />
              <PrivateRoute exact path={"/sneakers/:_id/update"} component={UpdateSneaker} />
              <Route exact path={"/sneakers/:_id"} component={OneSneaker} />
              <PrivateRoute exact path={"/protected"} component={Protected} />
            </Switch>
          </div>
        </div>
      </AuthProvider>
    );
  }
}

export default App;

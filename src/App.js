import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Resorts from "./views/Resorts";
import AddResort from "./views/AddResort";
import Login from "./views/Login";

import apiClient from "./services/resorts";

function AnonRoute({ children, isLoggedIn, ...rest }) {
  console.log("isLoggedIn");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/resorts",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
// <PrivateRoute exact path={"/resorts/add"} isLoggedIn={isLoggedIn} component={AddResort} />
function PrivateRoute({ component: Comp, isLoggedIn, ...rest }) {
  console.log({ ...rest });
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isLoading: true,
  };

  componentDidMount() {
    apiClient
      .whoami()
      .then((user) => {
        this.setState({
          isLoading: false,
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          isLoggedIn: false,
          user: null,
        });
      });
  }

  handleLogin = ({ username, password }) => {
    apiClient
      .login({ username, password })
      .then(({ data: user }) => {
        this.setState({
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        this.setState({
          isLoggedIn: false,
          user: null,
        });
      });
  };

  render() {
    const { isLoggedIn, isLoading } = this.state;
    return (
      <div>
        {isLoading && <div> Loading.......</div>}
        {!isLoading && (
          <div className="App">
            <Switch>
              <AnonRoute exact path={"/login"} isLoggedIn={isLoggedIn}>
                <Login onLogin={this.handleLogin} />
              </AnonRoute>
              <PrivateRoute
                exact
                path={"/resorts"}
                isLoggedIn={isLoggedIn}
                component={Resorts}
              />
              <PrivateRoute
                exact
                path={"/resorts/add"}
                isLoggedIn={isLoggedIn}
                component={AddResort}
              />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

export default App;

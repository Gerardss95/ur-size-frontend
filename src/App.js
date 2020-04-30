import React from "react";
import { Switch, Route } from "react-router-dom";

import Resorts from "./views/Resorts";
import AddResort from "./views/AddResort";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/resorts"} component={Resorts} />
        <Route exact path={"/resorts/add"} component={AddResort} />
      </Switch>
    </div>
  );
}

export default App;

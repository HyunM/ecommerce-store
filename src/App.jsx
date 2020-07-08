import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Details from "./routes/Details";
import Cart from "./routes/Cart";
import Default from "./routes/Default";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/cart" component={Cart} />
          <Route path="/product/:id" component={Details} />
          <Route component={Default} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;

import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Container from "./routes/Container";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfCart: 0,
    };

    this.updateNumberOfCart = this.updateNumberOfCart.bind(this);
  }

  updateNumberOfCart = number => {
    this.setState({ numberOfCart: number });
  };

  render() {
    debugger;
    return (
      <React.Fragment>
        <Navbar numberOfCart={this.state.numberOfCart} />
        <Container updateNumberOfCart={this.updateNumberOfCart} />
      </React.Fragment>
    );
  }
}

export default App;

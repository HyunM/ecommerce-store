import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Container from "./routes/Container";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Container />
      </React.Fragment>
    );
  }
}

export default App;

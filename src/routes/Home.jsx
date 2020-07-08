import React, { Component } from "react";
import Title from "../components/styled/Title";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Title name="our" title="products" />
        <h1>hello from home</h1>
      </div>
    );
  }
}

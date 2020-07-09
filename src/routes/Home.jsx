import React, { Component } from "react";
import Title from "../components/styled/Title";
import ProductList from "../components/ProductList";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Title name="Exbon" title="Materials" />
        <ProductList
          products={this.props.products}
          updateCurrentId={this.props.updateCurrentId}
          addToCart={this.props.addToCart}
        />
      </div>
    );
  }
}

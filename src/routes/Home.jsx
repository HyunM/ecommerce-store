import React, { Component } from "react";
import Title from "../components/styled/Title";
import ProductList from "../components/ProductList";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleDetail = this.handleDetail.bind(this);
  }

  handleDetail = () => {
    console.log("hello from handleDetail");
  };

  render() {
    return (
      <div>
        <Title name="our" title="products" />
        <h5>hello from home</h5>
        <ProductList
          products={this.props.products}
          handleDetail={this.handleDetail}
          setProducts={this.props.setProducts}
          updateCurrentId={this.props.updateCurrentId}
        />
      </div>
    );
  }
}

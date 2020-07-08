import React, { Component } from "react";
import Title from "../components/styled/Title";
import ProductList from "../components/ProductList";
import { storeProducts } from "../data";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: storeProducts,
      detailProduct: {},
    };
    this.handleDetail = this.handleDetail.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }
  handleDetail = () => {
    console.log("hello from handleDetail");
  };

  addToCart = () => {
    console.log("hello from addToCart");
  };
  render() {
    return (
      <div>
        <Title name="our" title="products" />
        <h1>hello from home</h1>
        <ProductList
          products={this.state.products}
          handleDetail={this.handleDetail}
        />
      </div>
    );
  }
}

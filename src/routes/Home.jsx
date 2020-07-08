import React, { Component } from "react";
import Title from "../components/styled/Title";
import ProductList from "../components/ProductList";
import { storeProducts } from "../data";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      detailProduct: {},
    };
    this.handleDetail = this.handleDetail.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.setProducts = this.setProducts.bind(this);
  }

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { products: tempProducts };
    });
  };

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
        <h5>hello from home</h5>
        <ProductList
          products={this.state.products}
          handleDetail={this.handleDetail}
          setProducts={this.setProducts}
        />
      </div>
    );
  }
}

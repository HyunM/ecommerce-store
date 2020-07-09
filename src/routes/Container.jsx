import React, { Component } from "react";
import Home from "./Home";
import Details from ".//Details";
import Cart from ".//Cart";
import Default from ".//Default";
import { Switch, Route } from "react-router-dom";
import { storeProducts } from "../data";

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      currentId: 0,
      detailObj: {},
    };
    this.addToCart = this.addToCart.bind(this);
    this.setProducts = this.setProducts.bind(this);
    this.updateCurrentId = this.updateCurrentId.bind(this);
  }

  updateCurrentId = id => {
    this.setState({
      currentId: id,
      detailObj: storeProducts.filter(item => item.id === id),
    });
  };

  addToCart = () => {
    console.log("hello from addToCart");
  };

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

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <Home
              products={this.state.products}
              setProducts={this.setProducts}
              updateCurrentId={this.updateCurrentId}
            />
          )}
        />
        <Route path="/cart" component={Cart} />
        {/* <Route path="/product/:id" component={Details} /> */}
        <Route
          path="/product/:id"
          render={props => (
            <Details
              addToCart={this.addToCart}
              detailObj={this.state.detailObj}
            />
          )}
        />
        <Route component={Default} />
      </Switch>
    );
  }
}

import React, { Component } from "react";
import Title from "../styled/Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import CartList from "./CartList";
import CartTotals from "./CartTotals";

export default class Cart extends Component {
  render() {
    let title = "";
    if (this.props.cart.length > 0) {
      title = (
        <React.Fragment>
          <Title name="your" title="cart" />
          <CartColumns />
          <CartList value={this.props} />
          <CartTotals value={this.props} />
        </React.Fragment>
      );
    } else {
      title = <EmptyCart />;
    }

    return <section>{title}</section>;
  }
}

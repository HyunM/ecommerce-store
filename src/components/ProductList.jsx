import React, { Component } from "react";
import Product from "./Product";

export default class ProductList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <div className="row">
              {this.props.products.map(product => {
                return (
                  <Product
                    key={product.id}
                    product={product}
                    updateCurrentId={this.props.updateCurrentId}
                    addToCart={this.props.addToCart}
                    openModal={this.props.openModal}
                    closeModal={this.props.closeModal}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

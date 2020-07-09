import React, { Component } from "react";
import Product from "./Product";

export default class ProductList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="py-5">
          {console.log(this.props.products)}
          <div className="container">
            {/* test */}

            <div className="row">
              {this.props.products.map(product => {
                return (
                  <Product
                    key={product.id}
                    product={product}
                    updateCurrentId={this.props.updateCurrentId}
                    addToCart={this.props.addToCart}
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

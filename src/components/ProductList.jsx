import React, { Component } from "react";
import Product from "./Product";

export default class ProductList extends Component {
  componentDidMount() {
    this.props.setProducts();
  }
  render() {
    this.props.handleDetail();

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

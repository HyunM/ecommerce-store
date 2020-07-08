import React, { Component } from "react";
import Product from "./Product";

export default class ProductList extends Component {
  render() {
    this.props.handleDetail();

    return (
      <React.Fragment>
        <div className="py-5">
          {console.log(this.props.products)}
          <div className="container">
            {/* test */}
            {this.props.products.map(product => {
              return <Product key={product.id} product={product} />;
            })}
            <div className="row"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

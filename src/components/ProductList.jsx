import React, { Component } from "react";
import Product from "./Product";

export default class ProductList extends Component {
  state = {
    filtered: this.props.products,
  };

  handleSearch = e => {
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = this.props.products;
      newList = currentList.filter(item => {
        const lc = item.title.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.props.products;
    }

    this.setState({
      filtered: newList,
    });
  };

  render() {
    debugger;
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <input
              type="text"
              className="input"
              placeholder="Search..."
              onChange={this.handleSearch.bind(this)}
            />

            <div className="row">
              {this.state.filtered.map(product => {
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

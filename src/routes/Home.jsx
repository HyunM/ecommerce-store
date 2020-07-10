import React, { Component } from "react";
import Title from "../components/styled/Title";
import ProductList from "../components/ProductList";
import ProductTable from "../components/ProductTable";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Title name="Exbon" title="Materials" />
        {this.props.formPage ? (
          <ProductList
            products={this.props.products}
            updateCurrentId={this.props.updateCurrentId}
            addToCart={this.props.addToCart}
            openModal={this.props.openModal}
            closeModal={this.props.closeModal}
          />
        ) : (
          <ProductTable products={this.props.products} />
        )}
      </div>
    );
  }
}

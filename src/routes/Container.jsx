import React, { Component } from "react";
import Home from "./Home";
import Details from ".//Details";
import Cart from ".//Cart";
import Default from ".//Default";
import { Switch, Route } from "react-router-dom";
import { storeProducts, detailProduct } from "../data";
import Modal from "../components/Modal";

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      currentId: 0,
      detailObj: {},
      cart: [],
      modalOpen: false,
      modalProduct: detailProduct,
    };
    this.addToCart = this.addToCart.bind(this);
    this.setProducts = this.setProducts.bind(this);
    this.updateCurrentId = this.updateCurrentId.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    debugger;
    this.setProducts();
  }

  updateCurrentId = id => {
    this.setState({
      currentId: id,
      detailObj: storeProducts.filter(item => item.id === id),
    });
  };

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;

    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, product] };
      },
      () => {
        console.log(this.state);
      }
    );
  };

  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
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
      <React.Fragment>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home
                products={this.state.products}
                setProducts={this.setProducts}
                updateCurrentId={this.updateCurrentId}
                addToCart={this.addToCart}
                openModal={this.openModal}
                closeModal={this.closeModal}
              />
            )}
          />
          <Route path="/cart" component={Cart} />
          <Route
            path="/product/:id"
            render={props => (
              <Details
                addToCart={this.addToCart}
                detailObj={this.state.detailObj}
                products={this.state.products}
                openModal={this.openModal}
                closeModal={this.closeModal}
              />
            )}
          />
          <Route component={Default} />
        </Switch>
        <Modal
          modalOpen={this.state.modalOpen}
          modalProduct={this.state.modalProduct}
          closeModal={this.closeModal}
        />
      </React.Fragment>
    );
  }
}

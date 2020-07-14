import React, { Component } from "react";
import Home from "./Home";
import Details from ".//Details";
import Cart from "../components/Cart/Cart";
import Default from ".//Default";
import { Switch, Route } from "react-router-dom";
import { storeProducts, detailProduct } from "../data";
import Modal from "../components/Modal";

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: storeProducts,
      currentId: 0,
      detailObj: {},
      cart: [],
      modalOpen: false,
      modalProduct: detailProduct,
      cartSubTotal: 0,
      cartTax: 0,
      cartTotal: 0,
      formPage: true,
    };
    this.addToCart = this.addToCart.bind(this);
    this.setProducts = this.setProducts.bind(this);
    this.updateCurrentId = this.updateCurrentId.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.clearCart = this.clearCart.bind(this);
    this.flipFormPage = this.flipFormPage.bind(this);
  }

  componentDidMount() {
    this.setProducts();
  }

  flipFormPage = form => {
    this.setState({ formPage: form });
  };

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
        this.addTotals();
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

  increment = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count + 1;
    product.total = product.count * product.price;

    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.addTotals();
      }
    );
  };

  decrement = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };

  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id !== id);

    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts],
        };
      },
      () => {
        this.addTotals();
      }
    );
  };

  clearCart = () => {
    this.setState(
      () => {
        return {
          cart: [],
        };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total,
      };
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
                updateCurrentId={this.updateCurrentId}
                addToCart={this.addToCart}
                openModal={this.openModal}
                closeModal={this.closeModal}
                formPage={this.state.formPage}
                flipFormPage={this.flipFormPage}
              />
            )}
          />
          <Route
            path="/cart"
            render={props => (
              <Cart
                cart={this.state.cart}
                cartSubTotal={this.state.cartSubTotal}
                cartTotal={this.state.cartTotal}
                cartTax={this.state.cartTax}
                increment={this.increment}
                decrement={this.decrement}
                removeItem={this.removeItem}
                clearCart={this.clearCart}
              />
            )}
          />
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

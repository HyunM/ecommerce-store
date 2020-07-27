import React, { Component } from "react";
import Home from "./Home";
import Details from ".//Details";
import Cart from "../components/Cart/Cart";
import Default from ".//Default";
import { Switch, Route } from "react-router-dom";
import { storeProducts, detailProduct } from "../data";
import Modal from "../components/Modal";
import AddModal from "../components/AddModal";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import Schedule from "./Schedule";
import Cookies from "universal-cookie";
import NotificationButton from "../components/styled/NotificationButton";
import ProductChart from "./ProductChart";

let cookies = new Cookies();
console.log(cookies.get("myCart"));

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: storeProducts,
      currentId: 0,
      detailObj: {},
      cart: [],
      modalOpen: false,
      addModalOpen: false,
      deleteModalOpen: false,

      modalProduct: detailProduct,
      deleteModalProduct: {},
      cartSubTotal: 0,
      cartTax: 0,
      cartTotal: 0,
      formPage: true,
      success: false,
      error: false,
      warning: false,
      info: false,
      none: false,
    };
    this.addToCart = this.addToCart.bind(this);
    // this.setProducts = this.setProducts.bind(this);

    this.updateCurrentId = this.updateCurrentId.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.clearCart = this.clearCart.bind(this);
    this.flipFormPage = this.flipFormPage.bind(this);
    this.openAddModal = this.openAddModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.initializeCart = this.initializeCart.bind(this);
  }

  initializeCart = () => {
    if (cookies.get("myCart") === undefined) {
      return [];
    } else {
      let strCookie = cookies.get("myCart");
      let arrCookie = strCookie.split(","); //[...id-number]

      let tempCartObj = [];
      for (let i = 0; i < arrCookie.length; i++) {
        let tempId = parseInt(arrCookie[i].split("-")[0]);
        let tempCount = parseInt(arrCookie[i].split("-")[1]);
        let tempObj = { id: tempId, count: tempCount };
        tempCartObj = [...tempCartObj, tempObj];
      }

      //now TempCartObj = object of cart (id, count)

      let tempProducts = [...this.state.products];
      let tempCart = [];
      for (let i = 0; i < tempProducts.length; i++) {
        for (let j = 0; j < tempCartObj.length; j++) {
          if (tempProducts[i].id === tempCartObj[j].id) {
            tempProducts[i].inCart = true;
            tempProducts[i].count = tempCartObj[j].count;
            tempProducts[i].total =
              tempProducts[i].price * tempProducts[i].count;
            tempCart.push(tempProducts[i]);
          }
        }
      }

      this.setState(
        () => {
          this.props.updateNumberOfCart(tempCart.length);
          return { products: tempProducts, cart: tempCart };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };

  componentDidMount() {
    this.initializeCart();
  }

  componentDidUpdate() {
    let cartArr = this.state.cart.map(data => data.id + "-" + data.count);
    let cartCookie = cartArr.toString();
    cookies.set("myCart", cartCookie, { path: "/", maxAge: 10 * 60 });
  }

  flipFormPage = form => {
    this.setState({ formPage: form });
  };

  updateCurrentId = id => {
    this.setState(() => {
      return {
        currentId: id,
        detailObj: this.state.products.filter(item => item.id === id),
      };
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
        this.props.updateNumberOfCart(this.state.cart.length);
        this.onToggle("success");
        setTimeout(() => {
          this.onToggle("success");
        }, 2500);
      }
    );
  };

  addProduct = (title, company, info, department, price, minStock, inStock) => {
    let tempProducts = [...this.state.products];
    const item = {
      id: Math.floor(Math.random() * 10000),
      inCart: false,
      count: 0,
      total: 0,
      isDeleted: 0,
      title,
      company,
      info,
      department,
      price,
      minStock,
      inStock,
      img: "img/product-100.png",
    };
    console.log(item);
    tempProducts.push(item);
    this.setState(
      () => {
        return { products: tempProducts };
      },
      () => {
        this.addTotals();
        this.onToggle("success");
        setTimeout(() => {
          this.onToggle("success");
        }, 2500);
      }
    );
  };

  deleteProduct = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.isDeleted = 1;
    this.setState(
      () => {
        return { products: tempProducts };
      },
      () => {
        this.onToggle("info");
        setTimeout(() => {
          this.onToggle("info");
        }, 2500);
      }
    );
  };

  editProduct = (
    id,
    title,
    company,
    info,
    department,
    price,
    minStock,
    inStock
  ) => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.title = title;
    product.company = company;
    product.info = info;
    product.department = department;
    product.price = price;
    product.minStock = minStock;
    product.inStock = inStock;
    this.setState(
      () => {
        return { products: tempProducts };
      },
      () => {
        this.onToggle("warning");
        setTimeout(() => {
          this.onToggle("warning");
        }, 2500);
      }
    );
  };

  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  openAddModal = () => {
    this.setState(() => {
      return { addModalOpen: true };
    });
  };

  openDeleteModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { deleteModalProduct: product, deleteModalOpen: true };
    });
  };

  openEditModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { editModalProduct: product, editModalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  closeAddModal = () => {
    this.setState(() => {
      return { addModalOpen: false };
    });
  };

  closeDeleteModal = () => {
    this.setState(() => {
      return { deleteModalOpen: false };
    });
  };

  closeEditModal = () => {
    this.setState(() => {
      return { editModalOpen: false };
    });
  };

  // setProducts = () => {
  //   let tempProducts = [];
  //   storeProducts.forEach(item => {
  //     const singleItem = { ...item };
  //     tempProducts = [...tempProducts, singleItem];
  //   });
  //   this.setState(() => {
  //     return { products: tempProducts };
  //   });
  // };

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
        this.props.updateNumberOfCart(this.state.cart.length);
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
      this.props.updateNumberOfCart(this.state.cart.length);
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
        this.props.updateNumberOfCart(this.state.cart.length);
        this.onToggle("info");
        setTimeout(() => {
          this.onToggle("info");
        }, 2500);
      }
    );
  };

  clearCart = () => {
    let tempProducts = [...this.state.products];
    let inCartProducts = tempProducts.filter(data => data.inCart === true);
    inCartProducts.forEach(data => (data.inCart = false));

    this.setState(
      () => {
        return {
          products: tempProducts,
          cart: [],
        };
      },
      () => {
        // this.setProducts();
        this.addTotals();
        this.props.updateNumberOfCart(0);
        this.onToggle("info");
        setTimeout(() => {
          this.onToggle("info");
        }, 2500);
      }
    );
  };

  // clearCart = () => {
  //   this.setState(
  //     () => {
  //       return {
  //         cart: [],
  //       };
  //     },
  //     () => {
  //       this.setProducts();
  //       this.addTotals();
  //     }
  //   );
  // };

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += parseFloat(item.total)));
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

  onToggle = flag => this.setState({ [flag]: !this.state[flag] });

  render() {
    const { success, error, warning, info, none } = this.state;
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
                openAddModal={this.openAddModal}
                openDeleteModal={this.openDeleteModal}
                openEditModal={this.openEditModal}
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
            path="/chart"
            render={props => <ProductChart products={this.state.products} />}
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
          <Route
            path="/schedule"
            render={props => <Schedule products={this.state.products} />}
          />
          <Route component={Default} />
        </Switch>
        <Modal
          modalOpen={this.state.modalOpen}
          modalProduct={this.state.modalProduct}
          closeModal={this.closeModal}
        />
        <AddModal
          addModalOpen={this.state.addModalOpen}
          closeAddModal={this.closeAddModal}
          addProduct={this.addProduct}
          onToggle={this.onToggle.bind(this)}
        />
        <DeleteModal
          deleteModalOpen={this.state.deleteModalOpen}
          closeDeleteModal={this.closeDeleteModal}
          deleteProduct={this.deleteProduct}
          deleteModalProduct={this.state.deleteModalProduct}
        />
        <EditModal
          editModalOpen={this.state.editModalOpen}
          closeEditModal={this.closeEditModal}
          editProduct={this.editProduct}
          editModalProduct={this.state.editModalProduct}
        />
        <NotificationButton
          onToggle={this.onToggle}
          success={success}
          error={error}
          warning={warning}
          info={info}
          none={none}
        />
      </React.Fragment>
    );
  }
}

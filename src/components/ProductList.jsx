import React, { Component } from "react";
import Product from "./Product";
import { TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Search } from "@material-ui/icons/";

export default class ProductList extends Component {
  state = {
    filtered: this.props.products.filter(data => data.isDeleted !== 1),
  };

  handleSearch = e => {
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = this.props.products.filter(data => data.isDeleted !== 1);
      newList = currentList.filter(item => {
        const lc = item.title.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.props.products.filter(data => data.isDeleted !== 1);
    }

    this.setState(() => {
      return { filtered: newList };
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <TextField
              type="text"
              className="input"
              placeholder=""
              onChange={this.handleSearch.bind(this)}
              label="Search"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
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

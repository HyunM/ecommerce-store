import React, { Component } from "react";
import Title from "../components/styled/Title";
import ProductList from "../components/ProductList";
import ProductTable from "../components/ProductTable";
import PhotoIcon from "@material-ui/icons/Photo";
import ViewListIcon from "@material-ui/icons/ViewList";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.onFlipFormPageFromPhoto = this.onFlipFormPageFromPhoto.bind(this);
    this.onFlipFormPageFromBoard = this.onFlipFormPageFromBoard.bind(this);
  }

  onFlipFormPageFromPhoto = () => {
    this.props.flipFormPage(true);
  };
  onFlipFormPageFromBoard = () => {
    this.props.flipFormPage(false);
  };

  render() {
    return (
      <div>
        <Title name="Materials" title="Management System" />
        <div>
          <PhotoIcon
            className="MuiSvgIcon-fontSizeLarge ml-80p MuiSvgIcon-colorPrimary cp"
            onClick={() => this.onFlipFormPageFromPhoto()}
          />
          <ViewListIcon
            className="MuiSvgIcon-fontSizeLarge MuiSvgIcon-colorPrimary cp"
            onClick={() => this.onFlipFormPageFromBoard()}
          />
        </div>
        {this.props.formPage ? (
          <ProductList
            products={this.props.products}
            updateCurrentId={this.props.updateCurrentId}
            addToCart={this.props.addToCart}
            openModal={this.props.openModal}
            closeModal={this.props.closeModal}
          />
        ) : (
          <ProductTable
            products={this.props.products}
            addToCart={this.props.addToCart}
            openModal={this.props.openModal}
            closeModal={this.props.closeModal}
          />
        )}
      </div>
    );
  }
}

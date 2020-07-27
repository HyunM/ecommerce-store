import React, { Component } from "react";
import Title from "../components/styled/Title";
import ProductList from "../components/ProductList";
import ProductTable from "../components/ProductTable";
import PhotoIcon from "@material-ui/icons/Photo";
import ViewListIcon from "@material-ui/icons/ViewList";
import AddBoxIcon from "@material-ui/icons/AddBox";
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
          <div
            className="ml-auto MuiSvgIcon-colorPrimary cp fl"
            onClick={this.props.openAddModal}
          >
            <AddBoxIcon className="MuiSvgIcon-fontSizeLarge ml-5 MuiSvgIcon-colorPrimary cp fl" />
            <p className="fl mt-5px">ADD</p>
          </div>
          <div>
            <PhotoIcon
              className="MuiSvgIcon-fontSizeLarge ml-80p MuiSvgIcon-colorPrimary cp"
              onClick={() => this.onFlipFormPageFromPhoto()}
            />
            <ViewListIcon
              className="MuiSvgIcon-fontSizeLarge MuiSvgIcon-colorPrimary cp table-icon"
              onClick={() => this.onFlipFormPageFromBoard()}
            />
          </div>
        </div>
        {this.props.formPage ? (
          <ProductList
            products={this.props.products.filter(data => data.isDeleted !== 1)}
            updateCurrentId={this.props.updateCurrentId}
            addToCart={this.props.addToCart}
            openModal={this.props.openModal}
            closeModal={this.props.closeModal}
          />
        ) : (
          <ProductTable
            products={this.props.products.filter(data => data.isDeleted !== 1)}
            addToCart={this.props.addToCart}
            openModal={this.props.openModal}
            openDeleteModal={this.props.openDeleteModal}
            openEditModal={this.props.openEditModal}
            closeModal={this.props.closeModal}
            updateCurrentId={this.props.updateCurrentId}
          />
        )}
      </div>
    );
  }
}

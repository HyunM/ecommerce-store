import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default class Product extends Component {
  render() {
    const { id, title, img, price, inCart } = this.props.product;

    return (
      <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
        <div className="card">
          <div
            className="img-container p-5"
            onClick={() => console.log("you clicked me")}
          >
            <Link to="/details">
              <img src={img} alt={title} className="card-img-top" />
            </Link>
            <button className="cart-btn" disabled={inCart ? true : false}>
              {inCart ? (
                <p className="text-capitalize mb-0" disabled>
                  in cart
                </p>
              ) : (
                <i className="fas fa-cart-plus" />
              )}
            </button>
          </div>
        </div>

        {/* <h2>
          {id} {title} {price}
        </h2> */}
      </ProductWrapper>
    );
  }
}

const ProductWrapper = styled.div``;

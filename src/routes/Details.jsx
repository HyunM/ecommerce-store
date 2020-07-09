import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ButtonContainer } from "../components/styled/Button";

export default class Details extends Component {
  render() {
    const { location } = this.props;
    console.log(location.state.id);
    return (
      <div className="container py-5">
        {/* title */}
        <div className="row">
          <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
            <h1>{location.state.title}</h1>
          </div>
        </div>
        {/* end title */}

        {/* product info */}
        <div className="row">
          <div className="col-10 mx-auto col-md-6 my-3 ">
            <img
              src={`../` + location.state.img}
              alt={location.state.title}
              className="img-fluid"
            />
          </div>
          {/* product text */}
          <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
            <h2>model : {location.state.title}</h2>
            <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
              made by :{" "}
              <span className="text-uppercase">{location.state.company}</span>
            </h4>
            <h4 className="text-blue">
              <strong>
                price : <span> $ </span>
                {location.state.price}
              </strong>
            </h4>
            <p className="text-capitalize font-weight-bold mt-3 mb-0">
              some info about product :{" "}
            </p>
            <p className="text-muted lead">{location.state.info}</p>
            {/* buttons */}
            <div>
              <Link to="/">
                <ButtonContainer>back to products</ButtonContainer>
              </Link>
              <ButtonContainer
                disabled={location.state.inCart ? true : false}
                onClick={() => {
                  location.state.addToCart(location.state.id);
                }}
              >
                {location.state.inCart ? "inCart" : "add to cart"}
              </ButtonContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

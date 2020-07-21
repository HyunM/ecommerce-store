import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../MMSlogo.png";
import styled from "styled-components";
import { ButtonContainer } from "./styled/Button";

export default class Navbar extends Component {
  render() {
    return (
      <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
        {/* https://www.iconfinder.com/icons/1243689/call_phone_icon
            Creative Commons (Attribution 3.0 Unported);
            https://www.iconfinder.com/Makoto_msk */}
        <Link to="/">
          <img src={logo} width="80px" alt="store" className="navbar-brand" />
        </Link>
        <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5">
            <Link to="/" className="nav-link">
              <p className="nav-item my-0">products</p>
            </Link>
          </li>
          <li className="nav-item ml-5">
            <Link to="/schedule" className="nav-link">
              <p className="nav-item my-0">schedule</p>
            </Link>
          </li>
          <li className="nav-item ml-5">
            <Link to="/chart" className="nav-link">
              <p className="nav-item my-0">chart</p>
            </Link>
          </li>
        </ul>
        <Link to="/cart" className="ml-auto">
          <ButtonContainer className="navCart">
            <span className="mr-2 navCart">
              <i className="fas fa-cart-plus">
                Cart({this.props.numberOfCart})
              </i>
            </span>
          </ButtonContainer>
        </Link>
      </NavWrapper>
    );
  }
}

const NavWrapper = styled.nav`
  background: var(--lightBlue);
  .nav-link {
    color: var(--mainWhite);
    font-size: 1.3rem;
    text-transform: capitalize;
  }
  .nav-link :hover {
    color: var(--mainBlue) !important;
  }
  .nav-item {
    color: var(--mainWhite) !important;
  }
  .nav-color:hover {
    color: var(--mainBlue) !important;
  }
`;

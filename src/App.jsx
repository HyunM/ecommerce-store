import React, { Component } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Container from "./routes/Container";
import { Login, Register } from "./components/Login/index";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfCart: 0,
      isLogginActive: true,
      isLogginComplete: false,
      user: [],
    };

    this.updateNumberOfCart = this.updateNumberOfCart.bind(this);
    this.registerMember = this.registerMember.bind(this);
    this.loginMember = this.loginMember.bind(this);
  }

  registerMember = (username, email, password) => {
    let tempUser = [
      ...this.state.user,
      {
        username,
        email,
        password,
      },
    ];

    this.setState({ user: tempUser });
  };

  loginMember = (username, password) => {
    for (let i = 0; i < this.state.user.length; i++) {
      if (
        username === this.state.user[i].username &&
        password === this.state.user[i].password
      ) {
        this.setState({ isLogginComplete: true });
      }
    }
  };

  changeState() {
    const { isLogginActive } = this.state;
    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }

    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  updateNumberOfCart = number => {
    this.setState(() => {
      return { numberOfCart: number };
    });
  };

  render() {
    const { isLogginActive } = this.state;
    const { isLogginComplete } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    return (
      <React.Fragment>
        {!isLogginComplete && (
          <div className="login">
            <div className="container">
              {isLogginActive && (
                <Login
                  containerRef={ref => (this.current = ref)}
                  loginMember={this.loginMember}
                />
              )}
              {!isLogginActive && (
                <Register
                  containerRef={ref => (this.current = ref)}
                  registerMember={this.registerMember}
                  changeState={this.changeState.bind(this)}
                />
              )}
            </div>
            <RightSide
              current={current}
              containerRef={ref => (this.rightSide = ref)}
              onClick={this.changeState.bind(this)}
            />
          </div>
        )}

        {isLogginComplete && (
          <>
            <Navbar numberOfCart={this.state.numberOfCart} />
            <Container updateNumberOfCart={this.updateNumberOfCart} />
          </>
        )}
      </React.Fragment>
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side right"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default App;

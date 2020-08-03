import React from "react";
import loginImg from "./login.svg";

export class Login extends React.Component {
  handleLoginMember = () => {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    this.props.loginMember(username, password);
  };

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="loginImage" />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="login-username"
                type="text"
                name="username"
                placeholder="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="login-password"
                type="password"
                name="password"
                placeholder="password"
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button
            type="button"
            className="btn"
            onClick={this.handleLoginMember}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

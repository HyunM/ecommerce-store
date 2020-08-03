import React from "react";
import loginImg from "./login.svg";

export class Register extends React.Component {
  handleRegisterMember = () => {
    let username = document.getElementById("register-username").value;
    let email = document.getElementById("register-email").value;

    let password = document.getElementById("register-password").value;
    const bcrypt = require("bcryptjs");
    let salt = bcrypt.genSaltSync(12);
    const saltVar = "$2a$12$y6254yFRwZ3dmh59nOkcu.";

    let hashWoSalt = bcrypt.hashSync(password, saltVar);
    let hash = bcrypt.hashSync(password, salt);

    let salt2 = bcrypt.genSaltSync(12);
    let hashWoSalt2 = bcrypt.hashSync(password, saltVar);
    let hash2 = bcrypt.hashSync(password, salt2);

    this.props.registerMember(username, email, hash);
    console.log("----------First Create Password----------");
    console.log("Password : " + password);
    console.log("Password Hashing : " + hashWoSalt);
    console.log("Salted Password Hashing : " + hash);

    console.log(" ");
    console.log("----------Second Create Password----------");
    console.log("Password : " + password);
    console.log("Password Hashing : " + hashWoSalt2);
    console.log("Salted Password Hashing : " + hash2);

    this.props.changeState();
  };

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="loginImage" />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="register-username"
                type="text"
                name="username"
                placeholder="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="register-email"
                type="email"
                name="email"
                placeholder="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="register-password"
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
            onClick={this.handleRegisterMember}
          >
            Register
          </button>
        </div>
      </div>
    );
  }
}

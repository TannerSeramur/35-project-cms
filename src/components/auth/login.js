import superagent from "superagent";
import querystring from "querystring";
import React from "react";
import { LoginContext } from "./context.js";

import '../../styles/login.scss';

// const API = 'http://localhost:3000';
const API = "https://javascript-401-api.herokuapp.com";

const If = props => {
  return !!props.condition ? props.children : null;
};

class Login extends React.Component {
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e, loginMethodFromContext) => {
    e.preventDefault();
    superagent
      .post(`${API}/signin`)
      .auth(this.state.username, this.state.password)
      .then(response => {
        let token = response.text;
        loginMethodFromContext(token);
      })
      .catch(console.error);
  };

  logout = (e, logoutMethodFromProvider) => {
    logoutMethodFromProvider();
  };

  googleURL = () => {
    let googleURL = "https://accounts.google.com/o/oauth2/v2/auth";

    let options = {
      client_id:
        "560654039720-5kmgrmq63ctu07hb8e973t589jio17qf.apps.googleusercontent.com",
      redirect_uri: "http://localhost:3000/oauth",
      scope: "email openid profile",
      prompt: "consent",
      response_type: "code"
    };

    let QueryString = querystring.stringify(options);

    return `${googleURL}?${QueryString}`;
  };

  render() {
    let authURL = null; //this.googleURL();

    return (
      <LoginContext.Consumer>
        {context => {
          console.log("CTX", context);
          return (
            <div>
              <If condition={context.loggedIn}>
                <button className='logout-btn' onClick={e => this.logout(e, context.logout)}>
                  Log Out
                </button>
              </If>
              <If condition={!context.loggedIn}>
                <div className="form">
                  <form onSubmit={e => this.handleSubmit(e, context.login)}>
                    <h1>Login</h1>
                    <div className='inputs'>
                      <input
                        placeholder="username"
                        name="username"
                        onChange={this.handleChange}
                      />
                      <input
                        placeholder="password"
                        name="password"
                        type="password"
                        onChange={this.handleChange}
                      />
                      <input className='btn' type="submit" value="login" />
                    </div>
                  </form>
                  <If condition={authURL}>
                    <a href={authURL}>Authorize with Google</a>
                  </If>
                </div>
              </If>

            </div>
          );
        }}
      </LoginContext.Consumer>
    );
  }
}

export default Login;

import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from "material-ui/TextField";
import { connect } from "react-redux"
import {authUser} from '../../actions/auth'
import './auth.css'

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: null,
      password: null
    };
  }

  refreshLogin = event => {
    this.setState({
      login: event.target.value
    });
  };

  refreshPassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  render() {
    return (
      <div className="auth">
        <div className="auth-header" />
        <div className="auth-body">
          <TextField
            hintText="Логин"
            floatingLabelText="Введите ваш логин"
            onChange={this.refreshLogin}
            className="auth_login"
            name="username"
            id="username"
          />
          <TextField
            hintText="Пароль"
            floatingLabelText="Введите ваш пароль"
            onChange={this.refreshPassword}
            className="auth_password"
            type="password"
            name="password"
            id="password"
          />
          <RaisedButton
            className="eventButton"
            label="Войти"
            primary={true}
            onClick={() => {
              this.auth();
            }}
          />
        </div>
        <div className="auth-footer" />
      </div>
    );
  }
  auth = () => {
    this.props.authUser(this.state.login, this.state.password);

    setTimeout(() => {
      if (localStorage.isAuth == "true") {
        this.props.history.push("/");
      }
    }, 2000);
  };
}

export default connect((state) => {
    return state
}, {
    authUser
})(Auth);
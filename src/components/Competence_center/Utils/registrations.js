import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { withRouter } from "react-router";
import classNames from "classnames";

class Registration extends Component {
  state = {
    login: null,
    password1: null,
    password2: null,
    email: null
  };

  render() {
    const { user } = this.props;

    const authClass = classNames({
      auth: true,
      competence_center__auth: true
    });

    return (
      <div className={authClass}>
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
            hintText="Почта"
            floatingLabelText="Введите вашу почту"
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
            className="auth_login"
            name="email"
            id="email"
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
          <TextField
            hintText="Подтвердите пароль"
            floatingLabelText="Подтвердите пароль"
            onChange={e => {this.setState({password2: e.target.value})}}
            className="auth_password"
            type="password"
            name="password2"
            id="password2"
          />
          <RaisedButton
            className="eventButton"
            label="Зарегистрироваться"
            primary={true}
            onClick={() => {
              this.register();
            }}
          />
        </div>
        <div className="auth-footer" />
      </div>
    );
  }

  refreshLogin = e => {
    this.setState({ login: e.target.value });
  };

  refreshPassword = e => {
    this.setState({ password1: e.target.value });
  };

  register = () => {
    this.props.register(
      this.state.login,
      this.state.email,
      this.state.password1,
      this.state.password2
    );
    setTimeout(() => {
      this.props.history.push("/competence_center/login/");
    }, 2000);
  };
}

export default withRouter(Registration);

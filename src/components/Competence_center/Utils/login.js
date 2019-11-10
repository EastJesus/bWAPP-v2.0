import React, {Component} from 'react'
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { withRouter } from "react-router";
import classNames from 'classnames'

class Login extends Component {

    state = {
      login: null,
      password: null
    }

    render() {
    
        const {user} = this.props

        const authClass = classNames({
          'auth': true,
          'competence_center__auth': true
        })

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
                onClick={() => {this.login()}}
              />
            </div>
            <div className="auth-footer" />
          </div>
        );
    }

  refreshLogin = (e) => {
    this.setState({login: e.target.value})
  }

  refreshPassword = (e) => {
    this.setState({password: e.target.value})
  }

  login = () => {
    this.props.login(this.state.login, this.state.password);
    setTimeout(() => {
      if(this.props.currentUser) {
        this.props.getUser(this.props.currentUser.username);
        this.props.history.push('/competence_center/courses/')
      }
    }, 2000)
  }

}

export default withRouter(Login)
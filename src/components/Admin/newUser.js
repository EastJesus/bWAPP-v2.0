import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import { connect } from "react-redux"

import TextField from "material-ui/TextField";
import Checkbox from 'material-ui/Checkbox';

import {addUser} from '../../actions/users'

var md5 = require('js-md5');

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      lastname: null,
      password: null,
      email: null,
      login: null,
      isAdmin: 0
    };
  }

  refreshName = event => {
    this.setState({
      name: event.target.value
    });
  };

  refreshLastname = e => {
    this.setState({
      lastname: e.target.value
    });
  };

  refreshPassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  refreshEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  refreshLogin = e => {
    this.setState({
      login: e.target.value
    });
  };

  addUser = () => {
    const user = {
      name: this.state.name,
      lastname: this.state.lastname,
      login: this.state.login,
      password: md5(this.state.password),
      email: this.state.email,
      isAdmin: this.state.isAdmin
    };
    this.props.addUser(user)
    setTimeout(() => {
      this.props.history.push('/sandbox/admin/allUsers')
    }, 2000)
  };

  render() {

    const styles = {
      checkbox: {
        marginBottom: 16,
        marginTop: 16 
      },
    };

    return (
      <div>
        <div className="userForm">
          <TextField
            hintText="Имя"
            floatingLabelText="Имя пользователя"
            onChange={this.refreshName}
          />
          <br />
          <TextField
            hintText="Фамилия"
            floatingLabelText="Фамилия пользователя"
            onChange={this.refreshLastname}
          />
          <br />
          <TextField
            hintText="Логин"
            floatingLabelText="Логин пользователя"
            type="text"
            onChange={this.refreshLogin}
          />
          <br />
          <TextField
            hintText="Пароль"
            floatingLabelText="Пароль пользователя"
            type="password"
            onChange={this.refreshPassword}
          />
          <br />
          <TextField
            hintText="Почта"
            floatingLabelText="Почта"
            type="email"
            onChange={this.refreshEmail}
          />
          <br />
          <Checkbox
            checked={this.state.isAdmin}
            onCheck={() => {this.handleIsAdminChange()}}
            label="Администратор"
            style={styles.checkbox}
          />
          <br />
          <RaisedButton
            label="Добавить пользователя"
            primary={true}
            onClick={() => {this.addUser()}}
          />
        </div>
      </div>
    );
  }

  handleIsAdminChange = () => {
    this.setState({isAdmin: !this.state.isAdmin});
  }
}

export default connect((state) => {
  return state
}, {
  addUser
})(NewUser);

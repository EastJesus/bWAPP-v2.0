import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";
import Swal from 'sweetalert2'

import TextField from "material-ui/TextField";

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      lastname: null,
      password: null,
      email: null,
      login: null
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
      password: this.state.password,
      email: this.state.email
    };
    axios
      .post(`http://localhost:8080/api/newUser`, { user: user })
      .then(function(response) {
        Swal.fire(
            '',
            'Пользователь успешно добавлен',
            'success'
        )
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
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
          <RaisedButton
            label="Добавить пользователя"
            primary={true}
            onClick={() => {this.addUser()}}
          />
        </div>
      </div>
    );
  }
}

export default NewUser;

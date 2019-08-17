import React, { Component } from "react";

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

import axios from "axios";

class Exp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSql: null,
      users: null
    };
  }

  refreshValue = event => {
    this.setState({
      inputSql: event.target.value
    });
  };

  getUser = () => {
    axios
      .get(`http://localhost:8080/api/getStaff/${this.state.inputSql}`)
      .then(res => {
        const users = res.data;
        this.setState({
          users: users
        });
        console.log(this.state.users);
      });
  };

  render() {
    return (
      <div className="injection__wrapper">
        {this.state.users && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn> ID </TableHeaderColumn>
                <TableHeaderColumn> Имя </TableHeaderColumn>
                <TableHeaderColumn> Фамилия </TableHeaderColumn>
                <TableHeaderColumn> Почта </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.state.users.map((user, index) => (
                <TableRow key={index}>
                  <TableRowColumn> {index} </TableRowColumn>
                  <TableRowColumn> {user.username} </TableRowColumn>
                  <TableRowColumn> {user.lastname} </TableRowColumn>
                  <TableRowColumn> {user.email} </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <TextField
          hintText="Введите имя сотрудника"
          floatingLabelText="Введите имя сотрудника"
          onChange={this.refreshValue}
          className="inputField"
        />
        <RaisedButton
          label="Найти"
          primary={true}
          onClick={this.getUser}
          className="viewStaff"
        />
        <RaisedButton
          label="Вывести всех сотрудников"
          primary={true}
          onClick={this.getAllUsers}
          className="viewStaff"
        />
      </div>
    );
  }
}

export default Exp
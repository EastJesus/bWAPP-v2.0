import React, { Component } from "react";

import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

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
    this.props.fetchOneUser(this.state.inputSql);
  };

  getAllUsers = () => {
    this.props.fetchUsers();
  };
  render() {
    return (
      <div className="injection__wrapper">
        {this.props.reducer.users && (
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
              {this.props.reducer.users.map((user, index) => (
                <TableRow key={index}>
                  <TableRowColumn> {index} </TableRowColumn>
                  <TableRowColumn> {user.name} </TableRowColumn>
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
      </div>
    );
  }
}

export default Exp

import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

import { fetchUsers, deleteUser } from "../../actions/users";

class AllUsers extends Component {
  render() {
    console.log("propes");
    console.log(this.props);
    const { users } = this.props.reducer;
    return (
      <div>
        {users && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn> ID </TableHeaderColumn>
                <TableHeaderColumn> Логин </TableHeaderColumn>
                <TableHeaderColumn> Имя </TableHeaderColumn>
                <TableHeaderColumn> Фамилия </TableHeaderColumn>
                <TableHeaderColumn> Почта </TableHeaderColumn>
                <TableHeaderColumn> Пароль </TableHeaderColumn>
                <TableHeaderColumn> Администратор </TableHeaderColumn>
                <TableHeaderColumn> </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users &&
                users.map((user, index) => (
                  <TableRow key={index}>
                    <TableRowColumn> {user.id} </TableRowColumn>
                    <TableRowColumn> {user.username} </TableRowColumn>
                    <TableRowColumn> {user.name} </TableRowColumn>
                    <TableRowColumn> {user.lastname} </TableRowColumn>
                    <TableRowColumn> {user.email} </TableRowColumn>
                    <TableRowColumn> {user.password} </TableRowColumn>
                    <TableRowColumn>
                      {" "}
                      {user.isAdmin ? "Да" : "Нет"}{" "}
                    </TableRowColumn>
                    <TableRowColumn>
                      <RaisedButton
                        label="Удалить"
                        secondary={true}
                        onClick={() => {
                          this.deleteUser(user);
                        }}
                      />
                    </TableRowColumn>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </div>
    );
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  deleteUser = user => {
    this.props.deleteUser(user);
  };
}

export default withRouter(
  connect(
    state => {
      return state;
    },
    {
      fetchUsers,
      deleteUser
    }
  )(AllUsers)
);

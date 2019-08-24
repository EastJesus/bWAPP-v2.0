import React, { Component } from "react";
import { connect } from "react-redux";

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

import { fetchOneUser } from "../../../actions/users";

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
    this.props.fetchOneUser(this.state.inputSql)
  }

  render() {
    const {users} = this.props.reducer
    return (
      <div className="injection__wrapper">
        {users && (
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
              {users && users.map((user, index) => (
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

        <p>
          На странице эксплуатации нас ждет уже знакомый поиск по сотрудникам из
          категории A1: Инъекции. С помощью следующей инъекции мы может получить
          хэши паролей всех пользователей системы:
        </p>
        <pre class="prettyprint lang-sql">
            Andrey' UNION SELECT username, lastname, password FROM users WHERE '1' = '1
        </pre>
        <p>
          Далее мы можем попробовать расшифровать хэш, получив из него пароль,
          если для его создания использовалась слабая или стандартная
          хэш-функция.
        </p>
        <p>
          Для этого воспользуемся одним из многих сервисов, которые предлагают
          восстановить пароль по хэш-строке. Например,{" "}
          <a href="https://crackstation.net/" target="_blank">Crackstation</a>{" "}
        </p>
        <p>Попробуем восстановить хэш babc63d2509157e9ff8e108187ee47bb. Сервис с легкостью 
            выдает нам восстановленный пароль - Dog555. Как видим, в пароле 6 символом, заглавные
            и строчные символы, цифры. Это еще одно подтверждение тому, что пароль должен быть
            длинным и сложным, не менеее 10-12 символов, со вставкой специальных символов, а хэш
            должен формироваться с помощью стойких хэш-функций, а не встроенных утилит.
        </p>
      </div>
    );
  }
}

export default connect(
  state => {
    return state;
  },
  {
    fetchOneUser
  }
)(Exp)
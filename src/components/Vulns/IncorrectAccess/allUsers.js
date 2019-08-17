import React, { Component } from "react";
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

class AllUsers extends Component {

    constructor(props){
        super(props);
        this.state = {
            users: null
        }
    }

    deleteUser = (id) => {
        axios.post(`http://localhost:8080/api/deleteUser/${id}`)
        .then(res => {
            console.log(res)
            console.log(id)
        })
        this.getAllUsers()
    }

    getAllUsers = () => {
        axios.get(`http://localhost:8080/api/adminGetUsers`)
        .then(res => {
            const users = res.data;
            console.log(res.data)
            this.setState({
                users: users
            });
            console.log(this.state.users)
        })
    }

    render() {
        return (
            <div>
                {this.state.users && 
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHeaderColumn> ID </TableHeaderColumn>
                                        <TableHeaderColumn> Имя </TableHeaderColumn>
                                        <TableHeaderColumn> Фамилия </TableHeaderColumn>
                                        <TableHeaderColumn> Почта </TableHeaderColumn>
                                        <TableHeaderColumn> Пароль </TableHeaderColumn>
                                        <TableHeaderColumn> Дата Создания </TableHeaderColumn>
                                        <TableHeaderColumn> </TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {this.state.users.map((user, index) => (
                                        <TableRow key={index}>
                                            <TableRowColumn> {user.id} </TableRowColumn>
                                            <TableRowColumn> {user.username} </TableRowColumn>
                                            <TableRowColumn> {user.lastname} </TableRowColumn>
                                            <TableRowColumn> {user.email} </TableRowColumn>
                                            <TableRowColumn> {user.password} </TableRowColumn>
                                            <TableRowColumn> {user.timestamp} </TableRowColumn>
                                            <TableRowColumn> 
                                                <RaisedButton label="Удалить" secondary={true} onClick={ () => {this.deleteUser(user.id)}}/>
                                            </TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        }
            </div>
        )
    }

    componentWillMount() {
        this.getAllUsers()
    }
}

export default AllUsers
import React, { Component } from "react";
import RaisedButton from 'material-ui/RaisedButton';
import { Link, withRouter } from "react-router-dom";

import newUser from '../../images/newUser.png'
import allUsers from '../../images/allUsers.png'

import './admin.css'

class AdminPage extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="adminPage">
                <div className="page">
                    <Link to="/sandbox/admin/newUser">
                        <img src={newUser} alt="" />
                    </Link>    
                    <Link to="/sandbox/admin/newUser">
                        <RaisedButton label="Добавить пользователя" primary={true} />
                    </Link>    
                </div>
                <div className="page">
                    <Link to="/sandbox/admin/allUsers">
                        <img src={allUsers} alt="" />
                    </Link>
                    <Link to="/sandbox/admin/allUsers">
                        <RaisedButton label="Просмотреть всех пользователей" 
                                  secondary={true}
                        />
                    </Link>    
                </div>
            </div>
        )
    }
} 

export default withRouter((AdminPage))
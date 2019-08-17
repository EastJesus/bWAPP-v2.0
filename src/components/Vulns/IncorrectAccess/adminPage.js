import React, { Component } from "react";
import RaisedButton from 'material-ui/RaisedButton';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux"

import newUser from '../../../images/newUser.png'
import allUsers from '../../../images/allUsers.png'

import './incorrectAccess.css'

class AdminPage extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="adminPage">
                <div className="page">
                    <Link to="admin/newUser">
                        <img src={newUser} alt="" />
                    </Link>    
                    <Link to="admin/newUser">
                        <RaisedButton label="Добавить пользователя" primary={true} />
                    </Link>    
                </div>
                <div className="page">
                    <Link to="allUsers">
                        <img src={allUsers} alt="" />
                    </Link>
                    <Link to="allUsers">
                        <RaisedButton label="Просмотреть всех пользователей" 
                                  secondary={true}
                        />
                    </Link>    
                </div>
            </div>
        )
    }

    componentDidMount() {
        console.log('props')
        console.log(this.props)
    }
    componentWillReceiveProps() {
        console.log('props')
        console.log(this.props)
    }
} 

const mapStateToProps = state => ({
    isAdmin: state.authInfo.isAdmin
})

export default withRouter(connect(mapStateToProps)(AdminPage))
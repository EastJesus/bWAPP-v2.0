import React, { Component } from "react";
import {connect} from 'react-redux'
import AdminPage from './adminPage'
import { withRouter } from "react-router-dom";

class ProtectedAdminPage extends Component {
    render() {
        console.log('propesi admin')
        console.log(this.props)
        if(localStorage.isAuth == "true" && localStorage.isAdmin == "1") {
            return (<AdminPage />)
        } else {
            return (
                <>
                {this.props.history.push('/auth')}
                </>
            )
        }
    }
}

export default withRouter(connect((state) => {
    return state
}, {})(ProtectedAdminPage))
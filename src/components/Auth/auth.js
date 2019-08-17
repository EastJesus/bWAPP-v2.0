import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from "material-ui/TextField";
import axios from 'axios';
import Swal from 'sweetalert2'
import { connect } from "react-redux"
import activateSaga from '../../actions/sagas'
import './auth.css'

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: null,
            password: null
        };
    }

    auth = () => {
        
            axios.get(`http://localhost:8080/auth/${this.state.login}`)
            .then(res => {
                console.log('РЕЗУЛЬТАТЫ')
                console.log(res)
                const user = res.data[0];
                if(res.data.length > 0) {
                    if(this.state.password === user.password) {
                        this.props.activateAuth(true, this.state.login, user.isAdmin)
                        Swal.fire(
                        `Вы успешно авторизовались как ${this.state.login}`,
                        '',
                        'success'
                        )
                        setTimeout(() => {
                            this.props.history.push('/')
                        }, 1500);
                    }
                    else {
                        Swal.fire({
                            type: 'error',
                            title: 'Логин или пароль введены неверно'
                        })
                    }
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: 'Логин или пароль введены неверно'
                    })
                }
            })
    }


    refreshLogin = (event) => {
        this.setState({
            login: event.target.value
        })
    }

    refreshPassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    render() {
        return (
            <div className="auth">
                <div className="auth-header"></div>
                <div className="auth-body">
                    <TextField
                    hintText="Логин"
                    floatingLabelText="Введите ваш логин"
                    onChange={this.refreshLogin}
                    className="auth_login"
                    name="username"
                    id="username"
                    />
                    <TextField
                    hintText="Пароль"
                    floatingLabelText="Введите ваш пароль"
                    onChange={this.refreshPassword}
                    className="auth_password"
                    type="password"
                    name="password"
                    id="password"
                    />
                    <RaisedButton
                    className="eventButton"
                    label="Войти"
                    primary={true}
                    onClick={this.auth}
                    />
                </div>
                <div className="auth-footer"></div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuth: state.authInfo.isAuth,
    login: state.authInfo.login,
    isAdmin: state.authInfo.isAdmin
});
  
const mapDispatchToProps = dispatch => ({
    activateAuth: (isAuth, login, isAdmin) => {
        dispatch({type: 'ACTIVATE_REQUEST', isAuth, login, isAdmin}); 
    } 
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
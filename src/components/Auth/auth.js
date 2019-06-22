import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from "material-ui/TextField";
import axios from 'axios';
import Swal from 'sweetalert2'
import { connect } from "react-redux"
import activate from '../../actions/authAction'
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
                console.log(res)
                const user = res.data[0];
                if(res.data.length > 0) {
                    if(this.state.password === user.password) {
                        this.props.activateAuth(true, this.state.login)
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
                    />
                    <TextField
                    hintText="Пароль"
                    floatingLabelText="Введите ваш пароль"
                    onChange={this.refreshPassword}
                    className="auth_password"
                    type="password"
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
    login: state.authInfo.login
});
  
const mapDispatchToProps = dispatch => ({
    activateAuth: (isAuth, login) => {dispatch(activate(isAuth, login)); console.log(isAuth, login)} 
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
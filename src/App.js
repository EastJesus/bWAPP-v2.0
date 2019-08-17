import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

import XSS from './components/Vulns/XSS/xss';
import XSS_html from './components/Vulns/XSS/xss-html'
import Nav from './components/Header/nav';
import CSRF from './components/Vulns/CSRF/CSRF'
import Started from './components/started'
import SqlInjection from './components/Vulns/SQL/sql'
import Auth from './components/Auth/auth'
import InsecureAuth from './components/Vulns/InsecureAuth/InsecureAuth'
import ConfidentialData from './components/Vulns/ConfidentialData/confidentialData'
import IncorrectAccess from './components/Vulns/IncorrectAccess/IncorrectAccess'
import AdminPage from './components/Vulns/IncorrectAccess/adminPage'
import AllUsers from './components/Vulns/IncorrectAccess/allUsers'
import NewUser from './components/Vulns/IncorrectAccess/newUser'

import { connect } from "react-redux"
import activate from './actions/authAction'

class App extends Component {
  
  render() {

    return (
        <MuiThemeProvider>
          <Router>
            <Nav />
            <Switch>
              <div className="container">
                <Route exact path="/" component={Started} />
                <Route exact path="/XSS-Script/" component={XSS} />
                <Route exact path="/XSS-HTML/" component={XSS_html} />
                <Route exact path="/CSRF/" component={CSRF} />
                <Route exact path="/SQL_Injection" component={SqlInjection} />
                <Route exact path="/auth" component={Auth} />
                <Route exact path="/Insecure_Auth" component={InsecureAuth} />
                <Route exact path="/Confidential_Data" component={ConfidentialData} />
                <Route exact path="/Incorrect_Access" component={IncorrectAccess} />
                <Route exact path="/admin" component={AdminPage} />
                <Route exact path="/admin/allUsers" component={AllUsers} />
                <Route exact path="/admin/newUser" component={NewUser} />
              </div>
            </Switch>
            
          </Router>
        </MuiThemeProvider>
    )
  }
}
const mapStateToProps = state => ({
  isAuth: state.authInfo.isAuth,
  login: state.authInfo.login 
});

const mapDispatchToProps = dispatch => ({
  activateAuth: (isAuth) => {dispatch(activate(isAuth)); console.log(isAuth)}
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

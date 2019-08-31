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
import AllUsers from './components/Admin/allUsers'
import NewUser from './components/Admin/newUser'
import ProtectedAdminPage from './components/Admin/protectedAdminPage'
import IncorrectSecuritySettings from './components/Vulns/IncorrectSecuritySetting/IncorrectSecuritySetting'
import MonitoringDisadvantages from "./components/Vulns/MonitoringDisadvantages/MonitoringDisadvantages"
import {fetchUsers} from './actions/users'
import { connect } from "react-redux"

class App extends Component {
  
  render() {
    const storage = localStorage
    return (
      <MuiThemeProvider>
        <Router>
          <Nav storage={storage} />
          <Switch>
            <div className="container">
              <Route exact path="/" component={Started} />
              <Route exact path="/XSS-Script/" component={XSS} />
              <Route exact path="/XSS-HTML/" component={XSS_html} />
              <Route exact path="/CSRF/" component={CSRF} />
              <Route
                exact
                path="/SQL_Injection"
                component={SqlInjection}
                props={this.props}
              />
              <Route exact path="/auth" component={Auth} />
              <Route exact path="/Insecure_Auth" component={InsecureAuth} />
              <Route
                exact
                path="/Confidential_Data"
                component={ConfidentialData}
              />
              <Route
                exact
                path="/Incorrect_Access"
                component={IncorrectAccess}
              />
              <Route exact path="/admin" component={ProtectedAdminPage} />
              <Route exact path="/admin/allUsers" component={AllUsers} />
              <Route exact path="/admin/newUser" component={NewUser} />
              <Route
                exact
                path="/Incorrect_Security_Settings"
                component={IncorrectSecuritySettings}
              />
              <Route
                exact
                path="/Monitoring_Disadvantages"
                component={MonitoringDisadvantages}
              />
            </div>
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default connect((state) => {
  return state
}, {
  fetchUsers
})(App);

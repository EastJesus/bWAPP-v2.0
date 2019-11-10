import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

import CompetenceCenter from './components/Competence_center/index'
import Admin from './components/Competence_center/Admin/admin'
import Vulns from './components/Vulns/index'
import Started from './components/started'
import {fetchUsers} from './actions/users'
import { connect } from "react-redux"

class App extends Component {
  
  render() {
    
    return (
      <MuiThemeProvider>
        <Router>
          <Switch>
            <div className="container">
              <Route exact path="/" render={() => <Vulns {...this.props} />} />
              <Route
                path="/sandbox/"
                render={() => <Vulns {...this.props} />}
              />
              <Route
                path="/competence_center/"
                render={() => <CompetenceCenter {...this.props} />}
              />
              <Route 
                path="/cc/admin/"
                render={() => <Admin {...this.props} /> }
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

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './App.css';

import XSS from './components/Vulns/XSS/xss';
import XSS_html from './components/Vulns/XSS/xss-html'
import Nav from './components/Header/nav';
import CardE from './components/Vulns/CSRF/Card'
import Started from './components/started'
import SqlInjection from './components/Vulns/SQL/sql'

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
              <Route exact path="/CSRF/" component={CardE} />
              <Route path="/SqlInjection" component={SqlInjection} />
              <Route path="/SqlInjection/user/:name" component={SqlInjection} />
            </div>
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;

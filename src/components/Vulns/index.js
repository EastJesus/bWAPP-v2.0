import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import XSS from "./XSS/xss";
import XSS_html from "./XSS/xss-html";
import Nav from "./../Header/nav";
import CSRF from "./CSRF/CSRF";
import Started from "./../started";
import SqlInjection from "./SQL/sql";
import Auth from "./../Auth/auth";
import InsecureAuth from "./InsecureAuth/InsecureAuth";
import ConfidentialData from "./ConfidentialData/confidentialData";
import IncorrectAccess from "./IncorrectAccess/IncorrectAccess";
import AllUsers from "./../Admin/allUsers";
import NewUser from "./../Admin/newUser";
import ProtectedAdminPage from "./../Admin/protectedAdminPage";
import IncorrectSecuritySettings from "./IncorrectSecuritySetting/IncorrectSecuritySetting";
import MonitoringDisadvantages from "./MonitoringDisadvantages/MonitoringDisadvantages";
import ComponentsWithKnownVulns from "./ComponentsWithKnownVuln/ComponentsWithKnownVuln";
import XML from "./XML/XML";

class Vulns extends Component {
    render() {
        const storage = localStorage;
        return (
          <div>
            <Nav storage={storage} {...this.props} />
            <Switch>
              <Route exact path="/" component={Started} />
              <Route exact path="/sandbox/XSS-Script/" component={XSS} />
              <Route exact path="/sandbox/XSS-HTML/" component={XSS_html} />
              <Route exact path="/sandbox/CSRF/" component={CSRF} />
              <Route
                exact
                path="/sandbox/SQL_Injection"
                component={SqlInjection}
                props={this.props}
              />
              <Route exact path="/sandbox/auth" render={() => <Auth {...this.props} />} />
              <Route
                exact
                path="/sandbox/Insecure_Auth"
                component={InsecureAuth}
              />
              <Route
                exact
                path="/sandbox/Confidential_Data"
                component={ConfidentialData}
              />
              <Route
                exact
                path="/sandbox/Incorrect_Access"
                component={IncorrectAccess}
              />
              <Route
                exact
                path="/sandbox/admin"
                component={ProtectedAdminPage}
              />
              <Route
                exact
                path="/sandbox/admin/allUsers"
                component={AllUsers}
              />
              <Route exact path="/sandbox/admin/newUser" component={NewUser} />
              <Route
                exact
                path="/sandbox/Incorrect_Security_Settings"
                component={IncorrectSecuritySettings}
              />
              <Route
                exact
                path="/sandbox/Monitoring_Disadvantages"
                component={MonitoringDisadvantages}
              />
              <Route
                exact
                path="/sandbox/Components_With_Known_Vulns"
                component={ComponentsWithKnownVulns}
              />
              <Route exact path="/sandbox/XML" component={XML} />
            </Switch>
          </div>
        );
    }
}

export default Vulns
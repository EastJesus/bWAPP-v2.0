import React, {Component} from 'react'
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import ActionAssignment from "material-ui/svg-icons/action/assignment";
import { blue500, yellow600 } from "material-ui/styles/colors";
import EditorInsertChart from "material-ui/svg-icons/editor/insert-chart";
import Avatar from "material-ui/Avatar";
import { List, ListItem } from "material-ui/List";
import { PrivateRoute } from "../Utils/privateRoute";
import {
  logout,
  getUser,
  getMyInfo,
  getTestChart,
  getTestPieChart,
  getTestsResults
} from "../../../actions/competence_center";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import TestsResults from './TestsResults'
import Charts from './AdminCharts'
import CompetenceCenterNav from '../../Header/competence_center_nav'
import classNames from 'classnames'

class Admin extends Component {
  
  componentDidMount() {
    if (localStorage.token != "null") {
      this.props.getMyInfo();
    }
  }

  componentDidUpdate() {
    if(this.props.competenceCenterReducer.currentUser && !this.props.competenceCenterReducer.user) {
        this.props.getUser(this.props.competenceCenterReducer.currentUser.username)
      }
  }

  render() {
    const { user, ...props } = this.props.competenceCenterReducer;
    const adminPanel = classNames({
      main: true
    });

    return (
      <div className="adminPanel">
        <CompetenceCenterNav logout={this.props.logout} {...props} />
        <div className="adminPanel__main">
          <div className="navbar--vertical">
            <List>
              <Link to="/cc/admin/charts">
                <ListItem
                  leftAvatar={
                    <Avatar
                      icon={<EditorInsertChart />}
                      backgroundColor={yellow600}
                    />
                  }
                  primaryText="Информация"
                />
              </Link>
              <Link to="/cc/admin/tests_results">
                <ListItem
                  leftAvatar={
                    <Avatar
                      backgroundColor={blue500}
                      icon={<ActionAssignment />}
                    />
                  }
                  primaryText={`Результаты тестов`}
                />
              </Link>
            </List>
          </div>
          {user && user.groups.includes(2) && (
            <Switch>
              <Route exact path="/cc/admin/">
                <Redirect to="/cc/admin/charts" />
              </Route>
              <PrivateRoute
                exact
                path="/cc/admin/tests_results"
                render={() => (
                  <TestsResults
                    getTestsResults={this.props.getTestsResults}
                    {...props}
                  />
                )}
              />
              <PrivateRoute
                path="/cc/admin/charts"
                render={() => (
                  <Charts
                    getTestChart={this.props.getTestChart}
                    getTestPieChart={this.props.getTestPieChart}
                    {...props}
                  />
                )}
              />
            </Switch>
          )}
          {((user && !user.groups.includes(2)) || !user) && (
            <Switch>
              <PrivateRoute path="/cc/admin/">
                <Redirect to="/competence_center/access_denied/" />
              </PrivateRoute>
            </Switch>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    return state;
  },
  {
    logout,
    getUser,
    getMyInfo,
    getTestChart,
    getTestPieChart,
    getTestsResults
  }
)(Admin);
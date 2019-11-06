import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getCourses, getTests, getQueryTest, passTest, login, logout, getUser } from "../../actions/competence_center";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Courses from "./Course/Course";
import Tests from './Test/Test'
import TakeTest from './Test/TakeTest'
import Main from './main'
import './style.scss'
import CompetenceCenterNav from '../../components/Header/competence_center_nav'
import Login from './login'
const moduleName = '/competence_center'

class CompetenceCenter extends Component {

    componentDidMount() {
        this.props.getCourses()
        this.props.getTests()
    }

    render() {
        const {courses, match, ...props} = this.props.competenceCenterReducer
        
        return (
          <div className="competence_center">
            <Main {...props}>
              <ToastContainer />
              <CompetenceCenterNav logout={this.props.logout} {...props} />
              <Switch>
                <Route exact path="/competence_center/">
                  <Redirect to="/competence_center/courses/" />
                </Route>
                <Route
                  exact
                  path="/competence_center/courses/"
                  render={() => <Courses courses={courses} />}
                />
                <Route
                  exact
                  path={moduleName + "/login/"}
                  render={() => <Login login={this.props.login} history={this.props.history} {...props} />}
                />
                <Route
                  exact
                  path={moduleName + "/tests/"}
                  render={() => <Tests {...props} />}
                />
                <Route
                  exact
                  path={moduleName + "/tests/:id/"}
                  render={match => (
                    <TakeTest
                      getQueryTest={this.props.getQueryTest}
                      passTest={this.props.passTest}
                      {...match}
                      {...props}
                    />
                  )}
                />
              </Switch>
            </Main>
          </div>
        );
    }
}

export default connect((state) => {
    return state
}, {
    getCourses,
    getTests,
    getQueryTest,
    passTest,
    login,
    logout,
    getUser
})(CompetenceCenter);
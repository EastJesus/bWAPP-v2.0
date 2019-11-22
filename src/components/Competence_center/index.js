import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCourses,
  getTests,
  getQueryTest,
  passTest,
  login,
  logout,
  getUser,
  getMyInfo,
  getTestChart,
  openTestQuestions,
  getTestPieChart,
  getTestsResults,
  register
} from "../../actions/competence_center";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Courses from "./Course/Course";
import Tests from './Test/Test'
import TakeTest from './Test/TakeTest'
import Main from './main'
import './style.scss'
import CompetenceCenterNav from '../../components/Header/competence_center_nav'
import Login from './Utils/login'
import {PrivateRoute} from "./Utils/privateRoute";
import AccessDenied from './Utils/accessDenied'
import Registration from './Utils/registrations'

const moduleName = '/competence_center'

class CompetenceCenter extends Component {

    componentDidMount() {
        if(localStorage.token != 'null') {
          this.props.getMyInfo();
          this.props.getCourses();
          this.props.getTests();
        }
    }

    componentDidUpdate() {
      const {currentUser, user} = this.props.competenceCenterReducer
      if(currentUser && !user) {
        this.props.getUser(currentUser.username)
      }
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
                <PrivateRoute
                  exact
                  path="/competence_center/courses/"
                  render={() => (
                    <Courses
                      courses={courses}
                      getCourses={this.props.getCourses}
                      {...props}
                    />
                  )}
                />
                <Route
                  exact
                  path={moduleName + "/login/"}
                  render={() => (
                    <Login
                      login={this.props.login}
                      history={this.props.history}
                      getUser={this.props.getUser}
                      {...props}
                    />
                  )}
                />
                <Route
                  exact
                  path={moduleName + "/registration/"}
                  render={() => (
                    <Registration
                      register={this.props.register}
                      {...props}
                    />
                  )}
                />
                <PrivateRoute
                  exact
                  path={moduleName + "/tests/"}
                  render={() => <Tests {...props} />}
                />
                <PrivateRoute
                  exact
                  path={moduleName + "/tests/:id/"}
                  render={match => (
                    <TakeTest
                      getQueryTest={this.props.getQueryTest}
                      passTest={this.props.passTest}
                      openTestQuestions={this.props.openTestQuestions}
                      {...match}
                      {...props}
                    />
                  )}
                />

                <Route
                  exact
                  path={moduleName + "/access_denied"}
                  render={() => <AccessDenied />}
                />
              </Switch>
            </Main>
          </div>
        );
    }
}

export default connect(
  state => {
    return state;
  },
  {
    getCourses,
    getTests,
    getQueryTest,
    passTest,
    login,
    logout,
    getUser,
    getMyInfo,
    getTestChart,
    openTestQuestions,
    getTestPieChart,
    getTestsResults,
    register
  }
)(CompetenceCenter);
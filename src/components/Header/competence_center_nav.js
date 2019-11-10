import React, { Component } from "react";
import MenuItem from "material-ui/MenuItem";
import { Link, withRouter } from "react-router-dom";
import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import { connect } from "react-redux";
import ActionHome from "material-ui/svg-icons/action/home";
import "./nav.css";
import classNames from 'classnames'

import Logo from '../../../src/images/logo.png'
import { deactivateAuth } from "../../actions/auth";

class CompetenceCenterNav extends Component {

  goToAuth = () => {
    this.props.history.push("/competence_center/login/");
  };

  logout = () => {
    this.props.history.push("/competence_center/login");
    this.props.logout();
  };

  render() {
    const { currentUser } = this.props;
    const user = currentUser

    const navClass = classNames({
      'navbar': true,
      'competence_center__nav': true
    })

    return (
      <Toolbar className={navClass}>
        <ToolbarGroup>
          <img src={Logo} className="competence_center__logo" />
          <ToolbarTitle className="title" text="Центр компетенций РТУ МИРЭА" />
          <Link to="/competence_center/">
            <IconButton tooltip="Домой">
              <ActionHome className="home-svg" />
            </IconButton>
          </Link>
          <Link to="/">
            <MenuItem className="login" primaryText={"Песочница"} />
          </Link>
        </ToolbarGroup>
        <ToolbarGroup>
          <MenuItem
            className="login-logout__button"
            secondary={true}
            onClick={() => {
              this.props.history.push("/competence_center/courses/");
            }}
            primaryText={"Курсы"}
          />
          {this.props.user && this.props.user.groups.includes(2) && (
            <MenuItem
              className="login-logout__button"
              secondary={true}
              onClick={() => {
                this.props.history.push("/cc/admin");
              }}
              primaryText={"Панель администрирования"}
            />
          )}
          <MenuItem
            className="login-logout__button"
            lastChild="true"
            secondary={true}
            onClick={user ? this.logout : this.goToAuth}
            primaryText={
              user
                ? user.last_name + " " + user.first_name + " | Выйти"
                : "Войти"
            }
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }

  findSelect = () => {
    setTimeout(function() {
      let menu = document.querySelectorAll("div[role=menu]");
      let selectMenu = menu[0].parentNode.parentNode;
      selectMenu.style.transition = "all 0.5s";
      selectMenu.style.top = "55px";
      selectMenu.style.left = "";
      selectMenu.style.right = "20px";
      selectMenu.style.width = "auto";
      menu[0].parentNode.style.width = "auto";
    }, 20);
  };
}

export default withRouter(
  connect(
    state => {
      return state;
    },
    {
      deactivateAuth
    }
  )(CompetenceCenterNav)
);


import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { Link, withRouter } from "react-router-dom";
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import { connect } from "react-redux"
import ActionHome from 'material-ui/svg-icons/action/home';
import "./nav.css";

import {deactivateAuth} from '../../actions/auth'

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vulns: [
        {
          name: "A1: Инъекции",
          link: "/sandbox/SQL_Injection"
        },
        {
          name: "A2: Недостатки аутентификации",
          link: "/sandbox/Insecure_Auth"
        },
        {
          name: "A3: Разглашение конфиденциальных данных",
          link: "/sandbox/Confidential_Data"
        },
        {
          name: "A4: Внешние сущности XML (XXE)",
          link: "/sandbox/XML"
        },
        {
          name: "A5: Недостатки контроля доступа",
          link: "/sandbox/Incorrect_Access"
        },
        {
          name: "A6: Некорректная настройка параметров безопасности",
          link: "/sandbox/Incorrect_Security_Settings"
        },
        {
          name: "A7: Межсайтовый скриптинг (XSS: Script)",
          link: "/sandbox/XSS-Script"
        },
        {
          name: "A7: Межсайтовый скриптинг (XSS: HTML)",
          link: "/sandbox/XSS-HTML"
        },
        {
          name: "A8: Межсайтовая подделка запроса",
          link: "/sandbox/CSRF"
        },
        {
          name: "A9: Использование компонентов с известными уязвимостями",
          link: "/sandbox/Components_With_Known_Vulns"
        },
        {
          name: "A10: Недостатки журналирования и мониторинга",
          link: "/sandbox/Monitoring_Disadvantages"
        }
      ],
      currentVulnName: "",
      currentVulnLink: null
    };
  }

  changeVuln = (event, index, currentVuln) => {
    let nextLink = null 
    for(let i = 0; i < this.state.vulns.length; i++) {
      if(currentVuln === this.state.vulns[i].name) {
        nextLink = this.state.vulns[i].link
        this.setState({
          currentVulnName: this.state.vulns[i].name,
        })
        this.setState({
          currentVulnLink: nextLink
        }, () => {
          this.props.history.push(`${this.state.currentVulnLink}`)
        });
      }
    }
  }

  goToAuth = () => {
    this.props.history.push('/sandbox/auth')
  }

  logout = () => {
    this.props.history.push('/')
    this.props.deactivateAuth();
  }

  
  render() {
    const {storage} = this.props
    return (
      <Toolbar className="navbar">
        <ToolbarGroup>
          <ToolbarTitle className="title" text="Buggy Sandbox" />
          <Link to="/">
            <IconButton tooltip="Домой">
              <ActionHome className="home-svg" />
            </IconButton>
          </Link>
          <Link to="/competence_center/">
            <MenuItem primaryText={'Центр компетенций'} className="menu__link" />
          </Link>
          <MenuItem
            className="login"
            onClick={this.goToAuth}
            primaryText={
              storage.isAuth == "true" ? `Вы вошли как ${storage.user}` : ""
            }
          />
        </ToolbarGroup>

        <ToolbarGroup>
          <MenuItem
            className="login-logout__button"
            lastChild="true"
            secondary={true}
            onClick={
              localStorage.isAuth == "true" ? this.logout : this.goToAuth
            }
            primaryText={localStorage.isAuth == "true" ? "Выйти" : "Войти"}
          />
          <SelectField
            value={this.state.currentVulnName}
            onChange={this.changeVuln}
            onClick={this.findSelect}
            floatingLabelText="Выберите уязвимость"
            className="selectVuln"
          >
            {this.state.vulns.map(item => (
              <MenuItem
                value={item.name}
                key={item.name}
                primaryText={item.name}
              />
            ))}
          </SelectField>
        </ToolbarGroup>
      </Toolbar>
    );
  }

  findSelect = () => {
    setTimeout(function() {
      let menu = document.querySelectorAll('div[role=menu]')
      let selectMenu = menu[0].parentNode.parentNode
      selectMenu.style.transition = 'all 0.5s'
      selectMenu.style.top = '55px'
      selectMenu.style.left = ''
      selectMenu.style.right = '20px'
      selectMenu.style.width = 'auto'
      menu[0].parentNode.style.width = 'auto'
    }, 20)
  }
}

export default withRouter(connect(state => {
  return state
}, {
  deactivateAuth
})(Nav))


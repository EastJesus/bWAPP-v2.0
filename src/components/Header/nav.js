
import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { Link, withRouter } from "react-router-dom";
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import { connect } from "react-redux"
import deactivate from '../../actions/authAction'
import ActionHome from 'material-ui/svg-icons/action/home';
import "./Nav.css";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vulns: [
        {
          name: 'A1: Инъекции',
          link: 'SQL_Injection'
        },
        {
          name: 'A7: Межсайтовый скриптинг (XSS: Script)',
          link: 'XSS-Script'
        },
        {
          name: 'A7: Межсайтовый скриптинг (XSS: HTML)',
          link: 'XSS-HTML'
        },
        {
          name: 'A8: Межсайтовая подделка запроса',
          link: 'CSRF'
        }
        
      ],
      currentVulnName: '',
      currentVulnLink: null
    };
  }

  changeVuln = (event, index, currentVuln) => {
    let nextLink = '132'
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
    this.props.history.push('auth')
  }

  logout = () => {
    this.props.history.push('/')
    this.props.logout(false);
    window.location.reload()
  }

  componentDidMount() {
    console.log('data ' + this.props.data);
   //this.props.activateAuth()
  }
  render() {
    console.log('---- Nav props' );
    console.log(this.props)
    return (
      
      <Toolbar className="navbar">
        
        <ToolbarGroup>
          <ToolbarTitle className="title" text="bWAPP V2.0" />
          <Link to="/">
            <IconButton tooltip="Домой">
              <ActionHome className="home-svg" />
            </IconButton>
          </Link>
          <MenuItem className="login"
                    onClick={this.goToAuth}
                    primaryText={this.props.isAuth ?
                    `Вы вошли как ${this.props.login}` : ""} 
          />
        </ToolbarGroup>

        <ToolbarGroup>
            <MenuItem className="login-logout__button"
                      lastChild="true" 
                      secondary={true}
                      onClick={this.props.isAuth ? this.logout : this.goToAuth} 
                      primaryText={this.props.isAuth ? "Выйти" : "Войти"} 
            />
            <SelectField
              value={this.state.currentVulnName}
              onChange={this.changeVuln}
              onClick={this.findSelect}
              floatingLabelText="Выберите уязвимость"
              className="selectVuln"
            >
            {this.state.vulns.map(item => (
              <MenuItem value={item.name} key={item.name} primaryText={item.name} />
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
const mapStateToProps = state => ({
  isAuth: state.authInfo.isAuth,
  login: state.authInfo.login
});
const mapDispatchToProps = dispatch => ({
  //activateAuth: () => dispatch(activateAuth),
  logout: (auth) => dispatch(deactivate(auth))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav))

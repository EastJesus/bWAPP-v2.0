import AppBar from "material-ui/AppBar";
import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Divider from 'material-ui/Divider';
import { Link, withRouter } from "react-router-dom";

import "./Nav.css";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vulns: ["XSS-Script", "XSS-HTML", "CSRF", 'SqlInjection'],
      currentVuln: null
    };
  }

  changeVuln = (event, index, currentVuln) => {

    this.setState({
      currentVuln
    }, () => {
      this.props.history.push(`${this.state.currentVuln}`)
    });
    
  }

  render() {
    return (
      <AppBar title="bWAPP v2.0" className="AppBar">
        <SelectField
          value={this.state.currentVuln}
          onChange={this.changeVuln}
          floatingLabelText="Выберите уязвимость"
          className="selectVuln"
        >
          {this.state.vulns.map(item => (
            <MenuItem value={item} key={item} primaryText={item} />
          ))}
          
        </SelectField>
      </AppBar>
    );
  }
}

export default withRouter(Nav);
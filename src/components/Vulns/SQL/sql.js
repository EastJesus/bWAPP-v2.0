import React, { Component } from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import { connect } from "react-redux";

import { fetchUsers } from "../../../actions/users";
import { fetchOneUser } from "../../../actions/users";

import "./sql.css";

import Description from "./description";
import Exp from "./exp";
import Defense from "./defense";

class SqlInjection extends Component {
  render() {

    return (
      <div className="sql">
        <Tabs>
          <Tab label="Описание" onload="PR.prettyPrint()">
            <Description />
          </Tab>
          <Tab label="Эксплуатация">
            <Exp {...this.props}/>
          </Tab>
          <Tab label="Защита">
            <Defense />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default connect(
  state => {
    return state;
  },
  {
    fetchUsers,
    fetchOneUser
  }
)(SqlInjection);

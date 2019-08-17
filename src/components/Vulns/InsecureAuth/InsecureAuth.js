import React, { Component } from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import "./InsecureAuth.css";

import Defense from './defense'
import Desc from './description'
import Exp from './exp'

class InsecureAuth extends Component {
  render() {
    return (
      <div>
        <Tabs>
          <Tab label="Описание">
            <Desc />
          </Tab>
          <Tab className="csrf__tab_1" label="Эксплуатация">
            <Exp />
          </Tab>
          <Tab label="Защита">
            <Defense />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default InsecureAuth

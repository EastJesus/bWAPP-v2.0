import React, { Component } from "react";
import { Tabs, Tab } from "material-ui/Tabs";

import Description from './description'
import Exp from './exp'
import Defense from './defense'

class XML extends Component {
  render() {
    return (
      <Tabs>
        <Tab label="Описание">
          <Description />
        </Tab>
        <Tab label="Примеры атак">
          <Exp />
        </Tab>
        <Tab label="Защита">
          <Defense />
        </Tab>
      </Tabs>
    );
  }
}

export default XML;

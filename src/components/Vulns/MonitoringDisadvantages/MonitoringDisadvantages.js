import React, { Component } from "react";
import { Tabs, Tab } from "material-ui/Tabs";

import Description from './description'
import Exp from './exp'
import Defense from './defense'

class MonitoringDisadvantages extends Component {
    render() {
        return (
          <div className="vuln">
            <Tabs>
              <Tab label="Описание">
                <Description />
              </Tab>
              <Tab label="Эксплуатация">
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

export default MonitoringDisadvantages
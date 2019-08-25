import React, { Component } from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import "./xss.css";

import Description from "./XSS-JS/description";
import Exp from "./XSS-JS/exp";
import Defense from "./XSS-JS/defense";

class XSS extends Component {
  
  render() {
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
      }
    };

    return (
      <div className="vuln">
        <Tabs>
          <Tab label="Описание">
            <Description styles={styles} />
          </Tab>
          <Tab label="Эксплуатация">
            <Exp />
          </Tab>
          <Tab label="Защита">
            <Defense styles={styles} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default XSS;

import React, { Component } from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import './csrf.css'

import Exp from './exploitation'

class CSRF extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="csrf__wrapper">
        <Tabs>
          <Tab label="Описание"></Tab>
          <Tab className="csrf__tab_1" label="Эксплуатация">
            <Exp {...this.props} />
          </Tab>
          <Tab label="Защита"></Tab>
        </Tabs>
      </div>
    )
  }
}

export default CSRF;
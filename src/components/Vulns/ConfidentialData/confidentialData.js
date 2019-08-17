import React, { Component } from "react";
import { Tabs, Tab } from "material-ui/Tabs";

import Exp from './exp'
import Desc from './description'
import Defense from './defense'

class ConfidentialData extends Component {

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
        )
    }
}

export default ConfidentialData
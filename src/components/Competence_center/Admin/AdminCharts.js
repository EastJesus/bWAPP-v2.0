import React, {Component} from 'react'
import PassedTestChart from "./PassedTestChart";
import PassedTestPieChart from "./PassedTestPieChart";

class Charts extends Component {
    render() {
        const {...props} = this.props
        return (
          <div className="adminPanelCharts">
            <div className="chart">
              <PassedTestChart {...props} />
            </div>
            <div className="pieChart">
              <PassedTestPieChart {...props} />
            </div>
          </div>
        );
    }
}

export default Charts
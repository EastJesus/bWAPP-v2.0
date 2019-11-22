import React, {Component} from 'react'
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import PassedTestChart from "./PassedTestChart";
import PassedTestPieChart from "./PassedTestPieChart";
import Loader from '../Utils/loader'
import { connect } from "react-redux";
import { getTestChart, getTestPieChart } from "../../../actions/competence_center";

class Charts extends Component {

    componentWillMount() {
      this.props.getTestChart();
      this.props.getTestPieChart();
    }
 
    render() {
        const {...props} = this.props
        return (
          <ReactCSSTransitionGroup
            transitionName="charts"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
            transitionAppear={true}
            transitionAppearTimeout={500}
          >
            <div className="adminPanelCharts">
              <div className="chart">
                <PassedTestChart {...props} />
              </div>
              <div className="pieChart">
                <PassedTestPieChart {...props} />
              </div>
            </div>
          </ReactCSSTransitionGroup>
        );
    }
}

export default connect(
  state => {
    return state;
  },
  {
    getTestChart,
    getTestPieChart
  }
)(Charts)
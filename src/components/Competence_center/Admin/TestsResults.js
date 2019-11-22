import React, { Component } from "react";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Loader from '../Utils/loader'

var moment = require("moment");
moment.locale("ru")

class GroupResult extends Component {
  render() {
    const { tests } = this.props;

    return (
      <>
        {tests &&
          tests.tests.map(test => (
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{test.test}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <TestResult data={test} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
      </>
    );
  }
}

class TestResult extends Component {
  render() {
    const { data } = this.props;
    const tableData = data.students;
    moment.locale("fr"); 
    
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn
              colSpan="3"
              tooltip="Тест"
              style={{
                textAlign: "center",
                fontSize: "16px",
                opacity: 1,
                color: "black"
              }}
            >
              {data.test}
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn>Студент</TableHeaderColumn>
            <TableHeaderColumn>Дата прохождения</TableHeaderColumn>
            <TableHeaderColumn>Правильные ответы</TableHeaderColumn>
            <TableHeaderColumn>Набранный балл</TableHeaderColumn>
            <TableHeaderColumn>Результат</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData &&
            tableData.map(student => (
              <TableRow>
                <TableRowColumn>{student.student}</TableRowColumn>
                <TableRowColumn>
                  {student.date ? moment(student.date).format("L") + " " + moment(student.date).format("LT") : ''}
                </TableRowColumn>
                <TableHeaderColumn>{student.answers}</TableHeaderColumn>
                <TableHeaderColumn>{student.score}</TableHeaderColumn>
                <TableRowColumn>
                  <span
                    className={
                      student.result == "Пройден успешно"
                        ? "success"
                        : student.result == "Провален"
                        ? "error"
                        : "null"
                    }
                  >
                    {student.result}
                  </span>
                </TableRowColumn>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  }
}

class TestsResults extends Component {
  componentWillMount() {
    this.props.getTestsResults();
  }

  render() {
    const { results } = this.props

    return (
      <div className="test__results">
        <ReactCSSTransitionGroup
          transitionName="charts"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          transitionAppear={true}
          transitionAppearTimeout={500}
        >
          {!results && <Loader />}
          {results && <h3>Результаты прохождения тестов по группам</h3>}
          {results &&
            results.map(tests => (
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{tests.group}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="group__results">
                  <GroupResult tests={tests} />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default connect(
  state => {
    return state;
  },
  {}
)(TestsResults);

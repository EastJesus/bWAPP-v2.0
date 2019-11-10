import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";


var moment = require("moment");
moment.locale("ru")

class GroupResult extends Component {
  render() {
    const { tests } = this.props;

    return (
      <>
        {" "}
        <h3>Группа {tests.group}</h3>
        {tests && tests.tests.map(test => <TestResult data={test} />)}
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
            <TableHeaderColumn>Результат</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData &&
            tableData.map(student => (
              <TableRow>
                <TableRowColumn>{student.student}</TableRowColumn>
                <TableRowColumn>
                  {moment(student.date).format("L")}{" "}
                  {moment(student.date).format("LT")}
                </TableRowColumn>
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
      <div className='test__results'>{results && results.map(tests => <GroupResult tests={tests} />)}</div>
    );
  }
}

export default connect(
  state => {
    return state;
  },
  {}
)(TestsResults);

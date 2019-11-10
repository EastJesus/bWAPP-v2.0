import React, { Component } from "react";
import Chart from "chart.js";
import { connect } from "react-redux";
import { getTestChart } from "../../../actions/competence_center";

class PassedTestChart extends Component {
  componentWillMount() {
    this.props.getTestChart();
  }

  componentDidUpdate() {
    var ctx = document.getElementById("myChart");
    const { test_chart } = this.props
    
    if (test_chart) {
      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: test_chart && test_chart.map(item => item.test),
          datasets: [
            {
              label: "В среднем правильных ответов",
              data: test_chart && test_chart.map(item => item.correct_answers),
              backgroundColor: [
                "rgba(75, 192, 192, 0.2)",
                "rgba(75, 192, 192, 0.2)"
              ],
              borderColor: ["rgba(75, 192, 192, 1)", "rgba(75, 192, 192, 1)"],
              borderWidth: 1
            },
            {
              label: "Всего вопросов",
              data: test_chart && test_chart.map(item => item.all_questions),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 99, 132, 0.2)"
              ],
              borderColor: ["rgba(255, 99, 132, 1)", "rgba(255, 99, 132, 1)"],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    }
  }

  render() {
    return (
        <>
          <h4>Среднее количество правильных ответов при прохождении теста</h4>
          <canvas id="myChart" width="400" height="400"></canvas>
        </>
    );
  }
}

export default connect(
  state => {
    return state;
  },
  {
    getTestChart
  }
)(PassedTestChart);

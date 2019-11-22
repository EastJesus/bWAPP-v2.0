import React, { Component } from "react";
import Chart from "chart.js";
import CircularProgress from "@material-ui/core/CircularProgress";

class PassedTestChart extends Component {

  componentDidUpdate() {
    this.renderChart()
  }

  componentDidMount() {
    this.renderChart()
  }

  renderChart = () => {
    var ctx = document.getElementById("myChart");
    const { test_chart } = this.props;

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
                "rgba(75, 192, 192, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(75, 192, 192, 0.5)"
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(75, 192, 192, 1)"
              ],
              borderWidth: 1
            },
            {
              label: "Всего вопросов",
              data: test_chart && test_chart.map(item => item.all_questions),
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(255, 99, 132, 0.5)",
                "rgba(255, 99, 132, 0.5)",
                "rgba(255, 99, 132, 0.5)",
                "rgba(255, 99, 132, 0.5)",
                "rgba(255, 99, 132, 0.5)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(255, 99, 132, 1)"
              ],
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
      <div className="test_chart">
        <h4>Среднее количество правильных ответов при прохождении теста</h4>
        {!this.props.test_chart && <CircularProgress color="secondary" />}
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
    );
  }
}

export default PassedTestChart;

import React, {Component} from 'react'
import Chart from "chart.js";
import CircularProgress from "@material-ui/core/CircularProgress";

class PassedTestPieChart extends Component {

    componentDidUpdate() {
       this.renderChart()
    }

    componentDidMount() {
      this.renderChart()
    }

    renderChart = () => {
       const { test_pie_chart } = this.props;

       var ctx = document.getElementById("myPieChart");
       var myChart = new Chart(ctx, {
         type: "pie",
         data: {
           labels:
             test_pie_chart &&
             test_pie_chart.map(question => question.question),
           datasets: [
             {
               label: "Количество неправильных ответов на вопросы",
               data:
                 test_pie_chart &&
                 test_pie_chart.map(question => question.count),
               backgroundColor: [
                 "rgba(255, 99, 132, 1)",
                 "rgba(54, 162, 235, 1)",
                 "rgba(255, 206, 86, 1)",
                 "rgba(42, 187, 155, 1)"
               ],
               borderColor: [
                 "rgba(255,99,132,1)",
                 "rgba(54, 162, 235, 1)",
                 "rgba(255, 206, 86, 1)",
                 "rgba(42, 187, 155, 1)"
               ],
               borderWidth: 1
             }
           ]
         },
         options: {
           cutoutPercentage: 40,
           responsive: false
         }
       });
    }

    render() {
        return (
          <div className="test_chart">
            <h4>Вопросы, на которые чаще всего отвечают неправильно</h4>
            {!this.props.test_pie_chart && <CircularProgress />}
            <canvas id="myPieChart" width="400" height="400"></canvas>
          </div>
        );
    }
}

export default PassedTestPieChart
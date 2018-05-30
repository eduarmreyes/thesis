import React, { Component } from 'react';
import Chart from 'chart.js';

class ChartLine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: ['11, 56, 123'],
      chart: null,
    };

    this.customTooltips = this.customTooltips.bind(this);
    this.createData = this.createData.bind(this);
    this.randomColor = this.randomColor.bind(this);
  }

  randomColor() {
    return Math.floor(Math.random() * this.state.colors.length);
  }

  customTooltips(tooltip, _this) {
    let tooltipEl = document.getElementById('chartjs-tooltip');

    //const positionY = _this._chart.canvas.offsetTop
    const positionX = _this._chart.canvas.offsetLeft;

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = 'chartjs-tooltip';
      tooltipEl.innerHTML = "<div id='tooltip-graphic' class='chartjs-content-tooltip'></div>";
      _this._chart.canvas.parentNode.appendChild(tooltipEl);
    }

    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltip.yAlign) {
      tooltipEl.classList.add(tooltip.yAlign);
    } else {
      tooltipEl.classList.add('no-transform');
    }

    // Set Text
    if (tooltip.body) {
      const bodyLines = tooltip.body.map(bodyItem => bodyItem.lines);

      let innerHtml = "<ul class='tooltip-list list-style display-flex'>";

      // console.log(tooltip)

      bodyLines.forEach(function(body, i) {
        const label = tooltip.dataPoints[i];
        const colors = tooltip.labelColors[i];
        const style = ['color: ' + colors.backgroundColor, 'font-weight: 500'];

        innerHtml += "<li class='tooltip-list--item display-flex'>";
        innerHtml += "<div class='date'>";
        innerHtml += 'Dia ' + label.xLabel;
        innerHtml += '</div>';
        innerHtml += "<div class='value'>";
        innerHtml +=
          "<span style='" +
          style.join(';') +
          "'>$" +
          parseFloat(label.yLabel)
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+\.)/g, '$1,') +
          '</span>';
        innerHtml += '</div>';
        innerHtml += '</li>';
      });

      innerHtml += '</ul>';

      const tableRoot = tooltipEl.querySelector('#tooltip-graphic');
      tableRoot.innerHTML = innerHtml;
    }

    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX - 55 + 'px';
    //tooltipEl.style.top = (positionY+tooltip.caretY - 20)+"px"
    tooltipEl.style.top = '60px';
    tooltipEl.style.fontFamily = 'Cachet W01';
    tooltipEl.style.fontSize = '18px';
    tooltipEl.style.fontWeight = '100';
    tooltipEl.style.fontStyle = tooltip._fontStyle;
  }

  createData(data) {
    let colorsInUse = [];
    let result = [];
    let color;
    let random;

    if (data.length < this.state.colors.length) {
      while (colorsInUse.length < data.length) {
        random = this.randomColor();
        color = this.state.colors[random];

        if (colorsInUse.indexOf(color) < 0) {
          colorsInUse.push(color);
        } else {
          // colorsInUse.push(null)
        }
      }
    } else {
      for (let a = 0, lena = this.state.colors.length; a < lena; a++) {
        colorsInUse.push(this.state.colors[a]);
      }
    }

    if (data.length > 0) {
      let useColor = colorsInUse[0];
      let arrDataColors = {};

      if (useColor) {
        arrDataColors = {
          label: 'Ganancia',
          backgroundColor: 'rgba(11, 56, 123, 0.2)',
          borderColor: 'rgba(143, 134, 255, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(143, 134, 255, 1)',
          pointRadius: 0,
          pointBorderWidth: 5,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          pointHoverBackgroundColor: 'white',
          pointHitRadius: 5,
          lineTension: 0,
        };
      }

      result = [
        {
          data,
          ...arrDataColors,
        },
      ];
    }

    return result;
  }

  componentDidMount() {
    const _this = this;
    const ctx = document.getElementById(`${this.props.id}`);
    const datasets = this.createData(this.props.data);
    Chart.defaults.LineWithLine = Chart.defaults.line;
    Chart.controllers.LineWithLine = Chart.controllers.line.extend({
      draw: function(ease) {
        Chart.controllers.line.prototype.draw.call(this, ease);

        if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
          var activePoint = this.chart.tooltip._active[0],
            ctx = this.chart.ctx,
            x = activePoint.tooltipPosition().x,
            topY = this.chart.scales['y-axis-0'].top,
            bottomY = this.chart.scales['y-axis-0'].bottom;

          // draw line

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'rgba(143, 134, 255, 1)';
          ctx.globalCompositeOperation = 'destination-over';

          ctx.stroke();
          ctx.restore();
        }
      },
    });

    const options = {
      type: 'LineWithLine',
      data: {
        labels: this.props.dates,
        datasets,
      },
      options: {
        lineOnHover: {
          enabled: true,
          lineColor: '#bbb',
          lineWidth: 1,
        },
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              borderWidth: 3,
              ticks: {
                display: true,
                beginAtZero: false,
                min: 0,
              },
              gridLines: {
                display: true,
                tickMarkLength: 5,
                drawTicks: true,
                offsetGridLines: false,
                zeroLineBorderDash: 15,
                zeroLineBorderDashOffset: 15,
              },
            },
          ],
          yAxes: [
            {
              borderWidth: 10,
              display: true,
              gridLines: {
                display: true,
                drawBorder: true,
                tickMarkLength: 2,
                drawTicks: true,
              },
              ticks: {
                beginAtZero: false,
                min: 0,
                stepSize: 0,
              },
            },
          ],
        },
        hover: {
          intersect: false,
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
          mode: 'index',
          intersect: false,

          custom: function(tooltip) {
            _this.customTooltips(tooltip, this);
          },
        },
      },
    };

    const chart = new Chart(ctx, options);

    // console.log("Children", "Exist update method?", "update" in chart)
    // console.log(chart)

    this.setState({ chart });

    if (typeof this.props.callback === 'function') {
      this.props.callback(chart);
    }
  }

  render() {
    return <canvas id={`${this.props.id}`} />;
  }
}

ChartLine.defaultProps = {
  id: 'myChart',
  data: [],
  dates: [],
};

export default ChartLine;

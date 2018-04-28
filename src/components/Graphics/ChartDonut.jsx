
import React, { Component } from "react"
import Chart from "chart.js"

class ChartDonut extends Component {
  constructor(props) {
    super(props)

    this.state = {
      colors: [
        "11, 56, 123"
      ],
      chart: null
    }

    this.customTooltips = this.customTooltips.bind(this)
    this.createData = this.createData.bind(this)
    this.randomColor = this.randomColor.bind(this)
  }

  randomColor() {
    return Math.floor(Math.random() * this.state.colors.length)
  }

  customTooltips(tooltip, _this) {
    let tooltipEl = document.getElementById("chartjs-tooltip")

    //const positionY = _this._chart.canvas.offsetTop
    const positionX = _this._chart.canvas.offsetLeft

    if (!tooltipEl) {
      tooltipEl = document.createElement("div")
      tooltipEl.id = "chartjs-tooltip"
      tooltipEl.innerHTML = "<div id='tooltip-graphic' class='chartjs-content-tooltip'></div>"
      _this._chart.canvas.parentNode.appendChild(tooltipEl)
    }

    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0
      return
    }

    // Set caret Position
    tooltipEl.classList.remove("above", "below", "no-transform")
    if (tooltip.yAlign) {
      tooltipEl.classList.add(tooltip.yAlign)
    } else {
      tooltipEl.classList.add("no-transform")
    }

    // Set Text
    if (tooltip.body) {
      const bodyLines = tooltip.body.map(bodyItem => bodyItem.lines)

      let innerHtml = "<ul class='tooltip-list list-style display-flex'>"

      // console.log(tooltip)

      bodyLines.forEach(function(body, i) {
        const label = tooltip.dataPoints[i]
        const colors = tooltip.labelColors[i]
        const style = [
          "color: "+colors.backgroundColor,
          "font-weight: 500"
        ]

        innerHtml += "<li class='tooltip-list--item display-flex'>"
        innerHtml += "<div class='date'>"
        innerHtml += label.xLabel
        innerHtml += "</div>"
        innerHtml += "<div class='value'>"
        innerHtml += "<span style='"+style.join(";")+"'>$"+parseFloat(label.yLabel).toFixed(2)+"</span>"
        innerHtml += "</div>"
        innerHtml += "</li>"
      })

      innerHtml += "</ul>"

      const tableRoot = tooltipEl.querySelector("#tooltip-graphic")
      tableRoot.innerHTML = innerHtml
    }

    tooltipEl.style.opacity = 1
    tooltipEl.style.left = (positionX+tooltip.caretX - 55) +"px"
    //tooltipEl.style.top = (positionY+tooltip.caretY - 20)+"px"
    tooltipEl.style.top = "60px"
    tooltipEl.style.fontFamily = "Cachet W01"
    tooltipEl.style.fontSize = "18px"
    tooltipEl.style.fontWeight = "100"
    tooltipEl.style.fontStyle = tooltip._fontStyle
  }

  createData(data) {
    let colorsInUse = []
    let result = []
    let color
    let random

    if (data.length < this.state.colors.length) {
      while (colorsInUse.length < data.length) {
        random = this.randomColor()
        color = this.state.colors[random]

        if (colorsInUse.indexOf(color) < 0) {
          colorsInUse.push(color)
        } else {
          // colorsInUse.push(null)
        }
      }
    } else {
      for (let a = 0, lena = this.state.colors.length; a < lena; a++) {
        colorsInUse.push(this.state.colors[a])
      }
    }

    if (data.length > 0) {
        let useColor = colorsInUse[0]
        let arrDataColors = {}

        if (useColor) {
          arrDataColors = {
            label: 'LINE',
            lineTension:0,
            backgroundColor: `rgba(${useColor}, 0.3)`,
            borderColor: `rgba(${useColor}, 1)`,
            borderWidth: 2,
            pointBackgroundColor: `rgba(255,255,255, 1)`,            
            pointRadius: 0,
            pointBorderWidth: 5,
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2,
            pointHoverBackgroundColor: 'white',
            pointHitRadius: 5,
          }
        }

        result = [{
          data,
          ...arrDataColors
        }]
    }

    return result
  }

  componentDidMount() {
    const ctx = document.getElementById(`${this.props.id}`)
    const datasets = this.createData(this.props.data)



    const options = {
      type: "line",
      data: {
        labels: this.props.dates,
        datasets
      },
      options: {
        responsive:true,
        lineOnHover: {
           enabled: true,
           lineColor: '#bbb',
           lineWidth: 1
        },
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            ticks: {  
              display: false
            }
          }]
        },
        hover: {
         intersect: false
      },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
          mode: "index",
          intersect: false
        }
      }
    }


    const chart = new Chart(ctx, options)

    // console.log("Children", "Exist update method?", "update" in chart)
    // console.log(chart)

    this.setState({ chart })

    if (typeof this.props.callback === "function") {
      this.props.callback(chart)
    }
  }

  render() {
    return(
      <canvas id={`${this.props.id}`}></canvas>
    )
  }
}

ChartDonut.defaultProps = {
  id: "myChartdonut",
  data: [],
  dates: []
}

export default ChartDonut

import React, {Component} from 'react'
import { Redirect } from 'react-router'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import Backend from '../components/Layouts/Backend';
import ChartLine from "../components/Graphics/ChartLine"
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import ChartDonut from "../components/Graphics/ChartDonut"
import ChartminLine from "../components/Graphics/ChartminLine"
import moment from 'moment';
import Moment from 'moment';
import {DatetimePickerTrigger} from 'rc-datetime-picker';
import JSONData from "../JSONData"

import fileDownload  from'js-file-download';

import Chart from 'chart.js';


class DashboarUser extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      title:'Transacciones',
      page:'general',
      menu:'transacciones-user',
      tabla:null,  
      id_cuenta:  this.props.info_cuenta !== null ? this.props.info_cuenta['uuid'] : '',
      redirect:false

    }
        this.get_transacciones = this.get_transacciones.bind(this)
        this.generate_estado   = this.generate_estado.bind(this)

  }
  shouldComponentUpdate(nextProps, nextState){
    if(this.props.info_cuenta ===  null){
      return false
    }else{
      return true
    }
  }
  componentWillMount(){
    if (this.props.scope === 'admin') {
      this.get_transacciones(1,13)  
      this.updateGraphics() 
    }else{
       if (this.props.info_cuenta !== null ) {
      this.get_transacciones(1,13)  
      this.updateGraphics() 
    }else{
          this.setState({
            redirect:true
          })
         switch(this.props.infouser.type_of_user) {
          case 'personality':
          this.setState({
            redirect_page:'pnpasouno'
          })
    
          break;
          case 'company':
          this.setState({
            redirect_page:'empasouno'
          })

          break;
          default:

          break;
        }

      }
    } 
  }
  componentDidMount(){    
    debugger;
  }
  updateGraphics() {
      this.setState({
        chart: null,
        initChart: null
      })
        let json = null
        let chart = null
        let chartProps = null
        let toUpdate = {
          dummyData: {}
        }
    

        setTimeout(() => {  
        const bearer = 'bearer '+ this.props.userToken;
        axios.request('GUET', {
          url:this.props.baseurl + '/v1/user_accounts/'+this.state.id_cuenta+'/graphics',
          headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
        })
        .then(jsonresponse => { 

          json = jsonresponse.data.response
           chartProps = {
            data: json.value,
            id: "customID",
            dates: json.label,
            callback: this.getDataInit
          }               
                    
          toUpdate.dummyData = {
            graphics: json
          }
          chart = <ChartLine {...chartProps} />
          toUpdate.chart = chart
          this.setState(toUpdate)
           })  
        .catch(error => {

        });
  
      }, 500)  
  }
  get_transacciones(page,per_page){
    const bearer = 'bearer '+ this.props.userToken;
      axios.request('GUET', {
        url:this.props.baseurl + '/v1/user_accounts/'+this.state.id_cuenta+'/transactions?page='+ page +'&per_page='+ per_page +'',
        headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
      })
      .then(jsonresponse => { 
       let content;

       content = jsonresponse.data.map((lista, index) => {  
    
          return (    
            <tr key={index} className="no-cursorpointer">
            <td>{ (lista.code === null || lista.code === "" || lista.code === " ") ? 'N/A' : lista.code }</td>
            <td> {lista.name_user}</td> 
              <td> {lista.amount}</td> 
                 <td> { lista.trans_gaining === true ? "Ganada" : ""}{ lista.trans_deposit === true ? "Deposito" : ""}{ lista.trans_initial === true ? "Inicial" : ""} { lista.trans_lost === true ? "Perdida" : ""} { lista.trans_retirement === true ? "Retiro" : ""}</td>      
              <td> { lista.trans_date } </td>
              <td> { lista.balance } </td>
            </tr>            
          );
      });
       this.setState({
        tabla:content
       })

      })  
      .catch(error => {
        let content = <tr>
          <td colSpan={5}> No se encontraron registros</td>
        </tr>
            this.setState({
              tabla:content
          })
      });
  }
  generate_estado(){
     const bearer = 'bearer '+ this.props.userToken;
      axios.request('GUET', {
        url:this.props.baseurl + '/v1/user_accounts/'+this.state.id_cuenta+'/pdf',
        headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
      })
      .then(jsonresponse => { 

        const url = jsonresponse.data;

         // server sent the url to the file!
        // now, let's download:
        window.open(jsonresponse.data);
        // you could also do:
        //window.location.href = jsonresponse.data;
      
      })  
      .catch(error => {
       
      });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect push to={"/" + this.state.redirect_page} />;
    }
    return(
    /*Componente que se ejecutara cuando no encuentre un comonente al cual redireccionar*/
    <div className="content-inner no-padding-top no-padding-left no-padding-right">       		
  	  <div className="page-info height-card ">
         <div className="card-user">
             <strong className="purple title-number">{this.props.info_cuenta['initial_amount']}</strong>
              <br/>
              <span>Saldo inicial</span>
         </div>
      
          
        <div className="card-detail-col">
          <strong className="whiteblue title-number">{this.props.info_cuenta['able_to_withdraw']} </strong>
          <br/>
          <span>Total permitido a retirar</span>
        </div>
        
        <div className="card-detail-col">         

          <strong className="whiteblue title-number">{this.props.info_cuenta['total_earnings']} </strong>
          <br/>
          <span>Total de ganancia</span>
        </div>
                  
        <div className="card-detail-col">           

              <strong className="purple title-number">{this.props.info_cuenta['balance']}</strong>
              <br/>
              <span>Saldo actual</span>
        </div>
      </div>
        <div className="row-card ">      
          <div className="card-detail-col">
            <span>Total débitos</span> <strong className="whiteblue">{this.props.info_cuenta['total_debits']}</strong> 
          </div>
          <div className="card-detail-col">
            <span>Rendimiento Historico</span> <strong className="whiteblue">{this.props.info_cuenta['account_performance']}</strong>  
          </div>
          <div className="card-detail-col">
             <span>Rendimiento del mes</span> <strong className="purple">{this.props.info_cuenta['current_performance']}</strong>  
          </div>
        </div>

      <div className="border-bottom side-margins border-chart margin50">
          <h3>Grafica de crecimiento </h3>
          <div className="chart-container">
             {this.state.chart} 
          </div>
            
      </div>               
 
      <div className="generate-data margin50">
       <h2 className="display-block">Transacciones de clientes</h2>    
       
            <a href="#" onClick={this.generate_estado} className="btn-generate">Generar estado de cuenta</a>        
      </div>

      <div className="page-cliente-empty-content margin50">
        <div className="table-content table-responsive">
          <table>
            <thead>
              <tr className="no-cursorpointer">
              <td> Cuenta </td>
                <td> Nombre </td>
                <td> Monto </td>
                <td> Tipo de transacción </td>
                <td> Finalización de Contrato </td>
                <td> Balance </td>
              </tr>
            </thead>
            <tbody>
              {this.state.tabla}
              <tr className="no-cursorpointer">
                  <td colSpan={6}>
                  <NavLink to="/transaccionesgeneralesuser">Ver mas Transacciones</NavLink>
                  </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
	  </div>
    )
  }
}



class DashboardAdmin extends Component {

  constructor(props){
    super(props)

    this.state = {
      startdate: moment(),
      enddate: moment(),
      chart: null,
      useDummyData:true,
      total_user:0,
      pending_user:0,
      task_incomplet:0,
      new_invertion:0,
      increase_capital:0

    }

    this.getDataInit = this.getDataInit.bind(this)
    this.get_movimiento_transacciones  = this.get_movimiento_transacciones.bind(this)
    this.get_proveniente_transacciones = this.get_proveniente_transacciones.bind(this)
    this.get_proveniente_transacciones_x_peso = this.get_proveniente_transacciones_x_peso.bind(this)
    
    this.get_bancos_por_cuentas = this.get_bancos_por_cuentas.bind(this)
    this.selectstardate = this.selectstardate.bind(this)
    this.selectenddate = this.selectenddate.bind(this)
    this.updateGraphics = this.updateGraphics.bind(this)
    this.get_status_bar = this.get_status_bar.bind(this)
  }
  componentDidMount() { 
    this.get_status_bar()
    
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 30);
    Moment.locale('en');
    var startdate = Moment(currentDate)
    setTimeout(() => {  
    console.log(startdate)
    this.setState({
      startdate:startdate
    })
    
    this.updateGraphics()
    }, 10) 
  }
  getDataInit(chart) {
    this.setState({ initChart: chart })       
  }

  selectstardate(startdate){
    this.setState({
      startdate
    });
  }
  selectenddate(enddate){
    this.setState({
      enddate
    });
  }
  get_status_bar(){
    const bearer = 'bearer '+ this.props.userToken;
    axios.request('GUET', {
      url:this.props.baseurl + '/v1/users/count',
      headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
    })
    .then(jsonresponse => { 
      console.log(jsonresponse)
      this.setState({
        total_user:jsonresponse.data
      })
    })
    .catch(error => {


    });   
    ////////////////////////////////////////////////////////////////////////////////////////////////
     axios.request('GUET', {
      url:this.props.baseurl + '/v1/users/approved_count',
      headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
    })
    .then(jsonresponse => { 
      this.setState({
        pending_user:jsonresponse.data
      })
    })
    .catch(error => {


    });  
    ///////////////////////////////////////////////////////////////////////////////////////////////
     axios.request('GUET', {
      url:this.props.baseurl + '/v1/tasks/approved_count',
      headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
    })
    .then(jsonresponse => { 
      this.setState({
        task_incomplet:jsonresponse.data
      })
    })
    .catch(error => {


    });  
    //////////////////////////////////////////////////////////////////////////////////////////////
     axios.request('GUET', {
      url:this.props.baseurl + '/v1/transactions/new_invertions_count',
      headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
    })
    .then(jsonresponse => { 
      this.setState({
        new_invertion:jsonresponse.data
      })
    })
    .catch(error => {
    });  
    /////////////////////////////////////////////////////////////////////////////////////////////
     axios.request('GUET', {
      url:this.props.baseurl + '/v1/transactions/increase_capital_count',
      headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
    })
    .then(jsonresponse => { 
      this.setState({
        increase_capital:jsonresponse.data
      })
    })
    .catch(error => {
    });  
    /////////////////////////////////////////////////////////////////////////////////////////////
     axios.request('GUET', {
      url:this.props.baseurl + '/v1/users/new_month_count',
      headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
    })
    .then(jsonresponse => { 
      this.setState({
        new_user_month:jsonresponse.data
      })
    })
    .catch(error => {
    });  
  }
  get_movimiento_transacciones(){

      const bearer = 'bearer '+ this.props.userToken;

      var startdate = this.state.startdate;
      var enddate = this.state.enddate;
      var date1 = startdate.format('YYYY-MM-DD');
      var date2 = enddate.format('YYYY-MM-DD');

      axios.request('GUET', {
          url:this.props.baseurl + '/v1/graphics/graphic_rhombus?start_date='+ date1 +'&end_date='+ date2 +'',
          headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
        })
      .then(jsonresponse => { 
        const json = jsonresponse.data;
         const ctxradar = document.getElementById('Radar');
         var radarchart = new Chart(ctxradar, {
            type: 'horizontalBar',
            data: {
                labels: json.response.labels,
                datasets: [{
                    label: '',
                    data: json.response.data,
                    backgroundColor: [
                        "#4873ff",
                        "#0b387b",
                        "#6a8dff",
                        "#5448ff"
                    ],
                    borderColor: [
                        "#0b387b",
                        "#6a8dff",
                        "#5448ff",
                        "#4873ff"
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                  angleLines: { color: 'blue' } ,
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            display: false
                        }
                    }],
                     yAxes: [{
                      borderWidth:3,
                      display: false,
                      gridLines: {
                        display:false,
                        drawBorder:false,
                        tickMarkLength: 0,
                        drawTicks:false,
                        
                      },
                      ticks: {
                          beginAtZero:false,
                          min:0,
                          stepSize: 0
                      }
                    }]
                },
                legend: {
              display: false
            }
            }
         })
      })
      .catch(error => {


      });
  }

  get_proveniente_transacciones(){

    const bearer = 'bearer '+ this.props.userToken;

    var startdate = this.state.startdate;
    var enddate = this.state.enddate;
    var date1 = startdate.format('YYYY-MM-DD');
    var date2 = enddate.format('YYYY-MM-DD');

      axios.request('GUET', {
          url:this.props.baseurl + '/v1/graphics/graphic_accouns_locations?start_date='+ date1 +'&end_date='+ date2 +'',
          headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
        })
      .then(jsonresponse => { 
          
        const json = jsonresponse.data.response;

        Chart.defaults.doughnutLabels = Chart.helpers.clone(Chart.defaults.doughnut);

        var helpers = Chart.helpers;
        var defaults = Chart.defaults;

        Chart.controllers.doughnutLabels = Chart.controllers.doughnut.extend({
          updateElement: function(arc, index, reset) {
            var _this = this;
            var chart = _this.chart,
                chartArea = chart.chartArea,
                opts = chart.options,
                animationOpts = opts.animation,
                arcOpts = opts.elements.arc,
                centerX = (chartArea.left + chartArea.right) / 2,
                centerY = (chartArea.top + chartArea.bottom) / 2,
                startAngle = opts.rotation, // non reset case handled later
                endAngle = opts.rotation, // non reset case handled later
                dataset = _this.getDataset(),
                circumference = reset && animationOpts.animateRotate ? 0 : arc.hidden ? 0 : _this.calculateCircumference(dataset.data[index]) * (opts.circumference / (2.0 * Math.PI)),
                innerRadius = reset && animationOpts.animateScale ? 0 : _this.innerRadius,
                outerRadius = reset && animationOpts.animateScale ? 0 : _this.outerRadius,
                custom = arc.custom || {},
                valueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;

            helpers.extend(arc, {
              // Utility
              _datasetIndex: _this.index,
              _index: index,

              // Desired view properties
              _model: {
                x: centerX + chart.offsetX,
                y: centerY + chart.offsetY,
                startAngle: startAngle,
                endAngle: endAngle,
                circumference: circumference,
                outerRadius: outerRadius,
                innerRadius: innerRadius,
                label: valueAtIndexOrDefault(dataset.label, index, chart.data.labels[index])
              },

              draw: function () {
                var ctx = this._chart.ctx,
                    vm = this._view,
                    sA = vm.startAngle,
                    eA = vm.endAngle,
                    opts = this._chart.config.options;
                
                  var labelPos = this.tooltipPosition();
                  var segmentLabel = vm.circumference / opts.circumference * 100;
                  
                  ctx.beginPath();
                  
                  ctx.arc(vm.x, vm.y, vm.outerRadius, sA, eA);
                  ctx.arc(vm.x, vm.y, vm.innerRadius, eA, sA, true);
                  
                  ctx.closePath();
                  ctx.strokeStyle = vm.borderColor;
                  ctx.lineWidth = vm.borderWidth;
                  
                  ctx.fillStyle = vm.backgroundColor;
                  
                  ctx.fill();
                  ctx.lineJoin = 'bevel';
                  
                  if (vm.borderWidth) {
                    ctx.stroke();
                  }
                  
                  if (vm.circumference > 0.15) { // Trying to hide label when it doesn't fit in segment
                    ctx.beginPath();
                    ctx.font = helpers.fontString(opts.defaultFontSize, opts.defaultFontStyle, opts.defaultFontFamily);
                    ctx.fillStyle = "#fff";
                    ctx.textBaseline = "top";
                    ctx.textAlign = "center";
                    
                    // Round percentage in a way that it always adds up to 100%
                    ctx.fillText(segmentLabel.toFixed(0) + "%", labelPos.x, labelPos.y);
                  }
              }
            });

            var model = arc._model;
            model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : valueAtIndexOrDefault(dataset.backgroundColor, index, arcOpts.backgroundColor);
            model.hoverBackgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : valueAtIndexOrDefault(dataset.hoverBackgroundColor, index, arcOpts.hoverBackgroundColor);
            model.borderWidth = custom.borderWidth ? custom.borderWidth : valueAtIndexOrDefault(dataset.borderWidth, index, arcOpts.borderWidth);
            model.borderColor = custom.borderColor ? custom.borderColor : valueAtIndexOrDefault(dataset.borderColor, index, arcOpts.borderColor);

            // Set correct angles if not resetting
            if (!reset || !animationOpts.animateRotate) {
              if (index === 0) {
                model.startAngle = opts.rotation;
              } else {
                model.startAngle = _this.getMeta().data[index - 1]._model.endAngle;
              }

              model.endAngle = model.startAngle + model.circumference;
            }

            arc.pivot();
          }
        });

        var config = {
          type: 'doughnutLabels',
          data: {
            datasets: [{
              data: json.data,
              backgroundColor: [
                      "#0b387b",
                      "#6a8dff",
                      "#5448ff",
                      "#4873ff"
                  ],
                  hoverBackgroundColor: [
                      "#0b387b",
                      "#6a8dff",
                      "#5448ff",
                      "#4873ff"
                  ],
              label: 'Dataset 1'
            }],
            labels: json.labels
          },
          options: {
            responsive: true,
            legend: {
              position: 'top',
            },
            title: {
              display: false,
              text: 'Chart.js Doughnut Chart'
            },
            animation: {
              animateScale: true,
              animateRotate: true
            }
          }
        };

        var ctx = document.getElementById("Doughnut").getContext("2d");
        new Chart(ctx, config);
    
      })
      .catch(error => {


      }); 
  }
  get_proveniente_transacciones_x_peso(){

    const bearer = 'bearer '+ this.props.userToken;

    var startdate = this.state.startdate;
    var enddate = this.state.enddate;
    var date1 = startdate.format('YYYY-MM-DD');
    var date2 = enddate.format('YYYY-MM-DD');

      axios.request('GUET', {
          url:this.props.baseurl + '/v1/graphics/investment_by_country?start_date='+ date1 +'&end_date='+ date2 +'',
          headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
        })
      .then(jsonresponse => { 
          
        const json = jsonresponse.data.response;

        Chart.defaults.doughnutLabels = Chart.helpers.clone(Chart.defaults.doughnut);

        var helpers = Chart.helpers;
        var defaults = Chart.defaults;

        Chart.controllers.doughnutLabels = Chart.controllers.doughnut.extend({
          updateElement: function(arc, index, reset) {
            var _this = this;
            var chart = _this.chart,
                chartArea = chart.chartArea,
                opts = chart.options,
                animationOpts = opts.animation,
                arcOpts = opts.elements.arc,
                centerX = (chartArea.left + chartArea.right) / 2,
                centerY = (chartArea.top + chartArea.bottom) / 2,
                startAngle = opts.rotation, // non reset case handled later
                endAngle = opts.rotation, // non reset case handled later
                dataset = _this.getDataset(),
                circumference = reset && animationOpts.animateRotate ? 0 : arc.hidden ? 0 : _this.calculateCircumference(dataset.data[index]) * (opts.circumference / (2.0 * Math.PI)),
                innerRadius = reset && animationOpts.animateScale ? 0 : _this.innerRadius,
                outerRadius = reset && animationOpts.animateScale ? 0 : _this.outerRadius,
                custom = arc.custom || {},
                valueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;

            helpers.extend(arc, {
              // Utility
              _datasetIndex: _this.index,
              _index: index,

              // Desired view properties
              _model: {
                x: centerX + chart.offsetX,
                y: centerY + chart.offsetY,
                startAngle: startAngle,
                endAngle: endAngle,
                circumference: circumference,
                outerRadius: outerRadius,
                innerRadius: innerRadius,
                label: valueAtIndexOrDefault(dataset.label, index, chart.data.labels[index])
              },

              draw: function () {
                var ctx = this._chart.ctx,
                    vm = this._view,
                    sA = vm.startAngle,
                    eA = vm.endAngle,
                    opts = this._chart.config.options;
                
                  var labelPos = this.tooltipPosition();
                  var segmentLabel = vm.circumference / opts.circumference * 100;
                  
                  ctx.beginPath();
                  
                  ctx.arc(vm.x, vm.y, vm.outerRadius, sA, eA);
                  ctx.arc(vm.x, vm.y, vm.innerRadius, eA, sA, true);
                  
                  ctx.closePath();
                  ctx.strokeStyle = vm.borderColor;
                  ctx.lineWidth = vm.borderWidth;
                  
                  ctx.fillStyle = vm.backgroundColor;
                  
                  ctx.fill();
                  ctx.lineJoin = 'bevel';
                  
                  if (vm.borderWidth) {
                    ctx.stroke();
                  }
                  
                  if (vm.circumference > 0.15) { // Trying to hide label when it doesn't fit in segment
                    ctx.beginPath();
                    ctx.font = helpers.fontString(opts.defaultFontSize, opts.defaultFontStyle, opts.defaultFontFamily);
                    ctx.fillStyle = "#fff";
                    ctx.textBaseline = "top";
                    ctx.textAlign = "center";
                    
                    // Round percentage in a way that it always adds up to 100%
                    ctx.fillText(segmentLabel.toFixed(0) + "%", labelPos.x, labelPos.y);
                  }
              }
            });

            var model = arc._model;
            model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : valueAtIndexOrDefault(dataset.backgroundColor, index, arcOpts.backgroundColor);
            model.hoverBackgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : valueAtIndexOrDefault(dataset.hoverBackgroundColor, index, arcOpts.hoverBackgroundColor);
            model.borderWidth = custom.borderWidth ? custom.borderWidth : valueAtIndexOrDefault(dataset.borderWidth, index, arcOpts.borderWidth);
            model.borderColor = custom.borderColor ? custom.borderColor : valueAtIndexOrDefault(dataset.borderColor, index, arcOpts.borderColor);

            // Set correct angles if not resetting
            if (!reset || !animationOpts.animateRotate) {
              if (index === 0) {
                model.startAngle = opts.rotation;
              } else {
                model.startAngle = _this.getMeta().data[index - 1]._model.endAngle;
              }

              model.endAngle = model.startAngle + model.circumference;
            }

            arc.pivot();
          }
        });

        var config = {
          type: 'doughnutLabels',
          data: {
            datasets: [{
              data: json.value,
              backgroundColor: [
                      "#0b387b",
                      "#6a8dff",
                      "#5448ff",
                      "#4873ff"
                  ],
                  hoverBackgroundColor: [
                      "#0b387b",
                      "#6a8dff",
                      "#5448ff",
                      "#4873ff"
                  ],
              label: 'Dataset 1'
            }],
            labels: json.label
          },
          options: {
            responsive: true,
            legend: {
              position: 'top',
            },
            title: {
              display: false,
              text: 'Chart.js Doughnut Chart'
            },
            animation: {
              animateScale: true,
              animateRotate: true
            }
          }
        };

        var ctx2 = document.getElementById("Doughnutpeso").getContext("2d");
        new Chart(ctx2, config);
    
      })
      .catch(error => {


      }); 
  }
  get_bancos_por_cuentas(){
    let json ;
    json = JSONData.graphics.startpage[1][0]
     
     var startdate = this.state.startdate;
     var enddate = this.state.enddate;
     var date1 = startdate.format('YYYY-MM-DD');
     var date2 = enddate.format('YYYY-MM-DD');

     const bearer = 'bearer '+ this.props.userToken;

      axios.request('GET', {
          url:this.props.baseurl + '/v1/graphics/graphic_bank_deposit?start_date='+ date1 +'&end_date='+ date2 +'',
          headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
        })
      .then(jsonresponse => { 
       
          const json = jsonresponse.data.response;
          const ctxstackedBar = document.getElementById('StackedBar')

           var stackedBar = new Chart(ctxstackedBar, {
                type: 'bar',
                data: {
                    labels: json.labels,
                    datasets: [{
                        label: '',
                        data: json.data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(214, 84, 58, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                  responsive:true,
                  maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }],
                        xAxes: [{
                            barPercentage: 0.02
                        }]
                    },
                    legend: {
                      display: false
                    }
                }
            });


      
        

    
      })
      .catch(error => {


      });
  }

  get_dataadmin(){
     const bearer = 'bearer '+ this.props.userToken;
     var startdate = this.state.startdate;
     var enddate = this.state.enddate;
     var date1 = startdate.format('YYYY-MM-DD');
     var date2 = enddate.format('YYYY-MM-DD');


      axios.request('GUET', {
          url:this.props.baseurl + '/v1/graphics/graphic_rhombus?start_date='+ date1 +'&end_date='+ date2 +'',
          headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
        })
      .then(jsonresponse => { 

      })
      .catch(error => {


      });
  }

  updateGraphics() {
    this.setState({
      chart: null,
      initChart: null
    })
      let json = null
      let chart = null
      let chartProps = null
      let toUpdate = {
        dummyData: {}
      }
      var startdate = this.state.startdate;
      var enddate = this.state.enddate;
      var date1 = startdate.format('YYYY-MM-DD');
      var date2 = enddate.format('YYYY-MM-DD');
      setTimeout(() => {  
      if (this.props.scope == "admin") { 
       const bearer = 'bearer '+ this.props.userToken;
       axios.request('GET', {
          url:this.props.baseurl + '/v1/graphics/graphic_growth?start_date='+ date1 +'&end_date='+ date2 +'',
          headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
        })
      .then(jsonresponse => { 
       
       json = jsonresponse.data.response;
       console.log(jsonresponse.data.response)
         chartProps = {
          data: json.value,
          id: "line",
          dates: json.label,
          callback: this.getDataInit
        }               
                  
        toUpdate.dummyData = {
          graphics: json
        }

        chart = <ChartLine {...chartProps} />
        toUpdate.chart = chart
        this.setState(toUpdate)
        

      })  
      .catch(error => {
    
      });
      } else {

     
      }
     }, 10)  

    this.get_movimiento_transacciones()
    this.get_proveniente_transacciones()
    this.get_proveniente_transacciones_x_peso()
    this.get_bancos_por_cuentas()

    }
  render() {
    const shortcuts = {
      'Today': moment(),
      'Yesterday': moment().subtract(1, 'days')
    };
    return(
    /*Componente que se ejecutara cuando no encuentre un comonente al cual redireccionar*/
      <div className="content-inner no-padding-top no-padding-left no-padding-right">       		
  		  <div className="page-dashboard-info height-card ">
            <div className="card-user">
              <NavLink to="/pendiente">
                <h2 className="purple title-number">{this.state.pending_user}</h2>
                <label>Clientes por aprobar</label>
              </NavLink>
            </div>
            <div className="card-detail-col">
              <NavLink to="/tareasgenerales">
                <strong className="purple title-number">{this.state.task_incomplet}</strong>
                <br/>
                <span>Tareas pendientes</span>
              </NavLink>
            </div>
            <div className="card-detail-col">
            


              <div className="card-subdetail-row">
              
             <NavLink to="/usuariosgenerales">
                <ul>
                    <li>
                        <label>Total de <br/>  Usuarios</label>
                    </li>
                    <li>
                        <h2>{this.state.total_user}</h2>
                    </li>
                </ul>
             </NavLink>
              </div>
              <hr/>
              <div className="card-subdetail-row">
              <NavLink to="/usuariosgenerales">
                <ul>
                    <li>
                        <label>Nuevo <br/>  Usuarios</label>
                    </li>
                    <li>
                        <h2>{this.state.new_user_month}</h2>
                    </li>
                </ul>
              </NavLink>
              </div>
            </div>
            <div className="card-detail-col">
               <div className="card-subdetail-row">
                  <ul>
                      <li>
                          <label>Nuevas <br/>  Inversiones</label>
                      </li>
                      <li>
                          <h2>{this.state.new_invertion}</h2>
                      </li>
                  </ul>
                </div>
                <hr/>
                <div className="card-subdetail-row">
                  <ul>
                      <li>
                          <label>Aumentos <br/>  a capital</label>
                      </li>
                      <li>
                          <h2>{this.state.increase_capital}</h2>
                      </li>
                  </ul>
                </div>
            </div>
          </div>	  
        <div className="border-bottom side-margins box">
        <div className="section-filter-dash">
           <h1>Reportes </h1>
           <h3>Gráfica de Despositos diarios </h3>
          <div className="align-filter">
          <div className="col-dash">
          </div>
            <div className="col-dash">
              <ul>
                  <li>
                      <label>Desde:</label>
                  </li>
                  <li>
                    <div className="form-group">
                        <DatetimePickerTrigger
                          shortcuts={shortcuts} 
                          closeOnSelectDay ={true}
                          moment={this.state.startdate}
                          onChange={this.selectstardate}>
                          <input type="text" value={this.state.startdate.format('YYYY-MM-DD')} readOnly />
                        </DatetimePickerTrigger>
                    </div>
                  </li>
                  <li>
                      <label>Hasta:</label>
                  </li>
                  <li>
                    <div className="form-group">
                        <DatetimePickerTrigger
                          shortcuts={shortcuts} 
                          moment={this.state.enddate}
                          closeOnSelectDay ={true}
                          onChange={this.selectenddate}>
                          <input type="text" value={this.state.enddate.format('YYYY-MM-DD')} readOnly />
                        </DatetimePickerTrigger>
                    </div>
                  </li>
                  <li>
                    <a className="btn-blue blue" href="#" onClick={this.updateGraphics}> Aplicar</a>
                  </li>
              </ul>
           </div>
          </div>           
        </div>
            <div className="chart-container">
           		 {this.state.chart} 
            </div>             
        </div> 
        <div className="border-bottom side-margins box">
           <div className="grup-chart">
              <div className="block-chart">
                  <h3>Movimientos de transacciones</h3>

                  <div className="chart-container">
                    <canvas id="Radar"></canvas>
                  </div>
              </div>
              <div className="block-chart">
                  <h3>Proveniente de transacciones</h3>
                  <canvas id="Doughnut"></canvas>
              </div>
              <div className="block-chart">
              <br/>
                  <h3>Proveniente de transacciones por peso</h3>
                  <canvas id="Doughnutpeso"></canvas>
              </div>
          </div>

          
        </div>
        <div className="chart-container">

            <canvas id="StackedBar"></canvas>
          </div>
	</div>
    )
  }
}
class Dashboard extends Component {
	constructor(props){
		super(props)

		this.state = {
			      stado:0,		            
            store_uuid:null,
            title:'Inicio',
			      page:'general'
		}


		
		this.set_dasboard = this.set_dasboard.bind(this)
    
	}	
 
	componentDidMount() {  
      this.set_dasboard()

	}
	 
  set_dasboard(){
		const scope = this.props.scope;

		
      switch(scope) {
          case 'user':
            return <DashboarUser  {...this.props}/>
          case 'admin':
            return <DashboardAdmin  {...this.props}/>
          case 'moderador':
            return <DashboardAdmin  {...this.props}/>
      }
	}
	
  render(){
    
		return( 
			<Backend title={this.state.title} page={this.state.page}>
				<div className="content">
					{this.set_dasboard()}            	
				</div>
			</Backend>
			
		)
	}
}
const mapStateToProps = (state, props) => {
  return {  
    authorize: state.mainReducer.auth.authorize,
    userToken: state.mainReducer.auth.token,
    scope: state.mainReducer.auth.scope,
    email: state.mainReducer.auth.email,
    id: state.mainReducer.auth.id,
    register: state.mainReducer.auth.register,    
    type: state.mainReducer.auth.type,
    infouser: state.mainReducer.auth.infouser,
    info_cuenta: state.mainReducer.auth.info_cuenta,
    baseurl:state.mainReducer.setBaseUrl.baseurl
    
  }
}

export default withRouter(connect(mapStateToProps)(Dashboard))

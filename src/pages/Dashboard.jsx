import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Moment from 'moment';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Chart from 'chart.js';
import data from 'pages/data.json';

import Backend from 'components/Layouts/Backend';
import ChartLine from 'components/Graphics/ChartLine';
import { DatetimePickerTrigger } from 'rc-datetime-picker';

class DashboarUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Transacciones',
      page: 'general',
      menu: 'transacciones-user',
      tabla: null,
      id_cuenta: this.props.info_cuenta !== null ? this.props.info_cuenta['uuid'] : '',
      redirect: false,
    };
    this.get_transacciones = this.get_transacciones.bind(this);
    this.generate_estado = this.generate_estado.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.info_cuenta === null) {
      return false;
    } else {
      return true;
    }
  }
  componentWillMount() {
    if (this.props.scope === 'admin') {
      this.get_transacciones(1, 13);
      this.updateGraphics();
    } else {
      if (this.props.info_cuenta !== null) {
        this.get_transacciones(1, 13);
        this.updateGraphics();
      } else {
        this.setState({
          redirect: true,
        });
        switch (this.props.infouser.type_of_user) {
          case 'personality':
            this.setState({
              redirect_page: 'pnpasouno',
            });

            break;
          case 'company':
            this.setState({
              redirect_page: 'empasouno',
            });

            break;
          default:
            break;
        }
      }
    }
  }
  componentDidMount() {}

  updateGraphics() {
    this.setState({
      chart: null,
      initChart: null,
    });

    let json = null;
    let chart = null;
    let chartProps = null;
    let toUpdate = {
      dummyData: {},
    };

    setTimeout(() => {
      json = data;
      chartProps = {
        data: json.value,
        id: 'customID',
        dates: json.label,
        callback: this.getDataInit,
      };

      toUpdate.dummyData = {
        graphics: json,
      };

      chart = <ChartLine {...chartProps} />;
      toUpdate.chart = chart;
      this.setState(toUpdate);
    }, 500);
  }
  generate_estado() {
    const bearer = 'bearer ' + this.props.userToken;
    axios
      .request('GUET', {
        url: this.props.baseurl + '/v1/user_accounts/' + this.state.id_cuenta + '/pdf',
        headers: { Authorization: bearer, 'Content-Type': 'application/json' },
      })
      .then(jsonresponse => {
        // server sent the url to the file!
        // now, let's download:
        window.open(jsonresponse.data);
        // you could also do:
        //window.location.href = jsonresponse.data;
      })
      .catch(error => {});
  }
  render() {
    if (this.state.redirect) {
      return <Redirect push to={'/' + this.state.redirect_page} />;
    }
    return (
      /*Componente que se ejecutara cuando no encuentre un comonente al cual redireccionar*/
      <div className="content-inner no-padding-top no-padding-left no-padding-right">
        <div className="page-info height-card ">
          <div className="card-user">
            <strong className="purple title-number">
              {this.props.info_cuenta['initial_amount']}
            </strong>
            <br />
            <span>Saldo inicial</span>
          </div>

          <div className="card-detail-col">
            <strong className="whiteblue title-number">
              {this.props.info_cuenta['able_to_withdraw']}{' '}
            </strong>
            <br />
            <span>Total permitido a retirar</span>
          </div>

          <div className="card-detail-col">
            <strong className="whiteblue title-number">
              {this.props.info_cuenta['total_earnings']}{' '}
            </strong>
            <br />
            <span>Total de ganancia</span>
          </div>

          <div className="card-detail-col">
            <strong className="purple title-number">{this.props.info_cuenta['balance']}</strong>
            <br />
            <span>Saldo actual</span>
          </div>
        </div>
        <div className="row-card ">
          <div className="card-detail-col">
            <span>Total débitos</span>{' '}
            <strong className="whiteblue">{this.props.info_cuenta['total_debits']}</strong>
          </div>
          <div className="card-detail-col">
            <span>Rendimiento Historico</span>{' '}
            <strong className="whiteblue">{this.props.info_cuenta['account_performance']}</strong>
          </div>
          <div className="card-detail-col">
            <span>Rendimiento del mes</span>{' '}
            <strong className="purple">{this.props.info_cuenta['current_performance']}</strong>
          </div>
        </div>

        <div className="border-bottom side-margins border-chart margin50">
          <h3>Grafica de crecimiento </h3>
          <div className="chart-container">{this.state.chart}</div>
        </div>

        <div className="generate-data margin50">
          <h2 className="display-block">Transacciones de clientes</h2>

          <a href="" onClick={this.generate_estado} className="btn-generate">
            Generar estado de cuenta
          </a>
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
    );
  }
}

class DashboardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startdate: moment(),
      enddate: moment(),
      chart: null,
      useDummyData: true,
      total_user: 6,
      active_projects: 7,
      closed_projects: 124,
      new_invertion: 0,
      increase_capital: 0,
    };

    this.getDataInit = this.getDataInit.bind(this);
  }
  componentDidMount() {
    new Chart(document.getElementById('pie-chart'), {
      type: 'pie',
      data: {
        labels: ['Mujeres', 'Hombres'],
        datasets: [
          {
            label: 'Impacto entre géneros',
            backgroundColor: ['#3e95cd', '#8e5ea2'],
            data: [2478, 5267],
          },
        ],
      },
    });

    new Chart(document.getElementById('line-chart'), {
      type: 'line',
      data: {
        labels: [
          moment('05/02/2018').format('LL'),
          moment('05/07/2018').format('LL'),
          moment('05/09/2018').format('LL'),
          moment('05/14/2018').format('LL'),
          moment('05/15/2018').format('LL'),
          moment('05/16/2018').format('LL'),
          moment('05/19/2018').format('LL'),
          moment('05/22/2018').format('LL'),
          moment('05/24/2018').format('LL'),
          moment('05/26/2018').format('LL'),
        ],

        datasets: [
          {
            data: [10, 15, 18, 19, 20, 22, 25, 29, 33, 45],
            label: 'Planeado',
            borderColor: '#3e95cd',
            fill: false,
          },
          {
            data: [3, 22, 44, 30, 48, 55, 99, 103, 103, 103],
            label: 'Real',
            borderColor: '#8e5ea2',
            fill: false,
          },
        ],
      },
    });

    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 30);
    Moment.locale('en');
    var startdate = Moment(currentDate);
    setTimeout(() => {
      this.setState({
        startdate: startdate,
      });

      this.updateGraphics();
    }, 10);
  }
  getDataInit(chart) {
    this.setState({ initChart: chart });
  }

  selectstardate(startdate) {
    this.setState({
      startdate,
    });
  }
  selectenddate(enddate) {
    this.setState({
      enddate,
    });
  }
  updateGraphics() {
    this.setState({
      chart: null,
      initChart: null,
    });
    let json = null;
    let chart = null;
    let chartProps = null;
    let toUpdate = {
      dummyData: {},
    };
    var startdate = this.state.startdate;
    var enddate = this.state.enddate;
    var date1 = startdate.format('YYYY-MM-DD');
    var date2 = enddate.format('YYYY-MM-DD');
    setTimeout(() => {
      json = data;
      chartProps = {
        data: json.value,
        id: 'customID',
        dates: json.label,
        callback: this.getDataInit,
      };

      toUpdate.dummyData = {
        graphics: json,
      };

      chart = <ChartLine {...chartProps} />;
      toUpdate.chart = chart;
      this.setState(toUpdate);
    }, 10);
  }
  render() {
    const shortcuts = {
      Today: moment(),
      Yesterday: moment().subtract(1, 'days'),
    };
    return (
      /*Componente que se ejecutara cuando no encuentre un comonente al cual redireccionar*/
      <div className="content-inner no-padding-top no-padding-left no-padding-right">
        <div className="page-dashboard-info height-card ">
          <div className="card-user">
            <NavLink to="/pendiente">
              <h2 className="purple title-number">{this.state.active_projects}</h2>
              <span>Proyectos en ejecución</span>
            </NavLink>
          </div>
          <div className="card-detail-col">
            <NavLink to="/tareasgenerales">
              <strong className="purple title-number">{this.state.closed_projects}</strong>
              <br />
              <span>Proyectos cerrados</span>
            </NavLink>
          </div>
          <div className="card-detail-col">
            <div className="card-subdetail-row">
              <NavLink to="/usuariosgenerales">
                <ul>
                  <li>
                    <span>
                      Total de <br /> Usuarios
                    </span>
                  </li>
                  <li>
                    <h2>{this.state.total_user}</h2>
                  </li>
                </ul>
              </NavLink>
            </div>
            <hr />
            <div className="card-subdetail-row">
              <NavLink to="/usuariosgenerales">
                <ul>
                  <li>
                    <span>
                      Usuarios <br /> Nuevos
                    </span>
                  </li>
                  <li>
                    <h2>{this.state.new_user_month || 0}</h2>
                  </li>
                </ul>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="border-bottom side-margins box">
          <div className="section-filter-dash">
            <h1>Seguimiento</h1>
            <h3>Indicadores de proyectos</h3>
            <canvas id="line-chart" width="800" height="450" />
            <h4>Impacto entre géneros</h4>
            <canvas id="pie-chart" width="800" height="450" />
          </div>
        </div>
      </div>
    );
  }
}
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stado: 0,
      store_uuid: null,
      title: 'Inicio',
      page: 'general',
    };

    this.set_dasboard = this.set_dasboard.bind(this);
  }

  componentDidMount() {
    this.set_dasboard();
  }

  set_dasboard() {
    const scope = this.props.scope;

    switch (scope) {
      case 'user':
        return <DashboarUser {...this.props} />;
      case 'admin':
        return <DashboardAdmin {...this.props} />;
      case 'moderador':
        return <DashboardAdmin {...this.props} />;
    }
  }

  render() {
    return (
      <Backend title={this.state.title} page={this.state.page}>
        <div className="content">{this.set_dasboard()}</div>
      </Backend>
    );
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
    baseurl: state.mainReducer.setBaseUrl.baseurl,
  };
};

export default withRouter(connect(mapStateToProps)(Dashboard));

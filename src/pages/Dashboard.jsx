import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Moment from 'moment';
import { NavLink } from 'react-router-dom';
import Chart from 'chart.js';

import Backend from 'components/Layouts/Backend';

class DashboarUser extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {}

  render() {
    return <h1>User</h1>;
  }
}

class DashboardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chart: null,
      useDummyData: true,
      total_user: 6,
      active_projects: 7,
      closed_projects: 124,
      new_invertion: 0,
      increase_capital: 0,
    };
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
            data: [345, 299],
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

    Moment.locale('en');
  }

  render() {
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
      default:
        return <DashboarUser {...this.props} />;
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

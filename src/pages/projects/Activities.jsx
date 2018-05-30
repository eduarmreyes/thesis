import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Moment from 'moment';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Chart from 'chart.js';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Backend from 'components/Layouts/Backend';
import ChartLine from 'components/Graphics/ChartLine';
import JSONData from 'JSONData';

const RESOURCES_OPTIONS = [
  { id: 1, label: 'Impresora', value: 'printer', price: 25 },
  { id: 2, label: 'Equipo de Informática', value: 'computer', price: 125 },
  { id: 3, label: 'Alumnos de Facultad', value: 'alumni', price: 50 },
  { id: 4, label: 'Comida', value: 'food', price: 250 },
];

class NewProjectActivitiesUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Transacciones',
      page: 'general',
      tabla: null,
      id_cuenta: this.props.info_cuenta !== null ? this.props.info_cuenta['uuid'] : '',
      redirect: false,
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.info_cuenta === null) {
      return false;
    } else {
      return true;
    }
  }
  componentWillMount() {}
  componentDidMount() {}
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
        </div>

        <div className="page-cliente-empty-content margin50">
          <div className="table-responsive">
            <Table striped>
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
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

class NewProjectActivitiesAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: [],
      project_resources: [],
      project_resources_labels: [],
      project_activity_name: '',
    };

    this.onAdd = this.onAdd.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeMultipleSelect = this.onChangeMultipleSelect.bind(this);
  }

  componentDidMount() {}

  onAdd(e) {
    e.preventDefault();
    this.setState({
      activities: [
        ...this.state.activities,
        {
          id: this.state.activities.length,
          name: this.state.project_activity_name,
          resource: this.state.project_resources.join(', '),
          resource_label: this.state.project_resources_labels.join(', '),
        },
      ],
      // total: this.total + this
    });
    this.onCleanForm();
  }

  onCleanForm() {
    this.setState({
      project_resources: [],
      project_resources_labels: [],
      project_activity_name: '',
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onChangeMultipleSelect(e) {
    const values = Array.from(e.target.selectedOptions, o => o.value);
    this.setState({
      [e.target.name]: values,
    });
    this.setState({
      project_resources_labels: Array.from(e.target.selectedOptions, o => o.label),
    });
  }

  render() {
    const activities_table = this.state.activities.length ? (
      this.state.activities.map(activity => {
        return (
          <tr key={activity.id}>
            <td>{activity.name}</td>
            <td>{activity.resource_label}</td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan={2}>
          <div>
            <h3 className="text-center">Agregue un recurso en el formulario de arriba ⬆️</h3>
          </div>
        </td>
      </tr>
    );
    return (
      /*Componente que se ejecutara cuando no encuentre un comonente al cual redireccionar*/
      <div className="content-inner no-padding-top no-padding-left no-padding-right">
        <div className="border-bottom side-margins box">
          <h1>Actividades</h1>
          <Form onSubmit={this.onAdd}>
            <FormGroup row className="align-items-center">
              <Label for="project_activity_name" sm={2}>
                Nombre de la Actividad
              </Label>
              <Col sm={9}>
                <Input
                  required
                  type="text"
                  name="project_activity_name"
                  id="project_activity_name"
                  placeholder="Nombre de la actividad"
                  value={this.state.project_activity_name}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <h3>Recursos a usar en la actividad</h3>
            <FormGroup row className="align-items-center">
              <Label for="project-faculty" sm={2}>
                Seleccione recurso
              </Label>
              <Col sm={9}>
                <Input
                  required
                  type="select"
                  name="project_resources"
                  id="project_resources"
                  className="height100px"
                  onChange={this.onChangeMultipleSelect}
                  value={this.state.project_resources}
                  multiple
                >
                  {RESOURCES_OPTIONS.map(resource => {
                    return (
                      <option key={resource.id} value={resource.value}>
                        {resource.label}
                      </option>
                    );
                  })}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button color="primary" className="d-flex align-items-center">
                  <i className="md-icon">add</i>
                  Agregar
                </Button>
              </Col>
            </FormGroup>
          </Form>
          <hr />
          Costo Total: {this.state.total}
          <hr />
          <div className="table-responsive">
            <table>
              <thead>
                <tr className="no-cursorpointer">
                  <th> Actividad </th>
                  <th> Recursos </th>
                </tr>
              </thead>
              <tbody>{activities_table}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
class NewProjectActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stado: 0,
      store_uuid: null,
      title: 'Nuevo Proyecto',
      page: 'activities',
      menu: 'project-new',
    };
    this.set_project_view = this.set_project_view.bind(this);
  }

  componentDidMount() {
    this.set_project_view();
  }

  set_project_view() {
    const scope = this.props.scope;

    switch (scope) {
      case 'user':
        return <NewProjectActivitiesUser {...this.props} />;
      case 'admin':
        return <NewProjectActivitiesAdmin {...this.props} />;
      case 'moderador':
        return <NewProjectActivitiesAdmin {...this.props} />;
      default:
        break;
    }
  }

  render() {
    return (
      <Backend title={this.state.title} page={this.state.page} menu={this.state.menu}>
        <div className="content">{this.set_project_view()}</div>
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

export default withRouter(connect(mapStateToProps)(NewProjectActivities));

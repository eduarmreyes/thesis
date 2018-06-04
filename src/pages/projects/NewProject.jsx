import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Moment from 'moment';
import $ from 'jquery';
import Chart from 'chart.js';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Backend from 'components/Layouts/Backend';
import ChartLine from 'components/Graphics/ChartLine';
import JSONData from 'JSONData';

const UNIT_MEASUREMENT = [
  {
    id: 1,
    label: 'Personas',
  },
  {
    id: 2,
    label: 'Niños',
  },
  {
    id: 3,
    label: 'Niñas',
  },
  {
    id: 4,
    label: 'Niños y Niñas',
  },
  {
    id: 5,
    label: 'Familias',
  },
  {
    id: 6,
    label: 'Centros Educativos',
  },
  {
    id: 7,
    label: 'Mujeres',
  },
];

class NewProjectUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  componentDidMount() {}

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      /*Componente que se ejecutara cuando no encuentre un comonente al cual redireccionar*/
      <div className="content-inner no-padding-top no-padding-left no-padding-right">
        <div className="border-bottom side-margins box">
          <Form>
            <FormGroup row className="align-items-center">
              <Label for="project_name" sm={2}>
                Nombre
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  name="project_name"
                  id="project_name"
                  placeholder="Nombre del Proyecto"
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_name" sm={2}>
                Fecha Inicio
              </Label>
              <Col sm={9}>
                <Input
                  type="date"
                  name="project_start_date"
                  id="project_start_date"
                  placeholder="Fecha Inicio del Proyecto"
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_name" sm={2}>
                Fecha Fin
              </Label>
              <Col sm={9}>
                <Input
                  type="date"
                  name="project_end_date"
                  id="project_end_date"
                  placeholder="Fecha Fin del Proyecto"
                />
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button color="primary">Guardar</Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

class NewProjectAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logframes: [],
      project_logframes: [],
      project_logframes_labels: [],
      project_general_objective: '',
      project_means_verification: '',
      project_risk_assumptions: '',
    };

    this.onAdd = this.onAdd.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {}

  onAdd(e) {
    e.preventDefault();
    this.setState({
      logframes: [
        ...this.state.logframes,
        {
          id: this.state.logframes.length,
          objective: this.state.project_general_objective,
          means_verification: this.state.project_means_verification,
          risk_assumptions: this.state.project_risk_assumptions,
        },
      ],
    });
    this.onCleanForm();
  }

  onCleanForm() {
    this.setState({
      project_logframes: [],
      project_logframes_labels: [],
      project_general_objective: '',
      project_means_verification: '',
      project_risk_assumptions: '',
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const logframes_table = this.state.logframes.length ? (
      this.state.logframes.map(logframe => {
        return (
          <tr key={logframe.id}>
            <td>{logframe.objective}</td>
            <td>{logframe.means_verification}</td>
            <td>{logframe.risk_assumptions}</td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan={2}>
          <div>
            <h3 className="text-center">Agregue la información en el formulario de arriba ⬆️</h3>
          </div>
        </td>
      </tr>
    );
    return (
      /*Componente que se ejecutara cuando no encuentre un comonente al cual redireccionar*/
      <div className="content-inner no-padding-top no-padding-left no-padding-right">
        <div className="border-bottom side-margins box">
          <h3>Objetivo General e Indicador del Objetivo General</h3>
          <Form onSubmit={this.onAdd}>
            <FormGroup row className="align-items-center">
              <Label for="project_general_objective" sm={2}>
                Objetivo General
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_general_objective"
                  id="project_general_objective"
                  placeholder="Objetivo General"
                  value={this.state.project_general_objective}
                  onChange={this.onChange}
                />
              </Col>
              <Label for="project_general_objective" sm={2}>
                Indicador Objetivo General
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_general_objective"
                  id="project_general_objective"
                  placeholder="Indicador del Objetivo General"
                  value={this.state.project_general_objective}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label className="muted" sm={2}>
                Información Granular del Indicador del Objetivo General
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="give-me-space-between"
                  type="number"
                  name="project_general_objective_kpi_quantity"
                  id="project_general_objective_kpi_quantity"
                  placeholder="Valor del Indicador"
                  value={this.state.project_general_objective_kpi_quantity}
                  onChange={this.onChange}
                />
                <Input
                  required
                  className="give-me-space-between"
                  type="select"
                  name="project_general_objective_kpi_unit_measurement"
                  id="project_general_objective_kpi_unit_measurement"
                  placeholder="Unidad de Medida"
                  value={this.state.project_general_objective_kpi_unit_measurement}
                  onChange={this.onChange}
                >
                  <option value="">Seleccione Opción</option>
                  {UNIT_MEASUREMENT.map(unit => {
                    return (
                      <option key={unit.id} value={unit.id}>
                        {unit.label}
                      </option>
                    );
                  })}
                </Input>
                <Input
                  required
                  className="give-me-space-between"
                  type="text"
                  name="project_general_objective_kpi_variable"
                  id="project_general_objective_kpi_variable"
                  placeholder="Variable"
                  value={this.state.project_general_objective_kpi_variable}
                  onChange={this.onChange}
                />
                <Input
                  required
                  className="give-me-space-between"
                  type="date"
                  name="project_general_objective_kpi_date"
                  id="project_general_objective_kpi_date"
                  placeholder="Variable"
                  value={this.state.project_general_objective_kpi_date}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_general_objective" sm={2}>
                Objetivo Específico
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_especifico_objective"
                  id="project_especifico_objective"
                  placeholder="Objetivo Específico"
                  value={this.state.project_especifico_objective}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_means_verification" sm={2}>
                Medio de Verificación
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_means_verification"
                  id="project_means_verification"
                  placeholder="Medio de Verificación"
                  value={this.state.project_means_verification}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_risk_assumptions" sm={2}>
                Supuesto
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_risk_assumptions"
                  id="project_risk_assumptions"
                  placeholder="Medio de Verificación"
                  value={this.state.project_risk_assumptions}
                  onChange={this.onChange}
                />
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
          <div className="table-responsive">
            <table>
              <thead>
                <tr className="no-cursorpointer">
                  <th> Objetivo </th>
                  <th> Medios de Verificación </th>
                  <th> Supuesto </th>
                </tr>
              </thead>
              <tbody>{logframes_table}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stado: 0,
      store_uuid: null,
      title: 'Nuevo Proyecto - Matriz Marco Lógico',
      page: 'logframe',
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
        return <NewProjectUser {...this.props} />;
      case 'admin':
        return <NewProjectAdmin {...this.props} />;
      case 'moderador':
        return <NewProjectAdmin {...this.props} />;
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

export default withRouter(connect(mapStateToProps)(NewProject));

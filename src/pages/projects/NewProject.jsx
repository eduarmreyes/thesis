import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Moment from 'moment';
import $ from 'jquery';
import Chart from 'chart.js';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Select from 'react-select/lib/Select';
import CreatableSelect from 'react-select/lib/Creatable';

import 'bootstrap/dist/css/bootstrap.min.css';

import Backend from 'components/Layouts/Backend';
import ChartLine from 'components/Graphics/ChartLine';
import JSONData from 'JSONData';

const UNIT_MEASUREMENT = [
  {
    id: 1,
    label: 'Personas',
    value: 'Personas',
  },
  {
    id: 2,
    label: 'Niños',
    value: 'Niños',
  },
  {
    id: 3,
    label: 'Niñas',
    value: 'Niñas',
  },
  {
    id: 4,
    label: 'Niños y Niñas',
    value: 'Niños y Niñas',
  },
  {
    id: 5,
    label: 'Familias',
    value: 'Familias',
  },
  {
    id: 6,
    label: 'Centros Educativos',
    value: 'Centros Educativos',
  },
  {
    id: 7,
    label: 'Mujeres',
    value: 'Mujeres',
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
      project_general_objective_kpi_unit_measurement: '',

      // Activities State
      activities: [],
      project_resources: [],
      project_resources_labels: [],
      project_activity_name: '',
      total: 0,
      RESOURCES_OPTIONS: [],
    };

    this.onAdd = this.onAdd.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeSelection = this.onChangeSelection.bind(this);
    this.onAddActivities = this.onAddActivities.bind(this);
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: this.props.baseurl + '/ResourceType/GetAll',
      contentType: 'application/json',
      dataType: 'json',
      success: response => {
        this.setState({
          RESOURCES_OPTIONS: response,
        });
      },
      error: response => {
        console.log(response.data);
      },
    });
  }

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

  onAddActivities(e) {
    e.preventDefault();
    this.setState({
      activities: [
        ...this.state.activities,
        {
          id: this.state.activities.length,
          name: this.state.project_activity_name,
          resource: this.state.project_resources.join(', '),
          resource_label: this.state.project_resources_labels.join(', '),
          cost: parseInt(this.state.project_activity_budget),
        },
      ],
      total: parseInt(this.state.total) + parseInt(this.state.project_activity_budget),
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

  onSelectInputChange(inputValue, actionMeta) {}

  onChangeSelection(e) {
    this.setState({
      project_general_objective_kpi_unit_measurement: e,
    });
  }

  render() {
    const activities_table = this.state.activities.length ? (
      this.state.activities.map(activity => {
        return (
          <tr key={activity.id}>
            <td>{activity.name}</td>
            <td>{activity.resource_label}</td>
            <td>
              {activity.cost.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </td>
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
          <h1>Objetivo General</h1>
          <Form onSubmit={e => e.preventDefault()}>
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
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_general_objective_kpi" sm={2}>
                Indicador Objetivo General
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_general_objective_kpi"
                  id="project_general_objective_kpi"
                  placeholder="Indicador del Objetivo General"
                  value={this.state.project_general_objective_kpi}
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
                <CreatableSelect
                  required
                  isClearable
                  className="give-me-space-between"
                  name="project_general_objective_kpi_unit_measurement"
                  value={this.state.project_general_objective_kpi_unit_measurement}
                  onChange={this.onChangeSelection}
                  onInputChange={this.onSelectInputChange}
                  options={UNIT_MEASUREMENT}
                />
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
              <Label for="project_general_objective_means_of_verification" sm={2}>
                Medio de Verificación del Objetivo General
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_general_objective_means_of_verification"
                  id="project_general_objective_means_of_verification"
                  placeholder="Medios de Verificación del Objetivo General"
                  value={this.state.project_general_objective_means_of_verification}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_general_objective_risks" sm={2}>
                Supuesto del Objetivo General
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_general_objective_risks"
                  id="project_general_objective_risks"
                  placeholder="Supuesto del Objetivo General"
                  value={this.state.project_general_objective_risks}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 11 }}>
                <Button color="primary" className="d-flex align-items-center ml-auto">
                  <i className="md-icon">add</i>
                  Agregar Objetivo General
                </Button>
              </Col>
            </FormGroup>
          </Form>
          <h1>Objetivos Específicos</h1>
          <Form onSubmit={e => e.preventDefault()} className="opacity-5 p-events-none">
            <FormGroup row className="align-items-center">
              <Label for="project_specific_objective" sm={2}>
                Objetivo Específico
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_specific_objective"
                  id="project_specific_objective"
                  placeholder="Objetivo Específico"
                  value={this.state.project_specific_objective}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_specific_objective_kpi" sm={2}>
                Indicador Objetivo Específico
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_specific_objective_kpi"
                  id="project_specific_objective_kpi"
                  placeholder="Indicador del Objetivo Específico"
                  value={this.state.project_specific_objective_kpi}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label className="muted" sm={2}>
                Información Granular del Indicador del Objetivo Específico
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="give-me-space-between"
                  type="number"
                  name="project_specific_objective_kpi_quantity"
                  id="project_specific_objective_kpi_quantity"
                  placeholder="Valor del Indicador"
                  value={this.state.project_specific_objective_kpi_quantity}
                  onChange={this.onChange}
                />
                <CreatableSelect
                  required
                  isClearable
                  className="give-me-space-between"
                  name="form-field-name"
                  value={this.state.project_specific_objective_kpi_unit_measurement}
                  onChange={this.onChangeSelection}
                  onInputChange={this.onSelectInputChange}
                  options={UNIT_MEASUREMENT}
                />
                <Input
                  required
                  className="give-me-space-between"
                  type="text"
                  name="project_specific_objective_kpi_variable"
                  id="project_specific_objective_kpi_variable"
                  placeholder="Variable"
                  value={this.state.project_specific_objective_kpi_variable}
                  onChange={this.onChange}
                />
                <Input
                  required
                  className="give-me-space-between"
                  type="date"
                  name="project_specific_objective_kpi_date"
                  id="project_specific_objective_kpi_date"
                  placeholder="Variable"
                  value={this.state.project_specific_objective_kpi_date}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_specific_objective_means_of_verification" sm={2}>
                Medio de Verificación del Objetivo Específico
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_specific_objective_means_of_verification"
                  id="project_specific_objective_means_of_verification"
                  placeholder="Medios de Verificación del Objetivo Específico"
                  value={this.state.project_specific_objective_means_of_verification}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_specific_objective_risks" sm={2}>
                Supuesto del Objetivo Específico
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_specific_objective_risks"
                  id="project_specific_objective_risks"
                  placeholder="Supuesto del Objetivo Específico"
                  value={this.state.project_especifico_objective_risks}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 11 }}>
                <Button color="primary" className="d-flex align-items-center ml-auto">
                  <i className="md-icon">add</i>
                  Agregar Objetivo Específico
                </Button>
              </Col>
            </FormGroup>
          </Form>
          <h1>Resultados</h1>
          <Form onSubmit={e => e.preventDefault()} className="opacity-5 p-events-none">
            <FormGroup row className="align-items-center">
              <Label for="project_result" sm={2}>
                Resultado
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_result"
                  id="project_result"
                  placeholder="Resultado"
                  value={this.state.project_result}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_result_kpi" sm={2}>
                Indicador Resultado
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_result_kpi"
                  id="project_result_kpi"
                  placeholder="Indicador del Resultado"
                  value={this.state.project_result_kpi}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label className="muted" sm={2}>
                Información Granular del Indicador del Resultado
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="give-me-space-between"
                  type="number"
                  name="project_result_kpi_quantity"
                  id="project_result_kpi_quantity"
                  placeholder="Valor del Indicador"
                  value={this.state.project_result_kpi_quantity}
                  onChange={this.onChange}
                />
                <CreatableSelect
                  required
                  isClearable
                  className="give-me-space-between"
                  name="form-field-name"
                  value={this.state.project_result_kpi_unit_measurement}
                  onChange={this.onChangeSelection}
                  onInputChange={this.onSelectInputChange}
                  options={UNIT_MEASUREMENT}
                />
                <Input
                  required
                  className="give-me-space-between"
                  type="text"
                  name="project_result_kpi_variable"
                  id="project_result_kpi_variable"
                  placeholder="Variable"
                  value={this.state.project_result_kpi_variable}
                  onChange={this.onChange}
                />
                <Input
                  required
                  className="give-me-space-between"
                  type="date"
                  name="project_result_kpi_date"
                  id="project_result_kpi_date"
                  placeholder="Variable"
                  value={this.state.project_result_kpi_date}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_result_means_of_verification" sm={2}>
                Medio de Verificación del Resultado
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_result_means_of_verification"
                  id="project_result_means_of_verification"
                  placeholder="Medios de Verificación del Resultado"
                  value={this.state.project_result_means_of_verification}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_result_risks" sm={2}>
                Supuesto del Resultado
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_result_risks"
                  id="project_result_risks"
                  placeholder="Supuesto del Resultado"
                  value={this.state.project_especifico_objective_risks}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 11 }}>
                <Button color="primary" className="d-flex align-items-center ml-auto">
                  <i className="md-icon">add</i>
                  Agregar Resultado
                </Button>
              </Col>
            </FormGroup>
          </Form>
          <h1>Actividades</h1>
          <Form onSubmit={this.onAddActivities} className="opacity-5 p-events-none">
            <FormGroup row className="align-items-center">
              <Label for="project_activity_name" sm={2}>
                Resultado de la Actividad
              </Label>
              <Col sm={9}>
                <Select
                  defaultValue=""
                  isClearable
                  isSearchable
                  name="project_activity_resource"
                  options={UNIT_MEASUREMENT}
                />
              </Col>
            </FormGroup>
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
            <FormGroup row className="align-items-center">
              <Label for="project_activity_start_date" sm={2}>
                Fecha de Inicio de la Actividad
              </Label>
              <Col sm={9}>
                <Input
                  required
                  type="date"
                  name="project_activity_start_date"
                  id="project_activity_start_date"
                  placeholder="Nombre de la actividad"
                  value={this.state.project_activity_start_date}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_activity_end_date" sm={2}>
                Fecha Fin de la Actividad
              </Label>
              <Col sm={9}>
                <Input
                  required
                  type="text"
                  name="project_activity_end_date"
                  id="project_activity_end_date"
                  placeholder="Nombre de la actividad"
                  value={this.state.project_activity_end_date}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <h3>Recursos a utilizarse en la actividad</h3>
            <FormGroup row className="align-items-center">
              <Label for="project-faculty" sm={2}>
                Seleccione los recursos a utilizarse
              </Label>
              <Col sm={9}>
                <Select
                  name="project_resources"
                  id="project_resources"
                  onChange={this.onChangeMultipleSelect}
                  value={this.state.project_resources}
                  options={this.state.RESOURCES_OPTIONS}
                  isClearable
                  isSearchable
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_resources_quantity" sm={2}>
                Cantidad
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  name="project_resources_quantity"
                  id="project_resources_quantity"
                  placeholder="Cantidad de Recurso"
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_resources_quantity" sm={2}>
                Unidad de Medida
              </Label>
              <Col sm={9}>
                <Select
                  name="project_resources"
                  id="project_resources"
                  onChange={this.onChangeMultipleSelect}
                  value={this.state.project_resources}
                  options={this.state.RESOURCES_OPTIONS}
                  isClearable
                  isSearchable
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_resources_unit_price" sm={2}>
                Precio Unitario
              </Label>
              <Col sm={9}>
                <Input
                  type="number"
                  name="project_resources_unit_price"
                  id="project_resources_unit_price"
                  placeholder="Precio Unitario"
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label sm={2}>Entidad que proporciona el recurso</Label>
              <Col sm={4}>
                <div className="pretty p-default p-round">
                  <input
                    type="radio"
                    required
                    id="project_resources_entity_uees"
                    name="project_resources_entity"
                    checked={
                      typeof this.state.project_resources_entity !== 'undefined'
                        ? this.state.project_resources_entity === 'uees'
                        : false
                    }
                    value="uees"
                    onChange={this.onChange}
                  />
                  <div className="state">
                    <label>Universidad Evangélica (UEES)</label>
                  </div>
                </div>
              </Col>
              <Col sm={4}>
                <div className="pretty p-default p-round">
                  <input
                    type="radio"
                    required
                    id="project_resources_entity_other_one"
                    name="project_resources_entity"
                    checked={
                      typeof this.state.project_resources_entity !== 'undefined'
                        ? this.state.project_resources_entity === 'other'
                        : false
                    }
                    value="other"
                    onChange={this.onChange}
                  />
                  <div className="state">
                    <label>Institución Contraparte</label>
                  </div>
                </div>
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 11 }}>
                <Button color="primary" className="d-flex align-items-center ml-auto">
                  <i className="md-icon">add</i>
                  Agregar Actividad
                </Button>
              </Col>
            </FormGroup>
            <hr />
            Costo Total:{' '}
            {parseInt(this.state.total).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
            <hr />
          </Form>
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

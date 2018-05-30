import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Moment from 'moment';
import $ from 'jquery';
import { NavLink } from 'react-router-dom';
import Chart from 'chart.js';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Backend from 'components/Layouts/Backend';
import ChartLine from 'components/Graphics/ChartLine';
import JSONData from 'JSONData';

class NewProjectUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabla: null,
      id_cuenta: this.props.info_cuenta !== null ? this.props.info_cuenta['uuid'] : '',
      redirect: false,
    };
    this.onChangeMultipleSelect = this.onChangeMultipleSelect.bind(this);
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

  onChangeMultipleSelect(e) {
    const values = Array.from(e.target.selectedOptions, o => o.value);
    this.setState({
      [e.target.name]: values,
    });
    this.setState({
      project_faculty_labels: Array.from(e.target.selectedOptions, o => o.label),
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={'/' + this.state.redirect_page} />;
    }

    return (
      /*Componente que se ejecutara cuando no encuentre un comonente al cual redireccionar*/
      <div className="content-inner no-padding-top no-padding-left no-padding-right">
        <div className="border-bottom side-margins box">
          <h1>Nuevo Proyecto</h1>
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
      project_faculty: [],
      project_faculty_labels: [],
      project_name: '',
      KNOWLEDGE_AREA: [],
      ODS: [],
      FACULTY_OPTIONS: [],
      LINE: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeMultipleSelect = this.onChangeMultipleSelect.bind(this);
  }
  componentDidMount() {
    $.ajax({
      type: "GET",
      url: this.props.baseurl + "/KnowledgeArea/GetAll",
      contentType: "application/json",
      dataType: "json",
      success: (response) => {
        this.setState({
          KNOWLEDGE_AREA: response
        });
      },
      error: (response) => {
        console.log(response.data);
      }
    });
    $.ajax({
      type: "GET",
      url: this.props.baseurl + "/DevelopmentObjective/GetAll",
      contentType: "application/json",
      dataType: "json",
      success: (response) => {
        this.setState({
          ODS: response
        });
      },
      error: (response) => {
        console.log(response.data);
      }
    });
    $.ajax({
      type: "GET",
      url: this.props.baseurl + "/InvestigationLine/GetAll",
      contentType: "application/json",
      dataType: "json",
      success: (response) => {
        this.setState({
          LINE: response
        });
      },
      error: (response) => {
        console.log(response.data);
      }
    });
    $.ajax({
      type: "GET",
      url: this.props.baseurl + "/Faculty/GetAll",
      contentType: "application/json",
      dataType: "json",
      success: (response) => {
        this.setState({
          FACULTY_OPTIONS: response
        });
      },
      error: (response) => {
        console.log(response.data);
      }
    });
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
      project_faculty_labels: Array.from(e.target.selectedOptions, o => o.label),
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(e);
  }

  render() {
    return (
      /*Componente que se ejecutara cuando no encuentre un comonente al cual redireccionar*/
      <div className="content-inner no-padding-top no-padding-left no-padding-right">
        <div className="border-bottom side-margins box">
          <h1>Nuevo Proyecto</h1>
          <Form onSubmit={this.onSubmit}>
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
                  value={this.state.project_name}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_name" sm={2}>
                Área del Conocimiento
              </Label>
              <Col sm={9}>
                <Input
                  type="select"
                  name="project_knowledge_area"
                  id="project_knowledge_area"
                  className="height100px"
                  onChange={this.onChangeMultipleSelect}
                  value={this.state.project_resources}
                >
                  {this.state.KNOWLEDGE_AREA.map(knowledge_area => {
                    return (
                      <option key={knowledge_area.id} value={knowledge_area.id}>
                        {knowledge_area.knowledgeAreaName}
                      </option>
                    );
                  })}
                </Input>
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
            <FormGroup row className="align-items-center">
              <Label for="project-faculty" sm={2}>
                Facultad
              </Label>
              <Col sm={9}>
                <Input
                  required
                  type="select"
                  name="project_faculty"
                  id="project_faculty"
                  className="height100px"
                  onChange={this.onChangeMultipleSelect}
                  value={this.state.project_faculty}
                >
                  {this.state.FACULTY_OPTIONS.map(faculty => {
                    return (
                      <option key={faculty.id} value={faculty.value}>
                        {faculty.facultyName}
                      </option>
                    );
                  })}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project-faculty" sm={2}>
                Línea
              </Label>
              <Col sm={9}>
                <Input
                  required
                  type="select"
                  name="project_faculty"
                  id="project_faculty"
                  className="height100px"
                  onChange={this.onChangeMultipleSelect}
                  value={this.state.project_faculty}
                >
                  {this.state.LINE.map(line => {
                    return (
                      <option key={line.id} value={line.value}>
                        {line.lineName}
                      </option>
                    );
                  })}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project-faculty" sm={2}>
                ODS
              </Label>
              <Col sm={9}>
                <Input
                  required
                  type="select"
                  name="project_faculty"
                  id="project_faculty"
                  className="height100px"
                  onChange={this.onChangeMultipleSelect}
                  value={this.state.project_faculty}
                >
                  {this.state.ODS.map(ods => {
                    return (
                      <option key={ods.id} value={ods.value}>
                        {ods.objectiveName}
                      </option>
                    );
                  })}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project-coordinador" sm={2}>
                Coordinador
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  name="project-coordinador"
                  id="project-coordinador"
                  placeholder="Coordinador del Proyecto"
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project-responsible-team" sm={2}>
                Equipo Responsable
              </Label>
              <Col sm={9}>
                <Input
                  type="textarea"
                  className="height-100px"
                  rows="4"
                  name="project-responsible-team"
                  id="project-responsible-team"
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_institucion" sm={2}>
                Institución contraparte
              </Label>
              <Col sm={9}>
                <Input
                  type="textarea"
                  className="height-100px"
                  rows="4"
                  name="project_institucion"
                  id="project_institucion"
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
class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stado: 0,
      store_uuid: null,
      title: 'Nuevo Proyecto',
      page: 'general',
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

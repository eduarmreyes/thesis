import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Moment from 'moment';
import axios from 'axios';
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

  componentDidMount() {}

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
              <Label for="project-name" sm={2}>
                Nombre
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  name="project-name"
                  id="project-name"
                  placeholder="Nombre del Proyecto"
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project-name" sm={2}>
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
              <Label for="project-name" sm={2}>
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
      startdate: moment(),
      enddate: moment(),
      chart: null,
      useDummyData: true,
      total_user: 6,
      active_projects: 7,
      closed_projects: 124,
      new_invertion: 0,
      increase_capital: 0,
      activeTab: '1',
    };
  }
  componentDidMount() {}
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
  render() {
    return (
      /*Componente que se ejecutara cuando no encuentre un comonente al cual redireccionar*/
      <div className="content-inner no-padding-top no-padding-left no-padding-right">
        <div className="border-bottom side-margins box">
          <h1>Nuevo Proyecto</h1>
          <Form>
            <FormGroup row className="align-items-center">
              <Label for="project-name" sm={2}>
                Nombre
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  name="project-name"
                  id="project-name"
                  placeholder="Nombre del Proyecto"
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project-name" sm={2}>
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
              <Label for="project-name" sm={2}>
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
                <Input type="select" name="project-faculty" id="project-faculty">
                  <option>Seleccione una Facultad</option>
                  <option value="Ingenieria">Ingeniería</option>
                  <option value="Salud">Salud</option>
                  <option value="Cosito">Cosito</option>
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
                  rows="4"
                  name="project-responsible-team"
                  id="project-responsible-team"
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
      title: 'Inicio',
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

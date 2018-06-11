import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import Backend from 'components/Layouts/Backend';

import 'bootstrap/dist/css/bootstrap.min.css';

class NewProjectDataUser extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {}
  render() {
    return <h1>User</h1>;
  }
}

class NewProjectDataAdmin extends Component {
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
          <h1>Perfil del Proyecto</h1>
          <Form>
            <FormGroup row className="align-items-center">
              <Label for="project-total-people" sm={2}>
                Población beneficiaria
              </Label>
              <Col sm={9}>
                <Input
                  required
                  type="number"
                  name="project-total-people"
                  id="project-total-people"
                  placeholder="Población Total"
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project-men-percentage" sm={2}>
                Porcentaje de Hombres
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  name="project-men-percentage"
                  id="project-men-percentage"
                  placeholder="Porcentaje de Hombres en plan"
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project-women-percentage" sm={2}>
                Porcentaje de Mujeres
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  name="project-women-percentage"
                  id="project-women-percentage"
                  placeholder="Porcentaje de Mujeres en plan"
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project-geographic-area" sm={2}>
                Área Geográfica
              </Label>
              <Col sm={9}>
                <Input
                  type="textarea"
                  className="height-100px"
                  rows="4"
                  name="project-geographic-area"
                  id="project-geographic-area"
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project-presentation" sm={2}>
                Presentación
              </Label>
              <Col sm={9}>
                <Input
                  type="textarea"
                  className="height-100px"
                  rows="4"
                  name="project-presentation"
                  id="project-presentation"
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project-background" sm={2}>
                Antecedentes
              </Label>
              <Col sm={9}>
                <Input
                  type="textarea"
                  className="height-100px"
                  rows="4"
                  name="project-background"
                  id="project-background"
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project-justification" sm={2}>
                Justificación
              </Label>
              <Col sm={9}>
                <Input
                  type="textarea"
                  className="height-100px"
                  rows="4"
                  name="project-justification"
                  id="project-justification"
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
class NewProjectData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stado: 0,
      store_uuid: null,
      title: 'Nuevo Proyecto - Datos del Proyecto',
      page: 'data',
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
        return <NewProjectDataUser {...this.props} />;
      case 'admin':
        return <NewProjectDataAdmin {...this.props} />;
      case 'moderador':
        return <NewProjectDataAdmin {...this.props} />;
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

export default withRouter(connect(mapStateToProps)(NewProjectData));

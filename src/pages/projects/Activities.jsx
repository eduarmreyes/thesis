import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import $ from 'jquery';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Backend from 'components/Layouts/Backend';

class NewProjectActivitiesUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Transacciones',
      page: 'general',
      tabla: null,
      id_cuenta: this.props.info_cuenta !== null ? this.props.info_cuenta['uuid'] : '',
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
    return <h1>User</h1>;
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
      total: 0,
      RESOURCES_OPTIONS: [],
    };

    this.onAdd = this.onAdd.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeMultipleSelect = this.onChangeMultipleSelect.bind(this);
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
      activities: [
        ...this.state.activities,
        {
          id: this.state.activities.length,
          name: this.state.project_activity_name,
          resource: this.state.project_resources.join(', '),
          resource_label: this.state.project_resources_labels.join(', '),
          cost: parseInt(this.state.project_activity_budget, 10),
        },
      ],
      total: parseInt(this.state.total, 10) + parseInt(this.state.project_activity_budget, 10),
    });
    this.onCleanForm();
  }

  onCleanForm() {
    this.setState({
      project_resources: [],
      project_resources_labels: [],
      project_activity_name: '',
      project_activity_budget: '',
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
            <h3 className="text-center">
              Agregue un recurso en el formulario de arriba{' '}
              <span role="img" aria-label="Up emoji">
                ⬆️
              </span>
            </h3>
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
            <FormGroup row className="align-items-center">
              <Label for="project_activity_budget" sm={2}>
                Presupuesto para la actividad
              </Label>
              <Col sm={9}>
                <Input
                  required
                  type="text"
                  name="project_activity_budget"
                  id="project_activity_budget"
                  placeholder="Costo por esta actividad"
                  value={this.state.project_activity_budget}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <h3>Recursos a usar en la actividad</h3>
            <FormGroup row className="align-items-center">
              <Label for="project-faculty" sm={2}>
                Seleccione los recursos a usar
              </Label>
              <Col sm={9}>
                <Input
                  type="select"
                  name="project_resources"
                  id="project_resources"
                  className="height100px"
                  onChange={this.onChangeMultipleSelect}
                  value={this.state.project_resources}
                  multiple
                >
                  {this.state.RESOURCES_OPTIONS.map(resource => {
                    return (
                      <option key={resource.id} value={resource.id}>
                        {resource.resourceName}
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
          Costo Total:{' '}
          {parseInt(this.state.total, 10).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
          <hr />
          <div className="table-responsive">
            <table>
              <thead>
                <tr className="no-cursorpointer">
                  <th> Actividad </th>
                  <th> Recursos </th>
                  <th> Costo </th>
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
      title: 'Proyecto',
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

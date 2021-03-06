import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import $ from "jquery";
import moment from "moment";

import "assets/css/pages/general.css";
import Backend from "components/Layouts/Backend";

class General extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Lista de Proyectos",
      page: "general",
      tabla: null,
      pagina: 1,
      total_page: 1,
      next: "",
      back: "",
      list_min: [],
      list_max: [],
      listactualpage: "",
      listmin: "",
      listmax: "",
      pagination: "",
      per_page: "",
      filter: false,
      startdate: moment(),
      enddate: moment(),
      task: false,
      overlay_task_confirm: false
    };
    this.get_projects = this.get_projects.bind(this);
    this.onChange = this.onChange.bind(this);
    this.updateKPI = this.updateKPI.bind(this);
    this.updateActivities = this.updateActivities.bind(this);
    this.select_project = this.select_project.bind(this);
  }
  componentDidMount() {
    this.get_projects(1, 13);
  }
  updateKPI(e, projectID, projectMatrixID) {
    e.preventDefault();
    this.props.history.push(
      "/updateKPIToProject/" + projectID + "-" + projectMatrixID
    );
  }
  updateActivities(e, projectID, projectMatrixID) {
    e.preventDefault();
    this.props.history.push(
      "/updateActivitiesToProject/" + projectID + "-" + projectMatrixID
    );
  }
  select_project(e, id) {
    e.preventDefault();
    sessionStorage.setItem("currentProjectID", id);
  }
  get_projects(page, per_page) {
    $.ajax({
      type: "GET",
      url: this.props.baseurl + "/Project/GetAll",
      contentType: "application/json",
      dataType: "json",
      success: response => {
        let content;

        this.setState({
          data: response
        });

        content = response.map((project, index) => {
          if (project.projectProfile.projectName === "") {
            return false;
          }
        });
        this.setState({
          tabla: content
        });
      },
      error: response => {
        console.log(response.data);
      }
    });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
      <Backend title={this.state.title} page={this.state.page}>
        <div className="page-cliente-empty">
          <p className="text-align-right">
            <Link className="btn btn-primary" to="/project-new">
              Crear Proyecto
            </Link>
          </p>
          <div className="table-responsive">
            <table>
              <thead>
                <tr className="heading" className="no-cursorpointer">
                  <th>Nombre del Proyecto</th>
                  <th>Coordinador</th>
                  <th>Fecha Final</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr key={1} className="no-cursorpointer">
                  <td>
                    <div className="title-wrapper">
                      <div className="title">{"Salud bucal en los niños"}</div>
                    </div>
                  </td>
                  <td>
                    <div className="key-value">
                      <div className="avatar" />
                      <strong>{"Manuel García"}</strong>
                    </div>
                  </td>
                  <td>
                    <div className="key-value">
                      <div className="avatar" />
                      <strong>{moment().format("LL")}</strong>
                    </div>
                  </td>
                  <td className="actions min-width">
                    <div className="button-group">
                      <a
                        className="button"
                        href="#"
                        onClick={e => {
                          this.updateKPI(e, 1, 1);
                        }}
                      >
                        Reportar Avance de Indicadores
                      </a>
                    </div>
                    <div className="button-group">
                      <a
                        className="button"
                        href="#"
                        onClick={e => {
                          this.updateActivities(e, 1, 1);
                        }}
                      >
                        Reportar Avance de Actividades
                      </a>
                    </div>
                    <div className="button-group">
                      <a
                        className="button"
                        href="#"
                        onClick={e => {
                          this.select_project(e, 1);
                        }}
                      >
                        Editar
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
    infouser: state.mainReducer.auth.infouser,
    info_cuenta: state.mainReducer.auth.info_cuenta,
    baseurl: state.mainReducer.setBaseUrl.baseurl
  };
};

export default withRouter(connect(mapStateToProps)(General));

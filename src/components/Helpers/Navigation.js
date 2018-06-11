import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class NavigationUser extends Component {
  render() {
    return (
      <ul>
        <li>
          <NavLink to="/project-new" exact={true} className="highlighted" activeClassName="active">
            <i className="md-icon">add</i> <span>Crear Proyecto</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" exact={true} activeClassName="active">
            <i className="md-icon">home</i> <span>Inicio</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/project-list" activeClassName="active">
            <i className="md-icon">format_list_bulleted</i> <span>Proyectos</span>
          </NavLink>
        </li>
      </ul>
    );
  }
}
class NavigationAdmin extends Component {
  render() {
    return (
      /*Componente que se ejecutara cuando no encuentre un comonente al cual redireccionar*/
      <ul>
        <li>
          <NavLink to="/project-new" exact={true} className="highlighted" activeClassName="active">
            <i className="md-icon">add</i> <span>Crear Proyecto</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" exact={true} activeClassName="active">
            <i className="md-icon">home</i> <span>Inicio</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/project-list" activeClassName="active">
            <i className="md-icon">format_list_bulleted</i> <span>Proyectos</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/usuariosgenerales" activeClassName="active">
            <i className="md-icon">people</i> <span>Usuarios</span>
          </NavLink>
        </li>
      </ul>
    );
  }
}
class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  set_navigation() {
    const scope = this.props.scope;
    switch (scope) {
      case 'user':
        return <NavigationUser />;
      case 'admin':
        return <NavigationAdmin />;
      case 'moderador':
        return <NavigationAdmin />;
      default:
        return <NavigationUser />;
    }
  }
  componentDidMount() {}
  render() {
    return <div className="navigation">{this.set_navigation()}</div>;
  }
}

const mapStateToProps = (state, props) => {
  return {
    authorize: state.mainReducer.auth.authorize,
    userToken: state.mainReducer.auth.token,
    scope: state.mainReducer.auth.scope,
    id: state.mainReducer.auth.id,
    baseurl: state.mainReducer.setBaseUrl.baseurl,
  };
};

export default withRouter(connect(mapStateToProps)(Navigation));

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navmenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contentmenu: '',
    };
  }
  componentDidMount() {
    this.get_menu();
  }

  get_menu() {
    if (this.props.menu === 'cliente') {
      const list_menu = (
        <ul className="navmenu">
          <li>
            <NavLink className={`${this.props.page === 'general' ? 'active' : ''}`} to="/clientes">
              General
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${this.props.page === 'pendiente' ? 'active' : ''}`}
              to="/pendiente"
            >
              Pendiente de aprobacion
            </NavLink>
          </li>
        </ul>
      );
      this.setState({
        contentmenu: list_menu,
      });
    }
    if (this.props.menu === 'bitacora') {
      const list_menu = (
        <ul className="navmenu">
          <li>
            <NavLink
              className={`${this.props.page === 'bitacora' ? 'active' : ''}`}
              to="/historial"
            >
              Bitacora
            </NavLink>
          </li>
        </ul>
      );
      this.setState({
        contentmenu: list_menu,
      });
    }
    if (this.props.menu === 'sub-cliente') {
      const list_menu = (
        <ul className="navmenu ">
          <li className="no-border">
            <NavLink className="" to="/clientes">
              &#60; Regresar
            </NavLink>
          </li>

          <li />
        </ul>
      );
      this.setState({
        contentmenu: list_menu,
      });
    }
    if (this.props.menu === 'transacciones') {
      const list_menu = (
        <ul className="navmenu">
          <li>
            <NavLink
              className={`${this.props.page === 'general' ? 'active' : ''}`}
              to="/transaccionesgenerales"
            >
              General
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${this.props.page === 'depositos' ? 'active' : ''}`}
              to="/transaccionesdepositos"
            >
              Depositos
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${this.props.page === 'retiros' ? 'active' : ''}`}
              to="/transaccionesretiros"
            >
              Retiros
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${this.props.page === 'pips' ? 'active' : ''}`}
              to="/transaccionespips"
            >
              PIP's
            </NavLink>
          </li>
        </ul>
      );
      this.setState({
        contentmenu: list_menu,
      });
    }
    if (this.props.menu === 'projects') {
      const list_menu = (
        <ul className="navmenu">
          <li>
            <NavLink
              className={`${this.props.page === 'general' ? 'active' : ''}`}
              to="/project-list"
            >
              General
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${this.props.page === 'porasignar' ? 'active' : ''}`}
              to="/tareasporasignar"
            >
              Por Asignar
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${this.props.page === 'completadas' ? 'active' : ''}`}
              to="/tareascompletadas"
            >
              Completadas
            </NavLink>
          </li>
        </ul>
      );
      this.setState({
        contentmenu: list_menu,
      });
    }

    if (this.props.menu === 'usuarios') {
      const list_menu = (
        <ul className="navmenu">
          <li>
            <NavLink
              className={`${this.props.page === 'general' ? 'active' : ''}`}
              to="/usuariosgenerales"
            >
              General
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${this.props.page === 'permiso' ? 'active' : ''}`}
              to="/usuariospermisos"
            >
              Permisos
            </NavLink>
          </li>
        </ul>
      );
      this.setState({
        contentmenu: list_menu,
      });
    }

    if (this.props.menu === 'detalleusuarios') {
      const list_menu = (
        <ul className="navmenu ">
          <li className="width20 no-border">
            <NavLink className="" to="/clientes">
              &#60; Regresar
            </NavLink>
          </li>
        </ul>
      );
      this.setState({
        contentmenu: list_menu,
      });
    }

    if (this.props.menu === 'config') {
      const list_menu = (
        <ul className="navmenu">
          <li>
            <NavLink className={`${this.props.page === 'cuenta' ? 'active' : ''}`} to="/cuenta">
              Cuenta
            </NavLink>
          </li>
        </ul>
      );
      this.setState({
        contentmenu: list_menu,
      });
    }

    if (this.props.menu === 'project-new') {
      const list_menu = (
        <ul className="navmenu">
          <li>
            <NavLink
              className={`${this.props.page === 'logframe' ? 'active' : ''}`}
              to="/project-new"
            >
              Matriz del Marco Lógico
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${this.props.page === 'specs' ? 'active' : ''}`}
              to="/project-new-specs"
            >
              Perfil del Proyecto
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${this.props.page === 'data' ? 'active' : ''}`}
              to="/project-new-data"
            >
              Datos del Proyecto
            </NavLink>
          </li>
        </ul>
      );
      this.setState({
        contentmenu: list_menu,
      });
    }

    if (this.props.menu === 'config-user') {
      const list_menu = (
        <ul className="navmenu">
          <li>
            <NavLink className={`${this.props.page === 'cuenta' ? 'active' : ''}`} to="/cuenta">
              Cuenta
            </NavLink>
          </li>
        </ul>
      );
      this.setState({
        contentmenu: list_menu,
      });
    }

    if (this.props.menu === 'perfil-cliente') {
      const list_menu = (
        <ul className="navmenu">
          <li className="next">
            <NavLink className={`${this.props.page === 'general' ? 'active' : ''}`} to="/dashboard">
              &#60;
            </NavLink>
          </li>
          <li>
            <NavLink className={`${this.props.page === 'perfil' ? 'active' : ''}`} to="/perfil">
              Datos Generales
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${this.props.page === 'economica' ? 'active' : ''}`}
              to="/infoeconomicauser"
            >
              Info. Persona Juridica
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${this.props.page === 'bancaria' ? 'active' : ''}`}
              to="/infobancariauser"
            >
              Datos Bancarios
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${this.props.page === 'empresa' ? 'active' : ''}`}
              to="/infoempresauser"
            >
              Beneficiarios
            </NavLink>
          </li>
          <li>
            <NavLink className={`${this.props.page === 'archivos' ? 'active' : ''}`} to="/cuenta">
              Cambiar contraseña
            </NavLink>
          </li>
        </ul>
      );
      this.setState({
        contentmenu: list_menu,
      });
    }

    if (this.props.menu === 'forex') {
      const list_menu = (
        <ul className="navmenu">
          <li>
            <NavLink className={`${this.props.page === 'canje' ? 'active' : ''}`} to="/puntosforex">
              Retiro o Cánje
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${this.props.page === 'referido' ? 'active' : ''}`}
              to="/referidos"
            >
              Referidos
            </NavLink>
          </li>
        </ul>
      );
      this.setState({
        contentmenu: list_menu,
      });
    }
    if (this.props.menu === 'detallecliente-admin') {
      // const uuid = this.props.match.params.uuid;

      console.log(this.props);
      const list_menu = (
        <ul className="navmenu">
          <li className="next">
            <NavLink
              className={`${this.props.page === 'general' ? 'active' : ''}`}
              to={'/detalle-cliente/' + this.props.id_user + '/' + this.props.uuid}
            >
              &#60;
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${this.props.page === 'perfil' ? 'active' : ''}`}
              to={'/perfiladmin/' + this.props.uuid + '/' + this.props.id_user}
            >
              Datos Generales
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${this.props.page === 'economica' ? 'active' : ''}`}
              to={'/infoeconomicadmin/' + this.props.uuid + '/' + this.props.id_user}
            >
              Info. Persona Juridica
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${this.props.page === 'bancaria' ? 'active' : ''}`}
              to={'/infobancariaadmin/' + this.props.uuid + '/' + this.props.id_user}
            >
              Datos Bancarios
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${this.props.page === 'empresa' ? 'active' : ''}`}
              to={'/infoempresaadmin/' + this.props.uuid + '/' + this.props.id_user}
            >
              Beneficiarios
            </NavLink>
          </li>
          <li>
            <NavLink className={`${this.props.page === 'archivos' ? 'active' : ''}`} to="/cuenta">
              Cambiar contraseña
            </NavLink>
          </li>
        </ul>
      );
      this.setState({
        contentmenu: list_menu,
      });
    }
    if (this.props.menu === 'detallecliente') {
      const list_menu = (
        <ul className="navmenu ">
          <li className="no-border">
            <NavLink className="" to="/clientes">
              &#60; Regresar
            </NavLink>
          </li>

          <li />
        </ul>
      );
      this.setState({
        contentmenu: list_menu,
      });
    }
  }

  render() {
    return <div>{this.state.contentmenu}</div>;
  }
}

export default Navmenu;

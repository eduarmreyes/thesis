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

class NewProjectDataUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Transacciones',
      page: 'general',
      tabla: null,
      id_cuenta: this.props.info_cuenta !== null ? this.props.info_cuenta['uuid'] : '',
      redirect: false,
    };
    this.get_transacciones = this.get_transacciones.bind(this);
    this.generate_estado = this.generate_estado.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.info_cuenta === null) {
      return false;
    } else {
      return true;
    }
  }
  componentWillMount() {
    if (this.props.scope === 'admin') {
      this.get_transacciones(1, 13);
      this.updateGraphics();
    } else {
      if (this.props.info_cuenta !== null) {
        this.get_transacciones(1, 13);
        this.updateGraphics();
      } else {
        this.setState({
          redirect: true,
        });
        switch (this.props.infouser.type_of_user) {
          case 'personality':
            this.setState({
              redirect_page: 'pnpasouno',
            });

            break;
          case 'company':
            this.setState({
              redirect_page: 'empasouno',
            });

            break;
          default:
            break;
        }
      }
    }
  }
  componentDidMount() {}
  updateGraphics() {
    this.setState({
      chart: null,
      initChart: null,
    });
    let json = null;
    let chart = null;
    let chartProps = null;
    let toUpdate = {
      dummyData: {},
    };

    setTimeout(() => {
      /*const bearer = 'bearer '+ this.props.userToken;
        axios.request('GUET', {
          url:this.props.baseurl + '/v1/user_accounts/'+this.state.id_cuenta+'/graphics',
          headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
        })
        .then(jsonresponse => { 

          json = jsonresponse.data.response
           chartProps = {
            data: json.value,
            id: "customID",
            dates: json.label,
            callback: this.getDataInit
          }               
                    
          toUpdate.dummyData = {
            graphics: json
          }
          chart = <ChartLine {...chartProps} />
          toUpdate.chart = chart
          this.setState(toUpdate)
           })  
        .catch(error => {

        });*/
    }, 500);
  }
  get_transacciones(page, per_page) {
    /*const bearer = 'bearer '+ this.props.userToken;
      axios.request('GUET', {
        url:this.props.baseurl + '/v1/user_accounts/'+this.state.id_cuenta+'/transactions?page='+ page +'&per_page='+ per_page +'',
        headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
      })
      .then(jsonresponse => { 
       let content;

       content = jsonresponse.data.map((lista, index) => {  
    
          return (    
            <tr key={index} className="no-cursorpointer">
            <td>{ (lista.code === null || lista.code === "" || lista.code === " ") ? 'N/A' : lista.code }</td>
            <td> {lista.name_user}</td> 
              <td> {lista.amount}</td> 
                 <td> { lista.trans_gaining === true ? "Ganada" : ""}{ lista.trans_deposit === true ? "Deposito" : ""}{ lista.trans_initial === true ? "Inicial" : ""} { lista.trans_lost === true ? "Perdida" : ""} { lista.trans_retirement === true ? "Retiro" : ""}</td>      
              <td> { lista.trans_date } </td>
              <td> { lista.balance } </td>
            </tr>            
          );
      });
       this.setState({
        tabla:content
       })

      })  
      .catch(error => {
        let content = <tr>
          <td colSpan={5}> No se encontraron registros</td>
        </tr>
            this.setState({
              tabla:content
          })
      });*/
  }
  generate_estado() {
    const bearer = 'bearer ' + this.props.userToken;
    axios
      .request('GUET', {
        url: this.props.baseurl + '/v1/user_accounts/' + this.state.id_cuenta + '/pdf',
        headers: { Authorization: bearer, 'Content-Type': 'application/json' },
      })
      .then(jsonresponse => {
        const url = jsonresponse.data;

        // server sent the url to the file!
        // now, let's download:
        window.open(jsonresponse.data);
        // you could also do:
        //window.location.href = jsonresponse.data;
      })
      .catch(error => {});
  }
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

          <a href="#" onClick={this.generate_estado} className="btn-generate">
            Generar estado de cuenta
          </a>
        </div>

        <div className="page-cliente-empty-content margin50">
          <div className="table-content table-responsive">
            <table>
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
            </table>
          </div>
        </div>
      </div>
    );
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
          <h1>Datos del Proyecto</h1>
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
                <Input type="textarea"
                className="height-100px" rows="4" name="project-background" id="project-background" />
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
      title: 'Nuevo Proyecto',
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

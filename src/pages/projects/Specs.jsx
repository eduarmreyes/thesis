import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Moment from 'moment';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Chart from 'chart.js';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Backend from 'components/Layouts/Backend';
import ChartLine from 'components/Graphics/ChartLine';
import JSONData from 'JSONData';

const RESOURCES_OPTIONS = [
	{ id: 1, label: 'Impresora', value: 'printer' },
	{ id: 2, label: 'Equipo de Informática', value: 'computer' },
	{ id: 3, label: 'Alumnos de Facultad', value: 'alumni' },
	{ id: 4, label: 'Comida', value: 'food' },
];

class NewProjectSpecsUser extends Component {
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
	componentWillMount() {}
	componentDidMount() {}
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
				</div>

				<div className="page-cliente-empty-content margin50">
					<div className="table-responsive">
						<Table striped>
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
						</Table>
					</div>
				</div>
			</div>
		);
	}
}

class NewProjectSpecsAdmin extends Component {
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
					<h1>Especificaciones Técnicas del Proyecto</h1>
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
class NewProjectSpecs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stado: 0,
			store_uuid: null,
			title: 'Nuevo Proyecto',
			page: 'specs',
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
				return <NewProjectSpecsUser {...this.props} />;
			case 'admin':
				return <NewProjectSpecsAdmin {...this.props} />;
			case 'moderador':
				return <NewProjectSpecsAdmin {...this.props} />;
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

export default withRouter(connect(mapStateToProps)(NewProjectSpecs));

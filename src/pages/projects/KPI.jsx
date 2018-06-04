import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Moment from 'moment';
import 'moment/locale/es';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Backend from 'components/Layouts/Backend';

const UNITS = [
	{ id: 1, label: 'Personas', value: 'Personas' },
	{ id: 2, label: 'Adultos', value: 'Adultos' },
	{ id: 3, label: 'Niños y niñas', value: 'Niños y niñas' },
	{ id: 4, label: 'Adultos mayores', value: 'Adultos mayores' },
	{ id: 5, label: 'Jóvenes', value: 'Jóvenes' },
];

class NewProjectKPIsUser extends Component {
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

class NewProjectKPIsAdmin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			kpis: [],
			project_kpis: [],
			project_kpis_labels: [],
			project_kpi_target: '',
			project_units: '',
		};

		this.onAdd = this.onAdd.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		moment.locale('es');
	}

	onAdd(e) {
		e.preventDefault();
		this.setState({
			kpis: [
				...this.state.kpis,
				{
					id: this.state.kpis.length,
					unit: this.state.project_units,
					target: this.state.project_kpi_target,
					target_date: this.state.project_kpi_date,
				},
			],
		});
		this.onCleanForm();
	}

	onCleanForm() {
		this.setState({
			project_kpis: [],
			project_kpis_labels: [],
			project_kpi_target: '',
			project_units: '',
		});
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	render() {
		const kpis_table = this.state.kpis.length ? (
			this.state.kpis.map(kpi => {
				const kpi_target_date = kpi.target_date;
				return (
					<tr key={kpi.id}>
						<td>
							{kpi.target} {kpi.unit}
						</td>
						<td>{moment(kpi_target_date).format('LL')}</td>
					</tr>
				);
			})
		) : (
			<tr>
				<td colSpan={2}>
					<div>
						<h3 className="text-center">Agregue un indicador en el formulario de arriba ⬆️</h3>
					</div>
				</td>
			</tr>
		);
		return (
			/*Componente que se ejecutara cuando no encuentre un comonente al cual redireccionar*/
			<div className="content-inner no-padding-top no-padding-left no-padding-right">
				<div className="border-bottom side-margins box">
					<h1>Indicadores</h1>
					<Form onSubmit={this.onAdd}>
						<FormGroup row className="align-items-center">
							<Label for="project_name" sm={2}>
								Unidad de Medida
							</Label>
							<Col sm={9}>
								<Input
									type="select"
									name="project_units"
									id="project_units"
									className="height100px"
									onChange={this.onChange}
									value={this.state.project_units}
								>
									<option>Seleccionar Opción</option>
									{UNITS.map(unit => {
										return (
											<option key={unit.id} value={unit.value}>
												{unit.label}
											</option>
										);
									})}
								</Input>
							</Col>
						</FormGroup>
						<FormGroup row className="align-items-center">
							<Label for="project_kpi_target" sm={2}>
								Valor del Indicador
							</Label>
							<Col sm={9}>
								<Input
									required
									type="number"
									name="project_kpi_target"
									id="project_kpi_target"
									placeholder="Valor meta"
									value={this.state.project_kpi_target}
									onChange={this.onChange}
								/>
							</Col>
						</FormGroup>
						<FormGroup row className="align-items-center">
							<Label for="project_kpi_date" sm={2}>
								Fecha del Indicador Meta
							</Label>
							<Col sm={9}>
								<Input
									required
									type="date"
									name="project_kpi_date"
									id="project_kpi_date"
									placeholder="Fecha meta"
									value={this.state.project_kpi_date}
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
									<th> Valor Meta </th>
									<th> Fecha </th>
								</tr>
							</thead>
							<tbody>{kpis_table}</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}
class NewProjectKPIs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stado: 0,
			store_uuid: null,
			title: 'Proyecto',
			page: 'kpis',
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
				return <NewProjectKPIsUser {...this.props} />;
			case 'admin':
				return <NewProjectKPIsAdmin {...this.props} />;
			case 'moderador':
				return <NewProjectKPIsAdmin {...this.props} />;
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

export default withRouter(connect(mapStateToProps)(NewProjectKPIs));

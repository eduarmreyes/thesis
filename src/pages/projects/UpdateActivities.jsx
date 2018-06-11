import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import 'bootstrap/dist/css/bootstrap.min.css';

import Backend from 'components/Layouts/Backend';

class UpdateKPIUser extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	componentDidMount() {}
	render() {
		return <h1>User</h1>;
	}
}

class UpdateKPIAdmin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			kpis: [],
			project_kpis: [],
			project_kpis_labels: [],
			project_kpi_target: '',
			project_units: '',
			project_general_objective_kpi_date: moment(),
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

	onSelectInputChange(inputValue, actionMeta) {}

	onSelectProjectGeneralObjectiveKPIDate(project_general_objective_kpi_date) {
		this.setState({
			project_general_objective_kpi_date,
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
						<h3 className="text-center">
							Agregue un indicador en el formulario de arriba{' '}
							<span role="img" aria-label="up emoji">
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
					<p className="muted">Actualice el estado de las actividades del proyecto</p>
					<p className="muted">
						<strong>Objetivo General: </strong> Test objetivo
						general...fajewoifjawoeifja...faoweijfaoiwejfawe...jfaoiwejfaowejfoaiwe...
					</p>
					<Form onSubmit={this.onAdd}>
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
									placeholder="Valor Real"
									value={this.state.project_kpi_target}
									onChange={this.onChange}
								/>
							</Col>
						</FormGroup>
						<FormGroup row className="align-items-center">
							<Label for="project_name" sm={2}>
								Unidad de Medida
							</Label>
							<Col sm={9}>
								<strong>Niños y Niñas</strong>
							</Col>
						</FormGroup>
						<FormGroup row className="align-items-center">
							<Label for="project_name" sm={2}>
								Variable
							</Label>
							<Col sm={9}>
								<strong>Salud Bucal</strong>
							</Col>
						</FormGroup>
						<FormGroup row className="align-items-center">
							<Label for="project_kpi_date" sm={2}>
								Fecha del Indicador Real
							</Label>
							<Col sm={9}>
								<DatetimePickerTrigger
									closeOnSelectDay={true}
									moment={this.state.project_kpi_date}
									onChange={this.onSelectProjectGeneralObjectiveKPIDate}
									className="give-me-space-between"
								>
									<input
										type="text"
										value={this.state.project_general_objective_kpi_date.format('LL')}
										readOnly
									/>
								</DatetimePickerTrigger>
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
									<th> Valor Real </th>
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
class UpdateKPI extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stado: 0,
			store_uuid: null,
			title: 'Proyecto',
			page: 'kpis',
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
				return <UpdateKPIUser {...this.props} />;
			case 'admin':
				return <UpdateKPIAdmin {...this.props} />;
			case 'moderador':
				return <UpdateKPIAdmin {...this.props} />;
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

export default withRouter(connect(mapStateToProps)(UpdateKPI));

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import $ from 'jquery';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Backend from 'components/Layouts/Backend';

class NewProjectSpecsUser extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	componentDidMount() {}
	render() {
		return <h1>User</h1>;
	}
}

class NewProjectSpecsAdmin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			project_faculty_labels: [],
			project_name: '',
			project_knowledge_area: '',
			project_start_date: '',
			project_end_date: '',
			project_faculty: '',
			project_line: '',
			project_ods: '',
			project_coordinador: '',
			project_responsible_team: '',
			project_institution: '',
			KNOWLEDGE_AREA: [],
			ODS: [],
			FACULTY_OPTIONS: [],
			LINE: [],
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentDidMount() {
		$.ajax({
			type: 'get',
			url: this.props.baseurl + '/KnowledgeArea/GetAll',
			contentType: 'application/json',
			dataType: 'json',
			success: response => {
				this.setState({
					KNOWLEDGE_AREA: response,
				});
			},
			error: response => {
				console.log(response.data);
			},
		});
		$.ajax({
			type: 'get',
			url: this.props.baseurl + '/DevelopmentObjective/GetAll',
			contentType: 'application/json',
			dataType: 'json',
			success: response => {
				this.setState({
					ODS: response,
				});
			},
			error: response => {
				console.log(response.data);
			},
		});
		$.ajax({
			type: 'get',
			url: this.props.baseurl + '/InvestigationLine/GetAll',
			contentType: 'application/json',
			dataType: 'json',
			success: response => {
				this.setState({
					LINE: response,
				});
			},
			error: response => {
				console.log(response.data);
			},
		});
		$.ajax({
			type: 'get',
			url: this.props.baseurl + '/Faculty/GetAll',
			contentType: 'application/json',
			dataType: 'json',
			success: response => {
				this.setState({
					FACULTY_OPTIONS: response,
				});
			},
			error: response => {
				console.log(response.data);
			},
		});
		if (sessionStorage.getItem('currentProjectID')) {
			$.ajax({
				type: 'get',
				url:
					this.props.baseurl +
					'/ProjectProfile/GetById/' +
					sessionStorage.getItem('currentProjectID'),
				contentType: 'application/json',
				dataType: 'json',
				success: response => {
					this.setState({
						project_name: response.projectName,
						project_knowledge_area: response.knowledgeAreaId,
						// project_start_date: response.,
						// project_end_date: response.,
						project_faculty: response.facultyId,
						project_line: response.investigationLineId,
						project_ods: response.developmentObjectiveId,
						project_coordinador: response.projectCoordinator,
						project_responsible_team: response.responsibleTeam,
						// project_institution: response.,
					});
				},
				error: response => {
					console.log(response.data);
				},
			});
		}
	}

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
	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	onSubmit(e) {
		e.preventDefault();

		const url = sessionStorage.getItem('currentProjectID')
			? '/ProjectProfile/Edit'
			: '/ProjectProfile/Add';

		const data = JSON.stringify({
			projectName: this.state.project_name,
			knowledgeAreaId: parseInt(this.state.project_knowledge_area, 10),
			facultyId: parseInt(this.state.project_faculty, 10),
			investigationLineId: parseInt(this.state.project_line, 10),
			developmentObjectiveId: parseInt(this.state.project_ods, 10),
			projectCoordinator: this.state.project_coordinador,
			responsibleTeam: this.state.project_responsible_team,
			startDate: this.state.project_start_date,
			endDate: this.state.project_end_date,
			counterpartInstitution: this.state.project_institution,
			id: sessionStorage.getItem('currentProjectID')
				? sessionStorage.getItem('currentProjectID')
				: null,
		});

		$.ajax({
			type: 'post',
			url: url,
			contentType: 'application/json',
			dataType: 'json',
			data: data,
			success: response => {
				if (response.status === 'success') {
					sessionStorage.setItem('currentProjectID', response.id);
					this.props.history.push('/project-new-data');
				}
			},
			error: response => {
				console.log(response);
			},
		});
	}

	render() {
		return (
			/*Componente que se ejecutara cuando no encuentre un comonente al cual redireccionar*/
			<div className="content-inner no-padding-top no-padding-left no-padding-right">
				<div className="border-bottom side-margins box">
					<h1>Perfil del Proyecto</h1>
					<Form onSubmit={this.onSubmit}>
						<FormGroup row className="align-items-center">
							<Label for="project_faculty" sm={2}>
								Facultad o Unidad
							</Label>
							<Col sm={9}>
								<Input
									required
									type="select"
									name="project_faculty"
									id="project_faculty"
									className="height100px"
									onChange={this.onChange}
									value={this.state.project_faculty}
								>
									{this.state.FACULTY_OPTIONS.map(faculty => {
										return (
											<option key={faculty.id} value={faculty.id}>
												{faculty.facultyName}
											</option>
										);
									})}
								</Input>
							</Col>
						</FormGroup>
						<FormGroup row className="align-items-center">
							<Label for="project_dean" sm={2}>
								Decano(s)
							</Label>
							<Col sm={9}>
								<Input
									required
									type="text"
									name="project_dean"
									id="project_dean"
									className="height100px"
									onChange={this.onChange}
									value={this.state.project_dean}
								/>
							</Col>
						</FormGroup>
						<FormGroup row className="align-items-center">
							<Label for="project_coordinador" sm={2}>
								Coordinador
							</Label>
							<Col sm={9}>
								<Input
									type="text"
									name="project_coordinador"
									id="project_coordinador"
									placeholder="Coordinador del Proyecto"
									onChange={this.onChange}
									value={this.state.project_coordinador}
								/>
							</Col>
						</FormGroup>
						<FormGroup row className="align-items-center">
							<Label for="project_responsible_team" sm={2}>
								Equipo Responsable
							</Label>
							<Col sm={9}>
								<Input
									type="textarea"
									className="height-100px"
									rows="4"
									name="project_responsible_team"
									id="project_responsible_team"
									onChange={this.onChange}
									value={this.state.project_responsible_team}
								/>
							</Col>
						</FormGroup>
						<FormGroup row className="align-items-center">
							<Label for="project_institution" sm={2}>
								Institución contraparte
							</Label>
							<Col sm={9}>
								<Input
									type="textarea"
									className="height-100px"
									rows="4"
									name="project_institution"
									id="project_institution"
									onChange={this.onChange}
									value={this.state.project_institution}
								/>
							</Col>
						</FormGroup>
						<FormGroup row className="align-items-center">
							<Label for="project_name" sm={2}>
								Nombre
							</Label>
							<Col sm={9}>
								<Input
									type="text"
									name="project_name"
									id="project_name"
									placeholder="Nombre del Proyecto"
									value={this.state.project_name}
									onChange={this.onChange}
								/>
							</Col>
						</FormGroup>
						<FormGroup row className="align-items-center">
							<Label for="project_name" sm={2}>
								Área del Conocimiento
							</Label>
							<Col sm={9}>
								<Input
									type="select"
									name="project_knowledge_area"
									id="project_knowledge_area"
									className="height100px"
									onChange={this.onChange}
									value={this.state.project_resources}
								>
									{this.state.KNOWLEDGE_AREA.map(knowledge_area => {
										return (
											<option key={knowledge_area.id} value={knowledge_area.id}>
												{knowledge_area.knowledgeAreaName}
											</option>
										);
									})}
								</Input>
							</Col>
						</FormGroup>
						<FormGroup row className="align-items-center">
							<Label for="project_line" sm={2}>
								Línea Institucional
							</Label>
							<Col sm={9}>
								<Input
									required
									type="select"
									name="project_line"
									id="project_line"
									className="height100px"
									onChange={this.onChange}
									value={this.state.project_line}
								>
									{this.state.LINE.map(line => {
										return (
											<option key={line.id} value={line.id}>
												{line.lineName}
											</option>
										);
									})}
								</Input>
							</Col>
						</FormGroup>
						<FormGroup row className="align-items-center">
							<Label for="project_ods" sm={2}>
								ODS
							</Label>
							<Col sm={9}>
								<Input
									required
									type="select"
									name="project_ods"
									id="project_ods"
									className="height100px"
									onChange={this.onChange}
									value={this.state.project_ods}
								>
									{this.state.ODS.map(ods => {
										return (
											<option key={ods.id} value={ods.id}>
												{ods.objectiveName}
											</option>
										);
									})}
								</Input>
							</Col>
						</FormGroup>
						<FormGroup row className="align-items-center">
							<Label for="project_beneficiary_population" sm={2}>
								Población beneficiaria
							</Label>
							<Col sm={9}>
								<Input
									type="text"
									name="project_beneficiary_population"
									id="project_beneficiary_population"
									placeholder="Población beneficiaria"
									value={this.state.project_beneficiary_population}
									onChange={this.onChange}
								/>
							</Col>
						</FormGroup>
						<FormGroup row className="align-items-center">
							<Label for="project_geographic_area_of_influence" sm={2}>
								Área geográfica de influencia del proyecto
							</Label>
							<Col sm={9}>
								<Input
									type="text"
									name="project_geographic_area_of_influence"
									id="project_geographic_area_of_influence"
									placeholder="Área geográfica de influencia del proyecto"
									value={this.state.project_geographic_area_of_influence}
									onChange={this.onChange}
								/>
							</Col>
						</FormGroup>
						<FormGroup row className="align-items-center">
							<Label for="project_name" sm={2}>
								Fecha Inicio
							</Label>
							<Col sm={9}>
								<Input
									type="date"
									name="project_start_date"
									id="project_start_date"
									placeholder="Fecha Inicio del Proyecto"
									onChange={this.onChange}
									value={this.state.project_start_date}
								/>
							</Col>
						</FormGroup>
						<FormGroup row className="align-items-center">
							<Label for="project_name" sm={2}>
								Fecha Fin
							</Label>
							<Col sm={9}>
								<Input
									type="date"
									name="project_end_date"
									id="project_end_date"
									placeholder="Fecha Fin del Proyecto"
									onChange={this.onChange}
									value={this.state.project_end_date}
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
class NewProjectSpecs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stado: 0,
			store_uuid: null,
			title: 'Nuevo Proyecto - Perfil del Proyecto',
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

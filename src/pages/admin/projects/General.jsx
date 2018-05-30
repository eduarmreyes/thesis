import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import $ from 'jquery';
import { NavLink } from 'react-router-dom';
import Backend from '../../../components/Layouts/Backend';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import Moment from 'moment';
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import { CSVLink, CSVDownload } from 'react-csv';

import '../../../assets/css/pages/general.css';
import actions from '../../../actions';
class General extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: 'Lista de Proyectos',
			page: 'general',
			tabla: null,
			pagina: 1,
			total_page: 1,
			next: '',
			back: '',
			list_min: [],
			list_max: [],
			listactualpage: '',
			listmin: '',
			listmax: '',
			pagination: '',
			per_page: '',
			filter: false,
			startdate: moment(),
			enddate: moment(),
			task: false,
			overlay_task_confirm: false,
		};
		this.get_projects = this.get_projects.bind(this);
		this.onChange = this.onChange.bind(this);
		this.update_indicator = this.update_indicator.bind(this);
		this.select_project = this.select_project.bind(this);
	}
	componentDidMount() {
		this.get_projects(1, 13);
	}
	update_indicator(e, id) {
		e.preventDefault();
		sessionStorage.setItem('updateKPIToProject', id);
		this.props.history.push('/updateKPIToProject');
	}
	select_project(e, id) {
		e.preventDefault();
		sessionStorage.setItem('currentProjectID', id);
	}
	get_projects(page, per_page) {
		$.ajax({
			type: 'GET',
			url: this.props.baseurl + '/ProjectProfile/GetAll',
			contentType: 'application/json',
			dataType: 'json',
			success: response => {
				let content;
				this.setState({
					pagina: page,
					per_page: per_page,
				});

				this.setState({
					data: response.data,
				});

				const type_trans = 'Ninguna';

				content = response.map((lista, index) => {
					if (lista.projectName === '') {
						return false;
					}
					return (
						<tr key={index} className="no-cursorpointer">
							<td>
								<div className="title-wrapper">
									<div className="title">{lista.projectName}</div>
								</div>
							</td>
							<td>
								<div className="key-value">
									<div className="avatar" />
									<strong>{lista.projectCoordinator}</strong>
								</div>
							</td>
							<td className="actions min-width">
								<div className="button-group">
									<a
										className="button"
										href="#"
										onClick={e => {
											this.update_indicator(e, lista.id);
										}}
									>
										Actualizar Indicadores
									</a>
								</div>
								<br />
								<div className="button-group">
									<a
										className="button"
										href="#"
										onClick={e => {
											this.select_project(e, lista.id);
										}}
									>
										Editar
									</a>
								</div>
							</td>
						</tr>
					);
				});
				this.setState({
					tabla: content,
				});
			},
			error: response => {
				console.log(response.data);
			},
		});
	}
	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}
	render() {
		return (
			<Backend title={this.state.title} page={this.state.page}>
				<div className="page-cliente-empty">
					<div className="table-responsive">
						<table>
							<thead>
								<tr className="heading" className="no-cursorpointer">
									<th>Nombre del Proyecto</th>
									<th>Coordinador</th>
									<th />
								</tr>
							</thead>
							<tbody>{this.state.tabla}</tbody>
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
		baseurl: state.mainReducer.setBaseUrl.baseurl,
	};
};

export default withRouter(connect(mapStateToProps)(General));

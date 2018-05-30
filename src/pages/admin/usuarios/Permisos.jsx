import React, { Component } from 'react';
import '../../../assets/css/pages/general.css';
import Backend from '../../../components/Layouts/Backend';
class Permisos extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: 'Permisos',
			page: 'permiso',
			menu: 'usuarios',
		};
	}
	render() {
		return (
			<Backend title={this.state.title} page={this.state.page} menu={this.state.menu}>
				<div className="page-cliente-empty">
					<div className="page-cliente-empty-content">
						<div>
							<table>
								<tr>
									<td className="width10">
										<span>Usuarios</span>
									</td>
									<td className="width90">
										<hr />
									</td>
								</tr>
							</table>
						</div>
						<div className="table-content">
							<table>
								<thead>
									<tr>
										<td> </td>
										<td> Crear </td>
										<td> Modificar</td>
										<td> Borrar</td>
										<td> Leer</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Administrador</td>
										<td>
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
									</tr>
									<tr>
										<td>Moderadores</td>
										<td>
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
									</tr>
									<tr>
										<td>Usuarios</td>
										<td>
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div>
							<table>
								<tr>
									<td className="width10">
										<span>Proyectos</span>
									</td>
									<td className="width90">
										<hr />
									</td>
								</tr>
							</table>
						</div>
						<div className="table-content">
							<table>
								<thead>
									<tr>
										<td> </td>
										<td> Crear </td>
										<td> Modificar</td>
										<td> Borrar</td>
										<td> Leer</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Administrador</td>
										<td>
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
									</tr>
									<tr>
										<td>Moderadores</td>
										<td>
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
									</tr>
									<tr>
										<td>Usuarios</td>
										<td>
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div>
							<table>
								<tr>
									<td className="width10">
										<span>Indicadores</span>
									</td>
									<td className="width90">
										<hr />
									</td>
								</tr>
							</table>
						</div>
						<div className="table-content">
							<table>
								<thead>
									<tr>
										<td> </td>
										<td> Crear </td>
										<td> Modificar</td>
										<td> Borrar</td>
										<td> Leer</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Administrador</td>
										<td>
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
									</tr>
									<tr>
										<td>Moderadores</td>
										<td>
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
									</tr>
									<tr>
										<td>Usuarios</td>
										<td>
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
										<td>
											{' '}
											<div className="form-check">
												<input type="checkbox" class="form-check-input" value="on" />
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className="page-cliente-empty-pagination" />
				</div>
			</Backend>
		);
	}
}

export default Permisos;

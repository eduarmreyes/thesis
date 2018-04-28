import React, { Component } from 'react'
import '../../assets/css/pages/general.css'
import Backend from '../../components/Layouts/Backend';
class Cuenta extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'Cuenta',
			page:'porcentaje',
			menu:'config'
		}
	}
	render(){
		return(
			<Backend title={this.state.title} page={this.state.page} menu={this.state.menu}>	
				<div className="page-cliente-empty none-margin">
					<div className="page-cliente-empty-content margin50">
						<div className="content-form-list">
							<ul >
								<li>
									<div className="form-group">
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Cantidad a depositar" />
                                    </div>
								</li>
								<li>
									<div className="form-group section-btn">
                                        <a className="blue btn" href=""> Aceptar</a>
                                    </div>
								</li>
							</ul>
						</div>
						<div className="table-content">
							<table>
								<thead>
									<tr >
										<td> Porcentaje de Registro </td>
										<td> Fecha de creación </td>
										<td> Fecha de Actualización </td>
										<td> </td>
										<td> </td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td> 0.00065 </td>
										<td> 1 de septiembre 2017 </td>
										<td> 1 de septiembre 2017 </td>
										<td> <i className="md-icon">edit  </i>  </td>
										<td> <i className="md-icon">delete</i>  </td>
									</tr>
									<tr>
										<td> 0.00065 </td>
										<td> 1 de septiembre 2017 </td>
										<td> 1 de septiembre 2017 </td>
										<td> <i className="md-icon">edit  </i>  </td>
										<td> <i className="md-icon">delete</i>  </td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>	
			</Backend>
		)
	}
}

export default Cuenta
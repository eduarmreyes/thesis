import React, { Component } from 'react'
import '../../../assets/css/pages/general.css'
import Backend from '../../../components/Layouts/Backend';
import axios from 'axios';
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
class Detallependiente extends Component {
		constructor(props){
		super(props)

		this.state = {
			title:'Detalle Pendiente',
			page:'general',
			menu: 'sub-cliente',
			id_user:props.match.params.id_user,
		}
	}
	componentDidMount(){
		const bearer = 'bearer '+ this.props.userToken;
		axios.get(this.props.baseurl + '/v1/users/'+this.state.id_user, {
      headers: { 'Authorization': bearer, 'Content-Type': 'application/json' }
		})
		.then(jsonresponse => {
			var data = jsonresponse.data;
			console.log(data)
			this.setState({
				firstname:data.firstname,
				type_of_user:data.type_of_user,
				enterprise_name:data.enterprise_name,
				email:data.email,
				telephone:data.telephone,
				mobilephone:data.mobilephone,
				position_held:data.position_held,
				personal_references:data.personal_references,
				personal_references2:data.personal_references2,
				personal_references_phone:data.personal_references_phone,
				personal_references_phone2:data.personal_references_phone2,

				dui_file_name:data.dui_file_name,
				nit_file_name:data.nit_file_name,
				passaport_file_name:data.passaport_file_name,
				card_fiscal_file_name:data.card_fiscal_file_name,
				bank_reference_file_name:data.bank_reference_file_name,
				proof_address_file_name:data.proof_address_file_name,
				record_of_payments_file_name:data.record_of_payments_file_name,
				salary_file_name:data.salary_file_name

			})	
		})
		.catch(error => {
			this.showerror(error);
		});
	}

	showerror(error){
    let message = '* ' + error.response.data.errors;        
	    this.setState({
	      error_message:message
	    })
    }
	render(){
		return(
			<Backend title={this.state.title} page={this.state.page} menu={this.state.menu}>			
				<div className="page-cliente-empty">
					<div className="page-cliente-detail-pending">
						<div className="card-user">
							<h2>{this.state.firstname}</h2>
							<span> cl102989 </span>
							<label>{this.state.type_of_user}</label>
						</div>
						<div className="card-detail">
							<div className="card-detail-row">
								<div className="card-detail-col">
									<strong>{this.state.enterprise_name}</strong>
									<br/>
									<span>Empresa Vinculada</span>
								</div>
								<div className="card-detail-col">
									<strong>$ 1,500.00</strong>
									<br/>
									<span>Monto inicial pensado</span>
								</div>
								<div className="card-detail-col">
									<strong>{this.state.email}</strong>
									<br/>
									<span>Correo electronico</span>
								</div>
							</div>
							<div className="card-detail-row">
								<div className="card-detail-col">
									<strong>{this.state.position_held}</strong>
									<br/>
									<span>Cargo desempeñado</span>
								</div>
								<div className="card-detail-col">
									<strong>Transferencia electronica</strong>
									<br/>
									<span>Modo de transaccion</span>
								</div>
								<div className="card-detail-col">
									<strong>{this.state.mobilephone}</strong>
									<br/>
									<span>Movil de contacto</span>
								</div>
							</div>
						</div>
					</div>
					
					<div className="page-cliente-empty-content detail-pending-body">
						<div className="table-content">
							<table>
								<thead>
									<tr>
										<td> Referencia </td>
										<td> Telefono de contacto </td>
										<td> Aprobado </td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td> {this.state.personal_references} </td>
										<td> {this.state.personal_references_phone}</td>
										<td> 
											<div className="pretty p-default p-curve">
										        <input type="checkbox" />
										        <div className="state">
										            <label></label>
										        </div>
										    </div>
										</td>
									</tr>
									<tr>
										<td> {this.state.personal_references2}</td>
										<td> {this.state.personal_references_phone2}</td>
										<td> <div className="pretty p-default p-curve">
										        <input type="checkbox" />
										        <div className="state">
										            <label></label>
										        </div>
										    </div> 
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="table-content">
							<table>
								<thead>
									<tr>
										<td> Documento </td>
										<td> Comprobante  </td>
										<td> Aprobado </td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td> Documento de Identidad </td>
										<td> <a target='_blank' rel='noopener noreferrer' href={this.state.dui_file_name !== '' ? this.state.dui_file_name : null}><i className='md-icon'>{this.state.dui_file_name !== '' ? 'visibility' : 'visibility_off'}</i></a>  </td>
										<td> 
											<div className="pretty p-default p-curve">
										        <input type="checkbox" />
										        <div className="state">
										            <label></label>
										        </div>
										    </div>
										</td>
									</tr>
									<tr>
										<td> Nit  </td>
										<td> <a target='_blank' rel='noopener noreferrer' href={this.state.dui_file_name !== '' ? this.state.dui_file_name : null}><i className='md-icon'>{this.state.dui_file_name !== '' ? 'visibility' : 'visibility_off'}</i></a> </td>
										<td> 
											<div className="pretty p-default p-curve">
										        <input type="checkbox" />
										        <div className="state">
										            <label></label>
										        </div>
										    </div>
										</td>
									</tr>
									<tr>
										<td> Pasaporte o Carnet de residencia (Extranjero) </td>
										<td> <a target='_blank' rel='noopener noreferrer' href={this.state.dui_file_name !== '' ? this.state.dui_file_name : null}><i className='md-icon'>{this.state.dui_file_name !== '' ? 'visibility' : 'visibility_off'}</i></a> </td>
										<td> 
											<div className="pretty p-default p-curve">
										        <input type="checkbox" />
										        <div className="state">
										            <label></label>
										        </div>
										    </div>
										</td>
									</tr>
									<tr>
										<td> Tarjeta de Registro Fiscal (Si aplica) </td>
										<td> <a target='_blank' rel='noopener noreferrer' href={this.state.dui_file_name !== '' ? this.state.dui_file_name : null}><i className='md-icon'>{this.state.dui_file_name !== '' ? 'visibility' : 'visibility_off'}</i></a> </td>
										<td> 
											<div className="pretty p-default p-curve">
										        <input type="checkbox" />
										        <div className="state">
										            <label></label>
										        </div>
										    </div>
										</td>
									</tr>
									<tr>
										<td> Comprobante de domicilio (Factura de servicios básicos) </td>
										<td> <a target='_blank' rel='noopener noreferrer' href={this.state.dui_file_name !== '' ? this.state.dui_file_name : null}><i className='md-icon'>{this.state.dui_file_name !== '' ? 'visibility' : 'visibility_off'}</i></a> </td>
										<td> 
											<div className="pretty p-default p-curve">
										        <input type="checkbox" />
										        <div className="state">
										            <label></label>
										        </div>
										    </div>
										</td>
									</tr>
									<tr>
										<td> Referencias bancarias y crediticias </td>
										<td> <a target='_blank' rel='noopener noreferrer' href={this.state.dui_file_name !== '' ? this.state.dui_file_name : null}><i className='md-icon'>{this.state.dui_file_name !== '' ? 'visibility' : 'visibility_off'}</i></a> </td>
										<td> 
											<div className="pretty p-default p-curve">
										        <input type="checkbox" />
										        <div className="state">
										            <label></label>
										        </div>
										    </div>
										</td>
									</tr>
									<tr>
										<td> Referencias Familiares y Personales </td>
										<td> <a target='_blank' rel='noopener noreferrer' href={this.state.dui_file_name !== '' ? this.state.dui_file_name : null}><i className='md-icon'>{this.state.dui_file_name !== '' ? 'visibility' : 'visibility_off'}</i></a> </td>
										<td> 
											<div className="pretty p-default p-curve">
										        <input type="checkbox" />
										        <div className="state">
										            <label></label>
										        </div>
										    </div>
										</td>
									</tr>
									<tr>
										<td> Constancia de la precedencia de sus fondos </td>
										<td> <a target='_blank' rel='noopener noreferrer' href={this.state.dui_file_name !== '' ? this.state.dui_file_name : null}><i className='md-icon'>{this.state.dui_file_name !== '' ? 'visibility' : 'visibility_off'}</i></a> </td>
										<td> 
											<div className="pretty p-default p-curve">
										        <input type="checkbox" />
										        <div className="state">
										            <label></label>
										        </div>
										    </div>
										</td>
									</tr>									
									
								</tbody>
							</table>
						</div>
					</div>
					<div className="page-cliente-empty-pagination">
					</div>
				</div>
			</Backend>
		)
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
    baseurl:state.mainReducer.setBaseUrl.baseurl
  }
}

export default withRouter(connect(mapStateToProps)(Detallependiente))
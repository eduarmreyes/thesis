import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import '../../assets/css/pages/general.css'
import Backend from '../../components/Layouts/Backend';
import { NavLink } from 'react-router-dom';
class General extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'Perfil',
			page:'perfil',
			menu:'',
			 nombre:this.props.infouser['firstname'] ,
			nombre_completo:this.props.infouser['firstname'] +' '+ this.props.infouser['lastname'],
			
			telefono:this.props.infouser['telephone'],
			movil:this.props.infouser['mobilephone'],
			direccion:this.props.infouser['address'],
			puntosforex:this.props.infouser['fxpoints'],
			nombre_banco:this.props.infouser['bank_name'],

			pais_banco:this.props.infouser['bank_country'],
			numero_cuenta:this.props.infouser['bank_account'],
			fecha_nacimiento:this.props.infouser['birthday'],
			fecha_iniciocontrato:null,
			fecha_finalizacioncontrato:null,
			referred_by:this.props.infouser['referred_by'],
			empresa_nombre:this.props.infouser['enterprise_name'],
			empresa_telefono:this.props.infouser['enterprise_telefone'],
			empresa_movil:this.props.infouser['enterprise_mobilephone'],
			empresa_direccion:this.props.infouser['enterprise_address'],
			count_account:''
			
		}
		this.get_numberacount = this.get_numberacount.bind(this)
		this.set_data = this.set_data.bind(this)
		
	}
	get_numberacount(){
      const bearer = 'bearer '+ this.props.userToken;
      axios.request('GUET', {
          url:this.props.baseurl + '/v1/user_accounts/count',
          headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
        })
      .then(jsonresponse => { 
        this.setState({
        	count_account:jsonresponse.data
        })
      })
      .catch(error => {
      });
    }
    set_data(){
    	if (this.state.nombre === null) {
			this.setState({
				nombre:'N/A'
			})
		}
		if (this.state.movil === null) {
			this.setState({
				movil:'N/A'
			})
		}
		if (this.state.direccion === null) {
			this.setState({
				direccion:'N/A'
			})
		}
		if (this.state.puntosforex === null) {
			this.setState({
				puntosforex:'N/A'
			})
		}
		if (this.state.nombre_banco === null) {
			this.setState({
				nombre_banco:'N/A'
			})
		}
		if (this.state.pais_banco === null) {
			this.setState({
				pais_banco:'N/A'
			})
		}
		if (this.state.numero_cuenta === null) {
			this.setState({
				numero_cuenta:'N/A'
			})
		}
		if (this.state.fecha_nacimiento === null) {
			this.setState({
				fecha_nacimiento:'N/A'
			})
		}
		if (this.state.fecha_iniciocontrato === null) {
			this.setState({
				fecha_iniciocontrato:'N/A'
			})
		}
		if (this.state.fecha_finalizacioncontrato === null) {
			this.setState({
				fecha_finalizacioncontrato:'N/A'
			})
		}
		if (this.state.empresa_nombre === null) {
			this.setState({
				empresa_nombre:'N/A'
			})
		}
		if (this.state.empresa_telefono === null) {
			this.setState({
				empresa_telefono:'N/A'
			})
		}
		if (this.state.empresa_movil === null) {
			this.setState({
				empresa_movil:'N/A'
			})
		}
		if (this.state.empresa_direccion === null) {
			this.setState({
				empresa_direccion:'N/A'
			})
		}
		if (this.state.referred_by === null) {
			this.setState({
				referred_by:'N/A'
			})
		}
    }
	componentDidMount(){
		this.set_data()
		this.get_numberacount()		
  	}
  
	render(){
		return(
			<Backend title={this.state.title} page={this.state.page} menu={this.state.menu}>			
				<div className="page-cliente-empty none-margin">
					<div className="page-info height-card ">
						<div className="card-user">
							<h2 className="purple title-number">{this.state.nombre}</h2>
							<label>Represntante de la cuenta</label>
						</div>					
							
						<div className="card-detail-col">
							<strong className="purple title-number">{this.state.puntosforex}</strong>
							<br/>
							<span>Puntos FOREX</span>
						</div>
						<div className="card-detail-col">
							<strong className="whiteblue title-number">{this.state.count_account}</strong>
							<br/>
							<span>Numero de Cuentas</span>
						</div>
						<div className="card-detail-col">
							<ul className="referir-cuenta">
								<li>
									<a href="#Referir">Referir</a>
								</li>
								<li>
									<NavLink to="/selectacount">Cambiar de cuenta</NavLink>
								</li>
							</ul>
						</div>
					</div>



					<div className={`toggle-transaction toggle${this.state.showtransaction === true ? " toggle-selected" : ""}`}>
						<div className="infor-person margin50">
							<div className="col-person">
								<h2>Informacion de persona Juridica</h2>  <label className="edit"><a >Editar informacion <br/> de Registro</a></label> 
								<div className="section">
									<strong>{this.state.nombre_completo}</strong>
									<label>Nombre completo del propietario de la cuenta</label>
								</div>
								<div className="section">
									<ul>
										<li>
											<strong>{this.state.telefono}</strong><br/>
											<span>Teléfono</span>
										</li>
										<li>
											<strong>{this.state.movil}</strong><br/>
											<span>Móvil</span>
										</li>
									</ul>
								</div>
								<div className="section">
									<strong>{this.state.direccion}</strong>
									<label>Dirección</label>
								</div>
								<div className="section">
									<ul>
										<li>
											<strong>{this.state.referred_by}</strong><br/>
											<span>Referido por</span>
										</li>
										<li>
											<strong>{this.state.puntosforex}</strong><br/>
											<span>Puntos FOREX</span>
										</li>
									</ul>
								</div>
								<div className="section">
									<ul>
										<li>
											<strong>{this.state.nombre_banco}</strong><br/>
											<span>Nombre de Banco</span>
										</li>
										<li>
											<strong>{this.state.pais_banco}</strong><br/>
											<span>País del Banco</span>
										</li>
									</ul>
								</div>
								<div className="section">
									<ul>
										<li>
											<strong>{this.state.numero_cuenta}</strong><br/>
											<span>Numero de la Cuenta</span>
										</li>
										<li>
											
										</li>
									</ul>
								</div>
								<div className="section">
									<ul>
										<li>
											<strong>{this.state.fecha_iniciocontrato}</strong><br/>
											<span>Fecha de Inicio del contrato</span>
										</li>
										<li>
											<strong>{this.state.fecha_finalizacioncontrato}</strong><br/>
											<span>Fecha de Finalización de contrato</span>
										</li>
									</ul>
								</div>
							</div>
							<div className="col-person">
								<h2>Información de Empresa Representante</h2> 
								<div className="section">
									<strong>Empresa</strong>
									<label>{this.state.empresa_nombre}</label>
								</div>
								<div className="section">
									<ul>
										<li>
											<strong>{this.state.empresa_telefono}</strong><br/>
											<span>Teléfono</span>
										</li>
										<li>
											<strong>{this.state.empresa_movil}</strong><br/>
											<span>Móvil</span>
										</li>
									</ul>
								</div>
								<div className="section">
									<strong>{this.state.empresa_direccion}</strong><br/>
									<label>Dirección</label>
								</div>
							</div>
						</div>
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
    baseurl:state.mainReducer.setBaseUrl.baseurl
  }
}

export default withRouter(connect(mapStateToProps)(General))

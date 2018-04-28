import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import '../../../../assets/css/pages/general.css'
import Backend from '../../../../components/Layouts/Backend';
class Infoarchivos extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'Perfil',
			page:'archivos',
			menu:'perfil-cliente',
			nombre:this.props.infouser['firstname'] ,
			apellido:this.props.infouser['lastname'] ,
			nombre_completo:this.props.infouser['firstname'] +' '+ this.props.infouser['lastname'],
			civil_status:this.props.infouser['civil_status'],
			occupation:this.props.infouser['occupation'],
			country:this.props.infouser['country'],
			deparment:this.props.infouser['deparment'],
			ppe:this.props.infouser['ppe'],
			resident_us:this.props.infouser['resident_us'],
			resident_us_description:this.props.infouser['resident_us_description'],

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
    }
	componentDidMount(){
		console.log(this.props)
		this.set_data()
		this.get_numberacount()
		if (this.state.nombre === null) {
			this.setState({
				nombre:'N/A'
			})
		}
		if (this.state.apellido === null) {
			this.setState({
				apellido:'N/A'
			})
		}
		if (this.state.civil_status === null) {
			this.setState({
				civil_status:'N/A'
			})
		}
		if (this.state.occupation === null) {
			this.setState({
				occupation:'N/A'
			})
		}
		if (this.state.movil === null) {
			this.setState({
				movil:'N/A'
			})
		}
		if (this.state.country === null) {
			this.setState({
				country:'N/A'
			})
		}
		
		if (this.state.deparment === null) {
			this.setState({
				deparment:'N/A'
			})
		}
		if (this.state.ppe === null) {
			this.setState({
				ppe:'N/A'
			})
		}
		if (this.state.resident_us === null) {
			this.setState({
				resident_us:'N/A'
			})
		}
		if (this.state.resident_us_description === null) {
			this.setState({
				resident_us_description:'N/A'
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
						{/*<div className="card-detail-col">
							<ul className="referir-cuenta">
								<li>
									<a href="#Referir">Referir</a>
								</li>
								<li>
									<NavLink to="/selectacount">Cambiar de cuenta</NavLink>
								</li>
							</ul>
						</div>*/}
					</div>
					<div className="infor-person margin50">
						<div className="col-person ">
						
							<div className="section">
							    
								<ul>
									<li>
										<label>Cliente principal</label>
										<strong>{this.state.nombre}</strong>
									</li>
									<li>
										
									</li>
								</ul>
								
							</div>
							<div className="section">
								<ul>
									<li>
										<span>Corrreo electronico</span><br/>
										<strong>{this.state.civil_status}</strong>
										
									</li>
									<li>
										<span>Teléfono de Contacto</span><br/>
										<strong>{this.state.occupation}</strong>
										
									</li>
								</ul>
							</div>
						</div>
						<div className="col-person ">
							<label className="edit top25"><a href="#Editar"> <i className="md-icon">error_outline</i> Editar </a></label> 
							<div className="section">
								<label>Proveedor principal</label>
								<strong>{this.state.apellido}</strong>
							</div>
							<div className="section">
								<ul>
									<li>
									     <span>Correo electronico</span><br/>
										<strong>{this.state.resident_us_description}</strong>
										
									</li>
									<li>
										 <span>Teléfono</span><br/>
										<strong>{this.state.telefono}</strong>
									</li>
								</ul>
							</div>
						
						</div>
					</div>
				</div>
				   <div id="Editar" className="overlay">
                        <div className="popup">
                            <div className="popup-title">
                                <h4>Petición de editar </h4> <hr/> <a className="close" href={null}>x</a>
                                
                            </div>
                            <div className="popup-body">
                                    <p>
                                        Estos campos solo pueden ser editados por un administrador o moderador de FOREX.
                                    </p>
                                    <p>
                                        Le pedimos que se ponga en contacto al teléfono <strong>(+503) 8888 8888 </strong> o enviar un correo a <br/>
                                        <strong>info@consultorforex.com</strong> y explicar la razon por la cual se quiere hacer esa edición. Se le ruega que se adjunte un comprobantet (si es requerido) al momento de enviar el correo.
                                     </p>
                                    <div className="popup-retiro">
                                        <div className="form-group section-btn">
                                             <a className="blue btn" href={null} > ENTENDIDO</a>
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
export default withRouter(connect(mapStateToProps)(Infoarchivos))

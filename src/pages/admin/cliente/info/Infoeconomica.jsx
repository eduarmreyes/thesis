import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import '../../../../assets/css/pages/general.css'
import Backend from '../../../../components/Layouts/Backend';

class Infoeconomica extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'Perfil',
			page:'economica',
			menu:'detallecliente-admin',
			id_user:props.match.params.id_user,
			uuid:props.match.params.uuid,	
			infouser:[]		
		}
		this.show_form = this.show_form.bind(this)
		this.onChange = this.onChange.bind(this)
		this.set_data = this.set_data.bind(this)
		this.validate = this.validate.bind(this)
		this.show_form = this.show_form.bind(this)
		this.showerror = this.showerror.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.detail = this.detail.bind(this)
		this.set_data = this.set_data.bind(this)
	}
	
	detail(){
		const bearer = 'bearer '+ this.props.userToken;
		setTimeout(() => {  
	    axios.request('GUET', {
	      url:this.props.baseurl + '/v1/users/'+this.state.id_user+'',
	      headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
	    })
	    .then(jsonresponse => { 
			
	      const json = jsonresponse.data;
	      this.setState({
	      	infouser:json
	      })
		   
	      this.set_data()
	    })
	    .catch(error => {


	    });  
	   }, 500)
	}
	set_data(){
    	var infouser = this.state.infouser;	
    	this.setState({
			nombre:infouser.firstname ,
			apellido:infouser.lastname ,
			nombre_completo:infouser.firstname +' '+ infouser.lastname,
			civil_status:infouser.civil_status,
			occupation:infouser.occupation,
			country:infouser.country,
			deparment:infouser.deparment,
			ppe:infouser.ppe,
			resident_us:infouser.resident_us,
			resident_us_description:infouser.resident_us_description,
			economic_activity:infouser.economic_activity,
			telefono:infouser.telephone,
			movil:infouser.mobilephone,
			direccion:infouser.address,
			puntosforex:infouser.fxpoints,
			nombre_banco:infouser.bank_name,
			pais_banco:infouser.bank_country,
			numero_cuenta:infouser.bank_account,
			fecha_nacimiento:infouser.birthday,
			fecha_iniciocontrato:null,
			fecha_finalizacioncontrato:null,
			referred_by:infouser.referred_by,
			empresa_nombre:infouser.enterprise_name,
			empresa_telefono:infouser.enterprise_telefone,
			empresa_movil:infouser.enterprise_mobilephone,
			empresa_direccion:infouser.enterprise_address,
			count_account:'',
			active:false,
			place_of_work:infouser.place_of_work,
			work_address:infouser.work_address,
			workphone:infouser.workphone,
			number_document_identification:infouser.number_document_identification,		
			enterprise_fiscal_registry:infouser.enterprise_fiscal_registry
		});
		this.validate();
    }
	onChange(e) {
	  	this.setState({
	      [e.target.name]: e.target.value
	    });  
	}

    validate(){		
		if (this.state.place_of_work === null) {
			this.setState({
				place_of_work:'N/A'
			})
		}
		if (this.state.economic_activity === null) {
			this.setState({
				economic_activity:'N/A'
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
		if (this.state.work_address === null) {
			this.setState({
				work_address:'N/A'
			})
		}
		if (this.state.workphone === null) {
			this.setState({
				workphone:'N/A'
			})
		}
		if (this.state.number_document_identification === null) {
			this.setState({
				number_document_identification:'N/A'
			})
		}
		if (this.state.enterprise_fiscal_registry === null) {
			this.setState({
				enterprise_fiscal_registry:'N/A'
			})
		}
    }
    show_form(){
    	if (this.state.active === false) {
    		this.setState({
	    		active:true
	    	})
    	}else{
    		this.setState({
	    		active:false
	    	})
    	} 

    	this.setState({
	      msj:''
	    })  	
    }
	componentDidMount(){

		this.detail()
		this.validate()

  	}
  onSubmit(e) {
	    e.preventDefault();    

	    var actividad_economica = this.state.economic_activity;
	    var place_of_work  = this.state.place_of_work;
	    var occupation     = this.state.occupation;
	    var work_address   = this.state.work_address;
	    var workphone      = this.state.workphone;



	    const data =  new FormData();  
	    data.append('economic_activity',	actividad_economica === 'N/A' ? null : this.state.economic_activity );    
	    data.append('place_of_work',		place_of_work === 'N/A' ? null : this.state.place_of_work);
	    data.append('occupation',			occupation === 'N/A' ? null : this.state.occupation);
	    data.append('work_address',	    	work_address === 'N/A' ? null : this.state.work_address);
	    data.append('workphone',			workphone === 'N/A' ? null : this.state.workphone);
		const bearer = 'Bearer '+ this.props.userToken;

		axios({
	    	method: 'put',
	    	url: 'https://rupert-x.herokuapp.com/dashboard/v1/users/'+this.state.id_user+'',
	    	data: data,
				headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
	    })
	    .then(jsonresponse => {
	    	this.showsucces()
	    	this.detail()
	    })  
	    .catch(error => {
	     	 this.showerror(error)
	    });
  }
  showerror(error){
  	let message = <p className="error">*Error al enviar los datos.</p>;        
    this.setState({
      msj:message
    })
  }
  showsucces(){
	let message = <p className="succes">* Sus Datos se guardaron correctamente</p>;   
    this.setState({
      msj:message
    })
  }


	render(){
		return(
			<Backend title={this.state.title} page={this.state.page} menu={this.state.menu} uuid={this.state.uuid} id_user={this.state.id_user}>			
				<div className="page-cliente-empty none-margin">
					
					<form onSubmit={this.onSubmit}>
						<div className="infor-person margin50">
						<div className="user-name">
							<div className="section">
								<ul>
									<li>										
										<strong>{this.state.nombre_completo}</strong><br/>
										<span>Nombre Comercial de empresa  a que representa</span>										
									</li>							
								</ul>
							</div>
						</div>
						<div className="col-person ">
							<div className="content-body">
								<div className="section">
								    
									<ul>
										<li>
											<label>Nombre Comercial</label>
											<strong  >{this.state.place_of_work}</strong>
											
										</li>
										<li>
											
										    <span>Teléfono</span><br/>
											<strong >{this.state.workphone}</strong>
											
																	
										</li>
									</ul>								
								</div>
								<div className="section">
									<ul>
										<li>
											<span>Giro o actividad economica</span><br/>
											<strong >{this.state.economic_activity}</strong>
											
											
											
										</li>
										<li>
										<label>Dirección de la entidad</label>
										<strong >{this.state.work_address}</strong>
										
											
										</li>
									</ul>
								</div>
								<div className="section">
									<ul>
										<li>
											<label>NIT /NIF</label>
									        <strong  >{this.state.number_document_identification}</strong>
											
										</li>
										<li>
										  
											
										</li>
									</ul>
								</div>
								<div className="section">
								   <ul>
										<li>
											<label>N° de registro fiscal</label>
											<strong >{this.state.enterprise_fiscal_registry}</strong>

										</li>
										<li>
										  
											
										</li>
									</ul>
								</div>		
							</div>		
						
						</div>
					    {/*/////////////////////////////////////////////*/}
						<div className="col-person margtop">
							<label className="edit top100">
					
							<a  href="#Editar" > <i className="md-icon">error_outline</i> Editar </a></label> 
				
							<div className="section">
								<ul>
									<li>

									</li>
									<li>
										
									</li>
								</ul>
							</div>
							<div className="section">
								{/*<ul>
									<li>
									    <span>¿Estimado de ingresos mensuales?</span><br/>
										<strong className={` ${this.state.active === false ? "active" : "inactive"}`} > </strong>
										<select className={` ${this.state.active === true ? "active" : "inactive"}`} >
											<option>$o.1 hasta $9,600.00</option>
										</select>										
									</li>
									<li>
									</li>
								</ul>*/}
							
							</div>

							<div className="msj-content">
								{this.state.msj}
							</div>
						</div>
						</div>
					</form>
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
                                        <strong>info@uees.edu.sv</strong> y explicar la razon por la cual se quiere hacer esa edición. Se le ruega que se adjunte un comprobantet (si es requerido) al momento de enviar el correo.
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
    infocuenta:state.mainReducer.auth.info_cuenta,
    baseurl:state.mainReducer.setBaseUrl.baseurl
  }
}


export default withRouter(connect(mapStateToProps)(Infoeconomica))

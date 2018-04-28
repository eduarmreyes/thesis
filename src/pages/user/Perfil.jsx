import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import '../../assets/css/pages/general.css'
import Backend from '../../components/Layouts/Backend';
import actions from "../../actions"
class General extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'Perfil',
			page:'perfil',
			menu:'perfil-cliente',
			nombre:this.props.infouser['firstname'] ,
			apellido:this.props.infouser['lastname'] ,
			nombre_completo:this.props.infouser['firstname'] +' '+ this.props.infouser['lastname'],
			civil_status:this.props.infouser['civil_status'],
			telefono:this.props.infouser['telephone'],
			movil:this.props.infouser['mobilephone'],
			number_document_identification:this.props.infouser['number_document_identification'],
			occupation:this.props.infouser['occupation'],
			type_document_indentification:this.props.infouser['type_document_indentification'],
			country:this.props.infouser['country'],
			deparment:this.props.infouser['deparment'],
			direccion:this.props.infouser['address'],
			doc1:this.props.infouser['doc1'],
			resident_us:this.props.infouser['resident_us'],
			resident_us_description:this.props.infouser['resident_us_description'],
			ppe:this.props.infouser['ppe'],
			place_of_work:this.props.infouser['place_of_work'],
			position_held:this.props.infouser['position_held'],
			work_address:this.props.infouser['work_address'],
			workphone:this.props.infouser['workphone'],
			
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
			email:this.props.infouser['email'],
			count_account:'',
			showpersonal:false,
			showcontact:false,
			showinfo:false,
			active_contact:false,
			active_info:false,

		}
		this.get_numberacount = this.get_numberacount.bind(this)
		this.set_data = this.set_data.bind(this)	
		this.show_contactform = this.show_contactform.bind(this)
		this.show_infoform = this.show_infoform.bind(this)

		this.onSubmitcontact = this.onSubmitcontact.bind(this)
		this.onSubmitinfoeconomica = this.onSubmitinfoeconomica.bind(this)

		this.showsucces = this.showsucces.bind(this)
		this.showerror = this.showerror.bind(this)
		this.showinfo = this.showinfo.bind(this)
		this.showcontact = this.showcontact.bind(this)
		this.showpersonal = this.showpersonal.bind(this)
		this.showsuccesct = this.showsuccesct.bind(this)
		this.showerrorct = this.showerrorct.bind(this)
		this.onChange = this.onChange.bind(this)
		
	}
	onChange(e) {
	  	this.setState({
	      [e.target.name]: e.target.value
	    });  
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
		if (this.state.email === null) {
			this.setState({
				email:'N/A'
			})
		}
		if (this.state.doc1 === null) {
			this.setState({
				doc1:'N/A'
			})
		}
		if (this.state.workphone === null) {
			this.setState({
				workphone:'N/A'
			})
		}

		if (this.state.work_address === null) {
			this.setState({
				work_address:'N/A'
			})
		}

		if (this.state.position_held === null) {
			this.setState({
				position_held:'N/A'
			})
		}

		if (this.state.place_of_work === null) {
			this.setState({
				place_of_work:'N/A'
			})
		}

		if (this.state.type_document_indentification === null) {
			this.setState({
				type_document_indentification:'N/A'
			})
		}

		if (this.state.number_document_identification === null) {
			this.setState({
				number_document_identification:'N/A'
			})
		}
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
  	showpersonal(event, estado) {
   		event.preventDefault()
   		this.setState({
   		 	showpersonal:!this.state.showpersonal
   		})
	}
	
	showinfo(event, estado) {
   	    event.preventDefault()
   	    this.setState({
   		 	showinfo:!this.state.showinfo
   		})
	}
	show_infoform(){
    	if (this.state.active_info === false) {
    		this.setState({
	    		active_info:true
	    	})
    	}else{
    		this.setState({
	    		active_info:false
	    	})
    	} 
    	if(this.state.showinfo === false)
    	{
    		this.setState({
	    		showinfo:true
	    	})
    	}
    	this.setState({
	      msj:''
	    })  	
    }
	show_contactform(){
		console.log(this.state.showcontact)
    	if (this.state.active_contact === false) {
    		this.setState({
	    		active_contact:true
	    	})
    	}else{
    		this.setState({
	    		active_contact:false
	    	})
    	} 
    	if(this.state.showcontact === false)
    	{
    		this.setState({
	    		showcontact:true
	    	})
    	}
    	this.setState({
	      msj:''
	    })  	
    }
    showcontact(event, estado) {
   		event.preventDefault()
   		this.setState({
   		 	showcontact:!this.state.showcontact
   		})
	}
    
    showerror(error){
	  	let message = <p className="error">*Error al guadar los datos</p>;        
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
  	showerrorct(error){
	  	let message = <p className="error">*Error al guadar los datos</p>;        
	    this.setState({
	      msjct:message
	    })
	}
	showsuccesct(){
		let message = <p className="succes">* Sus Datos se guardaron correctamente</p>;   
	    this.setState({
	      msjct:message
	    })
  	}
  	get_me(){   
 
      const bearer = 'bearer '+ this.props.userToken;
     

      axios.request('POST', {
        url:'https://rupert-x.herokuapp.com/dashboard/v1/me',
        headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
      })
      .then(jsonresponse => { 
          const obj = {
            authorize:this.props.authorize,
            token: this.props.userToken,
            scope: this.props.scope,
            email: this.props.email,
            id: this.props.id,
            register: this.props.register,
            type:this.props.type,
            infouser: jsonresponse.data,            
            info_cuenta:this.props.info_cuenta            
          }
        console.log(obj)
        this.props.dispatch(actions.setAuth(obj))
        //this.props.history.push("/companytype")

      })  
      .catch(error => {
        this.showerror(error)
      });
	}
	onSubmitcontact(e) {
	    e.preventDefault();    

	    var telefono   = this.state.telefono;
	    var movil      = this.state.movil;
	    var direccion  = this.state.direccion;



	    const data =  new FormData();  
	  
	    data.append('telephone',		    telefono  === 'N/A' ? null : this.state.telefono);
	    data.append('mobilephone',			movil     === 'N/A' ? null : this.state.movil);
	    data.append('address',	    direccion === 'N/A' ? null : this.state.direccion);
		const bearer = 'Bearer '+ this.props.userToken;

		axios({
	    	method: 'put',
	    	url: 'https://rupert-x.herokuapp.com/dashboard/v1/users',
	    	data: data,
				headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
	    })
	    .then(jsonresponse => {
	    	this.showsuccesct()
	    	this.get_me()
	    })  
	    .catch(error => {
	     	 this.showerrorct(error)
	    });
	}
	onSubmitinfoeconomica(e) {
	    e.preventDefault();    

	    var place_of_work  = this.state.place_of_work;
	    var position_held  = this.state.position_held;
	    var workphone      = this.state.workphone;
	    var work_address   = this.state.work_address;



	    const data =  new FormData();  
	  
	    data.append('place_of_work',		place_of_work === 'N/A' ? null : this.state.place_of_work);
	    data.append('position_held',	    position_held === 'N/A' ? null : this.state.position_held);
	    data.append('workphone',	    	workphone     === 'N/A' ? null : this.state.workphone);
	    data.append('work_address',			work_address  === 'N/A' ? null : this.state.work_address);
	    
		const bearer = 'Bearer '+ this.props.userToken;

		axios({
	    	method: 'put',
	    	url: 'https://rupert-x.herokuapp.com/dashboard/v1/users',
	    	data: data,
				headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
	    })
	    .then(jsonresponse => {
	    	this.showsucces()
	    	this.get_me()
	    })  
	    .catch(error => {
	     	 this.showerror(error)
	    });
	}
	render(){
		return(
			<Backend title={this.state.title} page={this.state.page} menu={this.state.menu}>			
				<div className="page-cliente-empty none-margin">
					<div  className={`infor-person margin50 toggle-zona toggle toggle-selected `}>
						<div className="user-name">
							<div className="section">
								<ul>
									<li>										
										<strong>{this.state.nombre_completo}</strong><br/>
										<span>Persona juridica</span>										
									</li>							
								</ul>
							</div>
						</div>
						<div className={`col-person`}>						
							<div className="content-body">
								<div className="section">
									<ul>
										<li>
											<span>Estado Civil</span><br/>
											<strong>{this.state.civil_status}</strong>
											
										</li>
										<li>
											<span>Profesión</span><br/>
											<strong>{this.state.occupation}</strong>
											
										</li>
									</ul>
								</div>

								<div className="section">
									<ul>
										<li>
											<span>País</span><br/>
											<strong>{this.state.country}</strong>
											
										</li>
										<li>
										    <span>Departamento/Ciudad</span><br/>
											<strong>{this.state.deparment}</strong>
											
										</li>
									</ul>
								</div>

								<div className="section">
								    <label>Numero de Identificación Ciudadana</label>
									<strong>{this.state.doc1}</strong>
								</div>
						
								<div className="section">
									<ul>
										<li>
											<span>Documento de Identificación </span><br/>
											<strong>{this.state.type_document_indentification} </strong>
											
										</li>
										<li>
										    <span>Numero de Documento</span><br/>
											<strong>{this.state.number_document_identification} </strong>
										</li>
									</ul>
								</div>
							</div>

						</div>
						<div className={`col-person`}>
							<div className="content-body"> 
								<div className="section">
									<ul>
										<li>
										    <span>¿Es persona politicamente expuesta?</span><br/>
											<strong>{ this.state.ppe === true ? "SI" : "NO"}</strong>										
										</li>
										<li>
											
										</li>
									</ul>
								</div>
								<div className="section">
									<span>¿Eres Ciudadano o residente de los Estado Unidos de America?</span>
									<strong>{this.state.resident_us === true ? "SI" : "NO"}</strong>
								</div>
								<div className="section">
									<span>Correo:</span>
									<strong>{this.state.email}</strong>
								</div>
							</div>

						</div>
					</div>
					<div className=" toggle-menu margin50">
						<ul>
							<li> 
								<label> Datos Contacto</label>
							</li>
							<li className="card-center">							
							 <a href={null} onClick={this.show_contactform} ><i className="md-icon">create</i></a>
							</li>
							
							<li className="card-center">
								<a onClick={event => { this.showcontact(event, "active") }}> <i className="md-icon">keyboard_arrow_down</i></a>
							</li>
						</ul>
						<ul>
							<li className="full-width-line">
								<hr/>
							</li>
						</ul>
					</div>
					<form onSubmit={this.onSubmitcontact}> 
					<div  className={`infor-person margin50 toggle-zona toggle${this.state.showcontact === true ? " toggle-selected" : ""}`}>
						<div className={`col-person  ${this.state.showcontact === true ? " center-panel " : "inactive"}`}>
							<div className="content-body">
								<div className="section">
								    
									<ul>
										<li>
											<label>Telefono de Residencia</label>
											<strong className={` ${this.state.active_contact === false ? "active" : "inactive"}`}>{this.state.telefono}</strong>
											<input className={` ${this.state.active_contact === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="telefono" name="telefono" value={this.state.telefono || ''} />
										</li>
										<li>
											<label>Movil</label>
											<strong className={` ${this.state.active_contact === false ? "active" : "inactive"}`}>{this.state.movil}</strong>
											<input className={` ${this.state.active_contact === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="movil" name="movil" value={this.state.movil || ''} />
										</li>
									</ul>
								</div>
								<div className="section">
								
									<span>Direccion de Residencia</span><br/>
									<strong className={` ${this.state.active_contact === false ? "active" : "inactive"}`} >{this.state.direccion}</strong>
								    <textarea className={` ${this.state.active_contact === true ? "active" : "inactive"}`} placeholder="" rows="5"  cols="50" name="direccion" value={this.state.direccion || ''} onChange={this.onChange}></textarea>
								</div>
							</div>
						</div>
						<div className={`col-person  ${this.state.showcontact === true ? " center-panel " : "inactive"}`}>
							<div className="content-body">
								<div className="section">
									<div className="grup-btn">
										<a className="btn-save"> Cancelar</a> <button type="submit" className="btn-save"> Guardar</button>
									</div>							
								</div>	
								<div className="msj-content">
										{this.state.msjct}
								</div>	
							</div>
						</div>					
					</div>
					</form>
					<div className=" toggle-menu margin50">
						<ul>
							<li> 
								<label> Información Económica</label>
							</li>
							<li className="card-center">							
							 <a href="#Info" onClick={this.show_infoform} > <i className="md-icon">create</i></a>
							</li>
							<li className="card-center">
								<a href="#Info" onClick={event => { this.showinfo(event, "active") }}> <i className="md-icon">keyboard_arrow_down</i></a>
							</li>
						</ul>
						<ul>
							<li className="full-width-line">
								<hr/>
							</li>
						</ul>
					</div>
					<form onSubmit={this.onSubmitinfoeconomica}> 
					<div  className={`infor-person margin50 toggle-zona toggle${this.state.showinfo === true ? " toggle-selected" : ""}`}>
						<div className={`col-person  ${this.state.showinfo === true ? " center-panel " : "inactive"}`}>
							<div className="content-body">
								<div className="section">
								    
									<ul>
										<li>
											<label>Nombre del lugar de trabajo</label>
											<strong className={` ${this.state.active_info === false ? "active" : "inactive"}`}>{this.state.place_of_work}</strong>
											<input className={` ${this.state.active_info === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="place_of_work" name="place_of_work" value={this.state.place_of_work || ''} />	
										</li>
										<li>
										</li>
									</ul>								
								</div>
								<div className="section">
									<ul>
										<li>
											<span>Cargo que desempeña</span><br/>
											<strong className={` ${this.state.active_info === false ? "active" : "inactive"}`}>{this.state.position_held}</strong>
											<input className={` ${this.state.active_info === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="position_held" name="position_held" value={this.state.position_held || ''} />	
											
										</li>
										<li>
											<span>Telefóno de Trabajo</span><br/>
											<strong className={` ${this.state.active_info === false ? "active" : "inactive"}`}>{this.state.workphone}</strong>
											<input className={` ${this.state.active_info === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="workphone" name="workphone" value={this.state.workphone || ''} />											
										</li>
									</ul>
								</div>

								<div className="section">
									<ul>
										<li>
											<span>Estimado de ingresos anuales</span><br/>
											<strong className={` ${this.state.active_info === false ? "active" : "inactive"}`}>{this.state.country}</strong>	
											<input className={` ${this.state.active_info === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="apellido" name="apellido" value={this.state.apellido || ''} />									
										</li>
										<li>
										</li>
									</ul>
								</div>
								<div className="section">
								    <label>Dirección de trabajo</label>
									<strong className={` ${this.state.active_info === false ? "active" : "inactive"}`} >{this.state.work_address}</strong>		
									<textarea className={` ${this.state.active_info === true ? "active" : "inactive"}`} placeholder="" rows="5"  cols="50" name="work_address" value={this.state.work_address || ''} onChange={this.onChange}></textarea>						
								</div>
							</div>
						</div>
						<div className={`col-person  ${this.state.showinfo === true ? " center-panel " : "inactive"}`}>
							<div className="content-body">
								<div className="section">
									<div className="grup-btn">
										<a className="btn-save"> Cancelar</a> <button type="submit" className="btn-save"> Guardar</button>
									</div>							
								</div>	
								<div className="msj-content">
									{this.state.msj}
								</div>	
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
    info_cuenta: state.mainReducer.auth.info_cuenta,
    baseurl:state.mainReducer.setBaseUrl.baseurl
    
  }
}

export default withRouter(connect(mapStateToProps)(General))

import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import '../../../assets/css/pages/general.css'
import Backend from '../../../components/Layouts/Backend';
import actions from "../../../actions"

class Infoeconomica extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'Perfil',
			page:'economica',
			menu:'perfil-cliente'			
		}
		this.get_numberacount = this.get_numberacount.bind(this)
		this.set_data = this.set_data.bind(this)
		this.show_form = this.show_form.bind(this)
		this.onChange = this.onChange.bind(this)
		this.set_data = this.set_data.bind(this)
		this.validate = this.validate.bind(this)
		this.show_form = this.show_form.bind(this)
		this.showerror = this.showerror.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
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
    	this.setState({
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
			economic_activity:this.props.infouser['economic_activity'],

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
			count_account:'',
			active:false,

			place_of_work:this.props.infouser['place_of_work'],
			work_address:this.props.infouser['work_address'],
			workphone:this.props.infouser['workphone'],
			number_document_identification:this.props.infouser['number_document_identification'],		
			enterprise_fiscal_registry:this.props.infouser['enterprise_fiscal_registry']
		});
    }
    validate(){

    	this.set_data()
		this.get_numberacount()
		
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
		if (this.state.occupation === null) {
			this.setState({
				occupation:'N/A'
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
		console.log(this.props)
		setTimeout(() => { 
			this.set_data()
			this.validate()
		}, 10) 
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
  showerror(error){
  	let message = <p className="error">*Error al guadar los datos.</p>;        
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
            info_cuenta:this.props.infocuenta            
          }
     console.log(obj)
        this.props.dispatch(actions.setAuth(obj))
        //this.props.history.push("/companytype")

      })  
      .catch(error => {
        this.showerror(error)
      });
  }

	render(){
		return(
			<Backend title={this.state.title} page={this.state.page} menu={this.state.menu}>			
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

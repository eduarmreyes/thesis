import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import '../../../../assets/css/pages/general.css'
import Backend from '../../../../components/Layouts/Backend';
class Infobancaria extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'Perfil',
			page:'bancaria',		
			active:false,
			overlay:false,
			menu:'detallecliente-admin',
			id_user:props.match.params.id_user,
			uuid:props.match.params.uuid,	
			infouser:[]				
		}
	
		this.set_data = this.set_data.bind(this)
		this.show_form = this.show_form.bind(this)
		this.onChange = this.onChange.bind(this)
		this.validate = this.validate.bind(this)
		this.showerror = this.showerror.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.save_confirm = this.save_confirm.bind(this)
		this.detail = this.detail.bind(this)
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
	onChange(e) {
	  	this.setState({
	      [e.target.name]: e.target.value
	    });  
	}

    set_data(){
    	var infouser = this.state.infouser;	


    	this.setState({					
			nombre_banco:infouser.bank_name,
			pais_banco:infouser.bank_country,
			numero_cuenta:infouser.bank_account,
			telephone_bank:infouser.telephone_bank,
			address_bank:infouser.address_bank,
			swift:infouser.swift,
			iba:infouser.iba,
			aba:infouser.aba,
		});
		this.validate();
    }
    validate(){

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
		if (this.state.telephone_bank === null) {
			this.setState({
				telephone_bank:'N/A'
			})
		}
		if (this.state.address_bank === null) {
			this.setState({
				address_bank:'N/A'
			})
		}
		if (this.state.swift === null) {
			this.setState({
				swift:'N/A'
			})
		}
		if (this.state.iba === null) {
			this.setState({
				iba:'N/A'
			})
		}
		if (this.state.aba === null) {
			this.setState({
				aba:'N/A'
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

  	save_confirm(){
  		this.setState({
  			overlay:true
  		})
  	}
  	onSubmit(e) {
	    e.preventDefault();    

	    var numero_cuenta   = this.state.numero_cuenta;
	    var nombre_banco    = this.state.nombre_banco;
	    var pais_banco      = this.state.pais_banco;
	    var telephone_bank  = this.state.telephone_bank;
	    var address_bank    = this.state.address_bank;
	    var aba             = this.state.aba;
	    var iba             = this.state.iba;
	    var swift           = this.state.swift;
	    var note            = this.state.note;



	    const data =  new FormData();  
	    data.append('bank_account',	     numero_cuenta === 'N/A' ? null : this.state.numero_cuenta );    
	    data.append('bank_name',		  nombre_banco === 'N/A' ? null : this.state.nombre_banco);
	    data.append('bank_country',			pais_banco === 'N/A' ? null : this.state.pais_banco);
	    data.append('telephone_bank',	telephone_bank === 'N/A' ? null : this.state.telephone_bank);
	    data.append('address_bank',		  address_bank === 'N/A' ? null : this.state.address_bank);
	    data.append('aba',			               aba === 'N/A' ? null : this.state.aba);
	    data.append('iba',			               iba === 'N/A' ? null : this.state.iba); 
	    data.append('swift',			         swift === 'N/A' ? null : this.state.swift);
	    data.append('note',			              note === 'N/A' ? null : this.state.note);
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
	    	this.show_form()
	    })  
	    .catch(error => {
	     	 this.showerror(error)
	    });

	    this.setState({
	    	overlay:false
	    })
  	}
  	showerror(error){
	  	let message = <p className="error">*error al enviar los datos.</p>;        
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
				

							<div className="infor-person margin50">
								<div className="col-person ">
									<div className="content-body">
										<div className="section">
										    
											<ul>
												<li>
													<label>Numero de cuenta</label>
													<strong className={` ${this.state.active === false ? "active" : "inactive"}`} >{this.state.numero_cuenta}</strong>
													<input className={` ${this.state.active === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="numero_cuenta" name="numero_cuenta" value={this.state.numero_cuenta || ''} />
												</li>
												<li>
																					
												</li>
											</ul>
											
										</div>
										<div className="section">
											<ul>
												<li>
													<span>Nombre de Banco</span><br/>
													<strong className={` ${this.state.active === false ? "active" : "inactive"}`} >{this.state.nombre_banco}</strong>
													<input className={` ${this.state.active === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="nombre_banco" name="nombre_banco" value={this.state.nombre_banco || ''} />
												</li>
												<li>
										
													
												</li>
											</ul>
										</div>

										<div className="section">
											<ul>
												<li>
													<span>País de provinencia del Banco</span><br/>
													<strong className={` ${this.state.active === false ? "active" : "inactive"}`} >{this.state.pais_banco}</strong>
													<input className={` ${this.state.active === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="pais_banco" name="pais_banco" value={this.state.pais_banco || ''} />
													
												</li>
												<li>
												  
													
												</li>
											</ul>
										</div>
										<div className="section">
										    <label>Teléfono de Banco</label>
											<strong className={` ${this.state.active === false ? "active" : "inactive"}`} >{this.state.telephone_bank}</strong>
											<input className={` ${this.state.active === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="telephone_bank" name="telephone_bank" value={this.state.telephone_bank || ''} />
										
											
										</div>	
										<div className="section">
											<ul>
												<li>
												    <span>Dirección de Banco</span><br/>
													<strong className={` ${this.state.active === false ? "active" : "inactive"}`} >{this.state.address_bank }</strong>
													<textarea className={` ${this.state.active === true ? "active" : "inactive"}`} placeholder="" rows="5"  cols="50" name="address_bank" value={this.state.address_bank || ''} onChange={this.onChange}></textarea>
												</li>
												<li>
													
												</li>
											</ul>
										</div>
									</div>			
								
								</div>
								<div className="col-person margtop">
									<div className="content-body">
									<label className="edit top100">
										<a href={null} onClick={this.show_form} className={` btn-save  ${this.state.active === true ? "active btn" : "inactive"}`} >CANCELAR</a>
										<a  onClick={this.save_confirm} className={` btn-save  ${this.state.active === true ? "active btn" : "inactive"}`} >GUARDAR</a>
										<a className={` ${this.state.active === false ? "active" : "inactive"}`} href={null} onClick={this.show_form}> <i className="md-icon">edit</i> Editar </a>
									</label> 
									
									<div className="section">
										<ul>
											<li>
											    <span>Codigo ABA</span><br/>
												<strong className={` ${this.state.active === false ? "active" : "inactive"}`} > {this.state.aba}</strong>
												<input className={` ${this.state.active === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="aba" name="aba" value={this.state.aba || ''} />
												
											</li>
											<li>
											</li>
										</ul>
									
									</div>
									<div className="section">
										<ul>
											<li>
											    <span>Codigo SWIFT</span><br/>
												<strong className={` ${this.state.active === false ? "active" : "inactive"}`} > {this.state.swift}</strong>
												<input className={` ${this.state.active === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="swift" name="swift" value={this.state.swift || ''} />
												
											</li>
											<li>
											</li>
										</ul>
									
									</div>
									<div className="section">
										<ul>
											<li>
											    <span>Codigo IBAN</span><br/>
												<strong className={` ${this.state.active === false ? "active" : "inactive"}`} > {this.state.iba}</strong>
												<input className={` ${this.state.active === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="iba" name="iba" value={this.state.iba || ''} />
											</li>
											<li>
											</li>
										</ul>
									</div>
									<div className="msj-content">
										{this.state.msj}
									</div>
									</div>
								</div>
							</div>
				
					</div>
					<div id="Editar" className={`popup-note overlay ${this.state.overlay === true ? "overlay_visible" : ""}`} >
                        <div className="popup">
                            <div className="popup-title">
                                <h4>Petición de editar </h4> <hr/> <a className="close" onClick={this.save_confirm} href={null}>x</a>                                
                            </div>
                            <div className="popup-body">
                                <p>
                                    Por políticas de FOREX debe dejar constancia de la razón por la que realiza una modificación en los datos de perfil. Debe ser breve para su pronta aprobación.
                                </p>
                               <textarea  placeholder="" rows="5"  cols="50" name="note" id="note" value={this.state.note || ''} onChange={this.onChange}></textarea>
                                <div className="popup-retiro">
                                    <div className="form-group section-btn">
                                         <a className="blue btn" href={null} onClick={this.onSubmit} > ENVIAR</a>
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

export default withRouter(connect(mapStateToProps)(Infobancaria))

import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import '../../../../assets/css/pages/general.css'
import Backend from '../../../../components/Layouts/Backend';
class Infoempresa extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'Perfil',
			page:'empresa',
			menu:'detallecliente-admin',
			id_user:props.match.params.id_user,
			uuid:props.match.params.uuid,	
			infouser:[],
			active:false,
			
		}


		this.show_form = this.show_form.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.showerror = this.showerror.bind(this)
		this.showsucces = this.showsucces.bind(this)
		this.onChange = this.onChange.bind(this)
		this.save_confirm = this.save_confirm.bind(this)
		this.detail = this.detail.bind(this)
		this.set_data = this.set_data.bind(this)
		
	}
	onChange(e) {
	  	this.setState({
	      [e.target.name]: e.target.value
	    });  
	}
	detail(){
		const bearer = 'bearer '+ this.props.userToken;
		setTimeout(() => {  
	    axios.request('GUET', {
	      url:this.props.baseurl + '/v1/users/'+this.state.id_user+'',
	      headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
	    })
	    .then(jsonresponse => { 
		console.log(jsonresponse)
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
			beneficiary:infouser.beneficiary,
			beneficiary_relationship:infouser.beneficiary_relationship,
			beneficiary_telephone:infouser.beneficiary_telephone,
			doc_beneficiary:infouser.doc_beneficiary
		})
		this.validate();
	}
    validate(){

		if (this.state.beneficiary === null) {
			this.setState({
				beneficiary:'N/A'
			})
		}
		if (this.state.beneficiary_relationship === null) {
			this.setState({
				beneficiary_relationship:'N/A'
			})
		}

		if (this.state.beneficiary_telephone === null) {
			this.setState({
				beneficiary_telephone:'N/A'
			})
		}
		if (this.state.doc_beneficiary === null) {
			this.setState({
				doc_beneficiary:'N/A'
			})
		}
	}
    onSubmit(e) {
	    e.preventDefault();    

	    var beneficiary = this.state.beneficiary;
	    var beneficiary_relationship  = this.state.beneficiary_relationship;
	    var beneficiary_telephone     = this.state.beneficiary_telephone;
	    var doc_beneficiary   = this.state.doc_beneficiary;
	    var note   = this.state.note;


	    const data =  new FormData();  
	  
	    data.append('beneficiary',						beneficiary === 'N/A' ? null : this.state.beneficiary);
	    data.append('beneficiary_relationship',			beneficiary_relationship === 'N/A' ? null : this.state.beneficiary_relationship);
	    data.append('beneficiary_telephone',	    	beneficiary_telephone === 'N/A' ? null : this.state.beneficiary_telephone);
	    data.append('doc_beneficiary',					doc_beneficiary === 'N/A' ? null : this.state.doc_beneficiary);
	    data.append('note',								note === 'N/A' ? null : this.state.note);

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
  	save_confirm(){
  		this.setState({
  			overlay:!this.state.overlay
  		})
  	}

	componentDidMount(){
		this.detail();
		this.validate();
	
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
											<strong className={` ${this.state.active === false ? "active" : "inactive"}`} >{this.state.beneficiary}</strong>
											<input className={` ${this.state.active === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="beneficiary" name="beneficiary" value={this.state.beneficiary || ''} />
											<br/>
											<span>Nombre del Beneficiario</span>										
										</li>							
									</ul>
								</div>
							</div>
							<div className="col-person ">
								<div className="content-body">
									<div className="section">
									    
										<ul>
											<li>
												<label>N° de identidad </label>
												<strong className={` ${this.state.active === false ? "active" : "inactive"}`} > {this.state.doc_beneficiary}</strong>
												<input className={` ${this.state.active === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="doc_beneficiary" name="doc_beneficiary" value={this.state.doc_beneficiary || ''} />
											</li>
											<li>
											
											</li>
										</ul>								
									</div>
									<div className="section">
										<ul>
											<li>
												<span>Relacion</span><br/>
												<strong className={` ${this.state.active === false ? "active" : "inactive"}`} > {this.state.beneficiary_relationship}</strong>
												<input className={` ${this.state.active === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="beneficiary_relationship" name="beneficiary_relationship" value={this.state.beneficiary_relationship || ''} />										
											</li>
											<li>
											</li>
										</ul>
									</div>
						
								</div>					
							</div>
							<div className="col-person ">
								
								<div className="content-body">
									<div className="section">
										<ul>
											<li>
											     <span>Teléfono de Contacto</span><br/>
												<strong className={` ${this.state.active === false ? "active" : "inactive"}`} > {this.state.beneficiary_telephone}</strong>
													<input className={` ${this.state.active === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="beneficiary_telephone" name="beneficiary_telephone" value={this.state.beneficiary_telephone || ''} />
												
											</li>
											<li>
												
											</li>
										</ul>
									</div>
									<div className="section">
										<ul>
											<li>
												<label className="edit top100">
												<a href={null} onClick={this.show_form} className={` btn-save  ${this.state.active === true ? "active btn" : "inactive"}`} >CANCELAR</a>
												<a onClick={this.save_confirm} className={` btn-save  ${this.state.active === true ? "active btn" : "inactive"}`} >GUARDAR</a>
												<a className={` ${this.state.active === false ? "active" : "inactive"}`} href={null} onClick={this.show_form}> <i className="md-icon">edit</i> Editar </a>
											</label> 
												
											</li>
											
										</ul>
									</div>
									<div className="msj-content">
										{this.state.msj}
									</div>
								</div>
							</div>
						</div>
					</form>
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
    info_cuenta: state.mainReducer.auth.info_cuenta,
    baseurl:state.mainReducer.setBaseUrl.baseurl
  }
}


export default withRouter(connect(mapStateToProps)(Infoempresa))

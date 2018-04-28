import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from "axios";
import InputMask from 'react-input-mask';
import LaddaButton, { EXPAND_LEFT } from 'react-ladda';

import actions from "../../../actions"
import '../../../assets/css/pages/pasos.css'

class Pasouno extends Component{
	constructor(props){
		super(props)

		this.state = {
			stado:'',
			loading: false,
			error_message: '',
			step:1,
			active_step:this.props.info_cuenta['step']
		}
		this.onChange			 = this.onChange.bind(this);
		this.onSubmit      = this.onSubmit.bind(this);
		this.showerror     = this.showerror.bind(this);
		this.removeMask    = this.removeMask.bind(this);
		this.toggleLoading = this.toggleLoading.bind(this);
		this.fillForm      = this.fillForm.bind(this);
		this.updateStep      = this.updateStep.bind(this);

    // Create state for all form inputs
    this.state.enterprise_name 										= '';
    this.state.commercial_name 										= '';
    this.state.enterprise_doc 										= '';
    this.state.enterprise_fiscal_registry 				= '';
    this.state.enterprise_address 								= '';
    this.state.enterprise_nationality 						= '';
    this.state.enterprise_telefone 								= '';
    this.state.enterprise_mobilephone 						= '';
    this.state.enterprise_economic_activity 			= '';
    
	}

	onSubmit(e) {
    e.preventDefault();

    this.toggleLoading(); 

    const data =  new FormData();  
    data.append('enterprise_name',								this.state.enterprise_name);    
    data.append('commercial_name',								this.state.commercial_name);
    data.append('enterprise_doc',									this.state.enterprise_doc);
    data.append('enterprise_fiscal_registry',			this.state.enterprise_fiscal_registry);
    data.append('enterprise_address',							this.state.enterprise_address);
    data.append('enterprise_nationality',					this.state.enterprise_nationality);
    data.append('enterprise_telefone',						this.removeMask(this.state.enterprise_telefone));
    data.append('enterprise_mobilephone',					this.removeMask(this.state.enterprise_mobilephone));
    data.append('enterprise_economic_activity',		this.state.enterprise_economic_activity);
		const bearer = 'bearer '+ this.props.userToken;
    axios({
    	method: 'put',
    	url: this.props.baseurl + '/v1/users',
    	data: data,
			headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
    })
    .then(jsonresponse => {
    	this.toggleLoading();
    	if (jsonresponse.status === 204) {
    		this.updateStep(bearer);
    	} else {
    		this.showerror('Request responded with status ' + jsonresponse.status);
    	}
    })  
    .catch(error => {
    	this.toggleLoading(); 
     	 this.showerror(error)
    });
  }
  updateStep(bearer) {
		const url = this.props.baseurl + '/v1/user_accounts/' + this.props.info_cuenta.uuid;

		const data =  new FormData();
		data.append('step', 1);

		axios({
			method: 'put',
			url: url,
			data: data,
			headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
		})
		.then(jsonresponse => {
			this.toggleLoading();
			if (jsonresponse.status === 204) {
				this.props.history.push('/empasodos');
			} else {
				this.showerror('Request responded with status ' + jsonresponse.status);
			}
		})  
		.catch(error => {
			this.toggleLoading(); 
		 	 this.showerror(error)
		});
  }
  fillForm(i, d) {
		this.setState({
	    [i]: d
	  });
  }
  onChange(e) {
		this.setState({
	    [e.target.name]: e.target.value
	  });
  }
	removeMask(v) {
		if (typeof v === "number") {return v;}
		return v.replace(/[^0-9]/g, '');
	}
  toggleLoading() {
    this.setState({
      loading: !this.state.loading,
    });
  }
  showerror(error){
    let message = '* ' + error.response.data.errors;        
    this.setState({
      error_message:message
    })
    this.toggleLoading();
  }
	componentDidMount() {
		const bearer = 'bearer '+ this.props.userToken;
	  axios({
	  	method: 'get',
	  	url: this.props.baseurl + '/v1/me',
			headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
	  })
	  .then(jsonresponse => {
	  	Object.entries(jsonresponse.data).map((v) => {
	  		this.fillForm(v[0], v[1]);
	  	});
	  })
	  .catch(error => {
	  	this.toggleLoading(); 
	   	 this.showerror(error)
	  });
	}

	render(){
		return(
		 <section id="register" className="register">
			<div className="flex-container">
				<div className="col-5">
					<div className="register--information">
						<h1 className="t-center">REGISTRO</h1>
						<p className="t-center register--indications">Pork filet mignon andouille picanha fatback. Ball tip pastrami turducken prosciutto</p>
						<p className="t-center blue">Paso 1: Información General</p>
						<ul className="register--steps-number">
							<li className="register-step"><a className="register-step--link active" to="empasouno">1</a></li>
							<li className="register-step"><a className="register-step--link" to="empasodos">2</a></li>
							<li className="register-step"><a className="register-step--link" to="empasotres">3</a></li>
							<li className="register-step"><a className="register-step--link" to="empasocuatro">4</a></li>
							<li className="register-step"><a className="register-step--link" to="empasocinco">5</a></li>
						</ul>
						{
							this.state.error_message != "" ?
							<div className="error">
								<p>
									{ this.state.error_message }
								</p>
							</div>
							:
							<div>
							</div>
						}
					</div>
				</div>
				<div className="col-7 register-form--step-1">
					<form className="register--form" onSubmit={this.onSubmit}>
						<div className="register--form-wrapper">
							<div className="register--form-d-flex">
								<div className="register--form--wrapper">
									<label className="register--label" htmlFor="enterprise_name">* Razón Social o Nombre de la empresa</label>
									<input className="register--input" type="text" required name="enterprise_name" id="enterprise_name" onChange={this.onChange} value={
										(this.state.enterprise_name) ?
										this.state.enterprise_name :
										''
									} />
								</div>
							</div>
						</div>
						<div className="register--form-wrapper">
							<div className="register--form-d-flex">
								<div className="register--form--wrapper">
									<label className="register--label" htmlFor="commercial_name">* Nombre Comercial</label>
									<input className="register--input" type="text" required name="commercial_name" id="commercial_name" onChange={this.onChange} value={
										(this.state.commercial_name) ?
										this.state.commercial_name :
										''
									} />
								</div>
							</div>
						</div>
						<div className="register--form-wrapper">
							<div className="register--form-d-flex">
								<div className="register--form--wrapper">
									<label className="register--label" htmlFor="enterprise_doc">* NIT o NIF</label>
									<input className="register--input" type="text" required name="enterprise_doc" id="enterprise_doc" onChange={this.onChange} value={
										(this.state.enterprise_doc) ?
										this.state.enterprise_doc :
										''
									} />
								</div>
								<div className="register--form--wrapper register--form-date">
									<label className="register--label" htmlFor="enterprise_fiscal_registry">* N° de registro fiscal</label>
									<input className="register--input" type="text" required name="enterprise_fiscal_registry" id="enterprise_fiscal_registry" onChange={this.onChange} value={
										(this.state.enterprise_fiscal_registry) ?
										this.state.enterprise_fiscal_registry :
										''
									} />
								</div>
							</div>
						</div>
						<div className="register--form-wrapper">
							<div className="register--form-d-flex">
								<div className="register--form--wrapper register--form-date">
									<label className="register--label" htmlFor="enterprise_address">* Dirección</label>
									<input className="register--input" type="text" required name="enterprise_address" id="enterprise_address" onChange={this.onChange} value={
										(this.state.enterprise_address) ?
										this.state.enterprise_address :
										''
									} />
								</div>
							</div>
						</div>
 						<div className="register--form-d-flex">
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="enterprise_nationality">* Nacionalidad</label>
								<input className="register--input" type="text" required name="enterprise_nationality" id="enterprise_nationality" onChange={this.onChange} value={
									(this.state.enterprise_nationality) ?
									this.state.enterprise_nationality :
									''
								} />
							</div>
							<div className="register--form--wrapper"></div>
						</div>
						<div className="register--form-d-flex">
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="enterprise_telefone">* Teléfono</label>
								<InputMask mask="+(999) 99 99 99 99 99" maskChar=" " className="register--input" type="text" required name="enterprise_telefone" id="enterprise_telefone" onChange={this.onChange} value={
									(this.state.enterprise_telefone) ?
									this.state.enterprise_telefone :
									''
								} />
							</div>
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="enterprise_mobilephone">* Móvil</label>
								<InputMask mask="+(999) 99 99 99 99 99" maskChar=" " className="register--input" type="text" required name="enterprise_mobilephone" id="enterprise_mobilephone" onChange={this.onChange} value={
									(this.state.enterprise_mobilephone) ?
									this.state.enterprise_mobilephone :
									''
								} />
							</div>
						</div>
						<div className="register--form-d-flex">
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="enterprise_economic_activity">* Giro o actividad económica</label>
								<input className="register--input" type="text" required name="enterprise_economic_activity" id="enterprise_economic_activity" onChange={this.onChange} value={
									(this.state.enterprise_economic_activity) ?
									this.state.enterprise_economic_activity :
									''
								} />
							</div>
							<div className="register--form--wrapper"></div>
						</div>
						<div className="register--form-d-flex">
							<div className="register--form--buttons">
								<LaddaButton
								    loading={this.state.loading}
								    data-style={EXPAND_LEFT}
								    type="submit"
								    className="btn btn-save">
								    Guardar
								</LaddaButton>
								<Link to="/empasodos" className={`btn btn-next ${this.state.step >= this.state.active_step ? "disabled-link" : ""}`}>Siguiente</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
		</section>
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

export default withRouter(connect(mapStateToProps)(Pasouno));

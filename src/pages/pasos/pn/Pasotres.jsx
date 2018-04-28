import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios';
import ReactTooltip from 'react-tooltip'
import FaInfoCircle from 'react-icons/lib/fa/info-circle';
import FaCheckCircle from 'react-icons/lib/fa/check-circle';
import InputMask from 'react-input-mask';
import LaddaButton, { EXPAND_LEFT } from 'react-ladda';

import '../../../assets/css/pages/pasos.css'

class Pasotres extends Component{
	constructor(props){
		super(props)

		this.state = {
			stado:'',
			loading: false,
			error_message: '',
			step:3,
			active_step:this.props.info_cuenta['step']
		}
		this.onChange      = this.onChange.bind(this)
		this.onSubmit      = this.onSubmit.bind(this)
		this.showerror     = this.showerror.bind(this);
		this.toggleLoading = this.toggleLoading.bind(this);
		this.fillForm      = this.fillForm.bind(this);
		this.removeMask    = this.removeMask.bind(this);
		this.submitFiles   = this.submitFiles.bind(this);
		this.updateStep      = this.updateStep.bind(this);

    this.state.personal_references        = '';
    this.state.personal_references_phone  = '';
    this.state.personal_references2       = '';
    this.state.personal_references_phone2 = '';

    this.state.dui_file_name                = '';
    this.state.nit_file_name                = '';
    this.state.passaport_file_name          = '';
    this.state.card_fiscal_file_name        = '';
    this.state.bank_reference_file_name     = '';
    this.state.proof_address_file_name      = '';
    this.state.record_of_payments_file_name = '';
    this.state.salary_file_name             = '';

    this.state.dui                = '';
    this.state.nit                = '';
    this.state.passaport          = '';
    this.state.card_fiscal        = '';
    this.state.salary             = '';
    this.state.proof_address      = '';
    this.state.bank_reference     = '';
    this.state.family_reference   = '';
    this.state.record_of_payments = '';

	}

	onSubmit(e) {
    e.preventDefault();

    this.toggleLoading();

    const data =  new FormData();  
    data.append('personal_references',					this.state.personal_references);    
    data.append('personal_references_phone',		this.removeMask(this.state.personal_references_phone));
    data.append('personal_references2',					this.state.personal_references2);
    data.append('personal_references_phone2',		this.removeMask(this.state.personal_references_phone2));
    // files
    const data_files = new FormData();

		if (typeof this.state.dui.name !== 'undefined') {
			data_files.append('dui', this.state.dui);
		}
	  if (typeof this.state.nit.name !== 'undefined') {
	    data_files.append('nit', this.state.nit);
	  }
	  if (typeof this.state.passaport.name !== 'undefined') {
	    data_files.append('passaport', this.state.passaport);
	  }
	  if (typeof this.state.card_fiscal.name !== 'undefined') {
	    data_files.append('card_fiscal', this.state.card_fiscal);
	  }
	  if (typeof this.state.salary.name !== 'undefined') {
	    data_files.append('salary', this.state.salary);
	  }
	  if (typeof this.state.proof_address.name !== 'undefined') {
	    data_files.append('proof_address', this.state.proof_address);
	  }
	  if (typeof this.state.bank_reference.name !== 'undefined') {
	    data_files.append('bank_reference', this.state.bank_reference);
	  }
	  if (typeof this.state.family_reference.name !== 'undefined') {
	    data_files.append('family_reference', this.state.family_reference);
	  }
	  if (typeof this.state.record_of_payments.name !== 'undefined') {
	    data_files.append('record_of_payments', this.state.record_of_payments);
  	}

    const bearer = 'bearer '+ this.props.userToken;
    axios({
    	method: 'put',
    	url: this.props.baseurl + '/v1/users',
    	data: data,
    	headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
    })
    .then(jsonresponse => {
    	if (jsonresponse.status === 204) {
    		this.submitFiles(data_files, bearer);
    	} else {
	    	this.toggleLoading();
    		this.showerror('Files were not saved because request responded with status ' + jsonresponse.status);
    	}
    })
    .catch(error => {
     	 this.showerror(error)
    });
    // 
  }
  submitFiles(data_files, bearer) {
  	axios({
  		method: 'put',
  		url: this.props.baseurl + '/v1/assets/users/upload_assets',
  		data: data_files,
  		headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
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
  	 	 this.showerror(error)
  	});
  }
  updateStep(bearer) {
		const url = this.props.baseurl + '/v1/user_accounts/' + this.props.info_cuenta.uuid;

		const data =  new FormData();
		data.append('step', 3);

		axios({
			method: 'put',
			url: url,
			data: data,
			headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
		})
		.then(jsonresponse => {
			this.toggleLoading();
			if (jsonresponse.status === 204) {
				this.props.history.push('/pnpasocuatro');
			} else {
				this.showerror('Request responded with status ' + jsonresponse.status);
			}
		})  
		.catch(error => {
			this.toggleLoading(); 
		 	 this.showerror(error)
		});
  }
  toggleLoading() {
    this.setState({
      loading: !this.state.loading,
    });
  }
  fillForm(i, d) {
		this.setState({
	    [i]: d
	  });
  }
  removeMask(v) {
  	if (!v || typeof v === "number") {return v;}
  	return v.replace(/[^0-9]/g, '');
  }
  showerror(error){
    let message = '* ' + error.response.data.errors;        
    this.setState({
      error_message:message
    })
    this.toggleLoading();
  }
  onChange(e) {
  	const target = e.target;
  	let value = '';
  	switch(target.type) {
  		case 'file':
  			value = target.files[0];
  		break;
  		default:
  			value = target.value;
  		break;
  	}
  	const name = target.name;

  	this.setState({
  	  [name]: value
  	});
  }
	componentDidMount(){
		const bearer = 'bearer '+ this.props.userToken;
		axios.get(this.props.baseurl + '/v1/me', {
      headers: { 'Authorization': bearer, 'Content-Type': 'application/json' }
		})
		.then(jsonresponse => {
			console.log(jsonresponse)
			Object.entries(jsonresponse.data).map((v) => {
				return this.fillForm(v[0], v[1]);
			});
		})
		.catch(error => {
			this.showerror(error);
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
						<p className="t-center blue">Paso 3: Validación de información</p>
						<ul className="register--steps-number">
							<li className="register-step"><a className="register-step--link" href={null} role="button" to="pnpasouno">1</a></li>
							<li className="register-step"><a className="register-step--link" href={null} role="button" to="pnpasodos">2</a></li>
							<li className="register-step"><a className="register-step--link active" href={null} role="button" to="pnpasotres">3</a></li>
							<li className="register-step"><a className="register-step--link" href={null} role="button" to="pnpasocuatro">4</a></li>
						</ul>
						{
							this.state.error_message !== "" ?
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
						<div className="register--form-d-flex">
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="personal_references">Referencia Personal # 1</label>
								<input className="register--input" type="text" value={
									(this.state.personal_references && this.state.personal_references !== '') ?
									this.state.personal_references :
									''
								} name="personal_references" id="personal_references" required onChange={this.onChange} />
							</div>
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="personal_references_phone">Teléfono de contacto</label>
								<InputMask
									className="register--input"
									mask="+(999) 99 99 99 99"
									maskChar=" "
									type="text"
									required
									value={
										(this.state.personal_references_phone && this.state.personal_references_phone !== '') ?
										this.state.personal_references_phone :
										''
									}
									name="personal_references_phone"
									id="personal_references_phone"
									onChange={this.onChange}
								/>
							</div>
						</div>
						<div className="register--form-d-flex">
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="personal_references2">Referencia Personal # 2</label>
								<input className="register--input" type="text" required value={
									(this.state.personal_references2 && this.state.personal_references2 !== '') ?
									this.state.personal_references2 :
									''
								} name="personal_references2" id="personal_references2" onChange={this.onChange} />
							</div>
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="personal_references_phone2">Teléfono de contacto</label>
								<InputMask
									className="register--input"
									mask="+(999) 99 99 99 99"
									maskChar=" "
									type="text"
									value={
										(this.state.personal_references_phone2 && this.state.personal_references_phone2 !== '') ?
										this.state.personal_references_phone2 :
										''
									}
									required
									name="personal_references_phone2"
									id="personal_references_phone2"
									onChange={this.onChange}
								/>
							</div>
						</div>
						<div>
							<h4 className="m-bottom-0">Documentos de validación</h4>
							<p>Como parte del portal CONSULTOR FOREX, requerimos una imagen escaneada en formato jpg, png o pdf para terminar de validar la autenticación de la cuenta.</p>
						</div>
						<div className="register--form-d-flex">
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="dui">
									Documento de Identidad 
									{
										(this.state.dui_file_name && this.state.dui_file_name !== "") ?
										<FaCheckCircle /> :
										''
									}
								</label>
								<input className="custom-file-input custom-file-input" type="file" name="dui" id="dui" required onChange={this.onChange} />
							</div>
						</div>
						<div className="register--form-d-flex">
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="nit">
									NIT
									{
										(this.state.nit_file_name && this.state.nit_file_name !== "") ?
										<FaCheckCircle /> :
										''
									}
								</label>
								<input className="custom-file-input" type="file" name="nit" id="nit" required onChange={this.onChange} />
							</div>
						</div>
						<div className="register--form-d-flex">
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="passaport">
									Pasaporte o Carnet de residencia (Extranjero)
									{
										(this.state.dui_file_name && this.state.dui_file_name !== "") ?
										<FaCheckCircle /> :
										''
									}
								</label>
								<input className="custom-file-input" type="file" name="passaport" id="passaport" required onChange={this.onChange} />
							</div>
						</div>
						<div className="register--form-d-flex">
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="card_fiscal">
									Tarjeta de Registro Fiscal (Si aplica)
									{
										(this.state.dui_file_name && this.state.dui_file_name !== "") ?
										<FaCheckCircle /> :
										''
									}
								</label>
								<input className="custom-file-input" type="file" name="card_fiscal" id="card_fiscal" required onChange={this.onChange} />
							</div>
						</div>
						<div className="register--form-d-flex">
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="salary">Constancia de Salario</label>
								<input className="custom-file-input" type="file" name="salary" id="salary" required onChange={this.onChange} />
							</div>
						</div>
						<div className="register--form-d-flex">
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="proof_address" data-tip="Este es el comprobante de domicilio y su tooltip">
									Comprobante de domicilio (Factura de servicios básicos) <FaInfoCircle />
									{
										(this.state.dui_file_name && this.state.dui_file_name !== "") ?
										<FaCheckCircle /> :
										''
									}
								</label>
								<input className="custom-file-input" type="file" name="proof_address" id="proof_address" required onChange={this.onChange} />
							</div>
						</div>
						<div className="register--form-d-flex">
							<div className="register--form--wrapper">
								<h5>Para inversiones mayores a $15,000.00</h5>
								<label className="register--label" htmlFor="bank_reference">
									Referencias bancarias y crediticias
									{
										(this.state.dui_file_name && this.state.dui_file_name !== "") ?
										<FaCheckCircle /> :
										''
									}
								</label>
								<input className="custom-file-input" type="file" name="bank_reference" id="bank_reference" onChange={this.onChange} />
							</div>
						</div>
						<br/>
						<br/>
						<br/>
						<div className="register--form-d-flex">
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="family_reference">
									Referencias Familiares y Personales
									{
										(this.state.dui_file_name && this.state.dui_file_name !== "") ?
										<FaCheckCircle /> :
										''
									}
								</label>
								<input className="custom-file-input" type="file" name="family_reference" id="family_reference" onChange={this.onChange} />
							</div>
						</div>
						<div className="register--form-d-flex">
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="record_of_payments" data-tip="Estado de cuenta bancario, declaración de renta reciente, documento compra-venta o préstamo, etc">
									Constancia de la precedencia de sus fondos <FaInfoCircle />
									{
										(this.state.dui_file_name && this.state.dui_file_name !== "") ?
										<FaCheckCircle /> :
										''
									}
								</label>
								<input className="custom-file-input" type="file" name="record_of_payments" id="record_of_payments" onChange={this.onChange} />
							</div>
						</div>
						<div className="register--form-d-flex">
							<div className="register--form--buttons-right">
								<Link to="/pnpasodos" className="btn btn-back">Atrás</Link>
							</div>
							<div className="register--form--as">
								<LaddaButton
								    loading={this.state.loading}
								    data-style={EXPAND_LEFT}
								    type="submit"
								    className="btn btn-save">
								    Guardar
								</LaddaButton>
								<Link to="/pnpasocuatro" className={`btn btn-next ${this.state.step >= this.state.active_step ? "disabled-link" : ""}`}>Siguiente</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
			<ReactTooltip />
		</section>
		)
	}
}

const mapStateToProps = (state, props) => {
  return {  
    authorize:   state.mainReducer.auth.authorize,
    userToken:   state.mainReducer.auth.token,
    scope:       state.mainReducer.auth.scope,
    email:       state.mainReducer.auth.email,
    id:          state.mainReducer.auth.id,
    register:    state.mainReducer.auth.register,
    type:        state.mainReducer.auth.type,
    infouser:    state.mainReducer.auth.infouser,
    info_cuenta: state.mainReducer.auth.info_cuenta,
    baseurl:state.mainReducer.setBaseUrl.baseurl
  }
}

export default withRouter(connect(mapStateToProps)(Pasotres));

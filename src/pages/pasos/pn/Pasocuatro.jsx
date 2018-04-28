import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import FaCheckCircle from 'react-icons/lib/fa/check-circle';
import InputMask from 'react-input-mask';
import LaddaButton, { EXPAND_LEFT } from 'react-ladda';
import * as NumberFormat from 'react-number-format';
import actions from "../../../actions"
import '../../../assets/css/pages/pasos.css'

class Pasocuatro extends Component{
	constructor(props){
		super(props)
		this.state = {
			stado:'',
			loading: false,
			error_message: '',
			step:4,
			active_step:this.props.info_cuenta['step']
		}
		this.onChange      = this.onChange.bind(this)
		this.onSubmit      = this.onSubmit.bind(this)
		this.showerror     = this.showerror.bind(this);
		this.toggleLoading = this.toggleLoading.bind(this);
		this.fillForm      = this.fillForm.bind(this);
		this.removeMask    = this.removeMask.bind(this);
		this.submitFiles   = this.submitFiles.bind(this);
    this.state.initial_amount                = '';
    this.state.origin_of_funds               = '';
    this.state.plans_investments_explication = '';
    this.state.bank_deposit                  = '';
    this.state.transfer_format               = '';
    this.state.voucher                       = '';
	}
	onSubmit(e) {
    e.preventDefault();    

    this.toggleLoading(); 

    const data =  new FormData();
    data.append('initial_amount',                this.removeMask(this.state.initial_amount));
    data.append('origin_of_funds',               this.state.origin_of_funds);
    data.append('plans_investments_explication', this.state.plans_investments_explication);
    data.append('bank_deposit',                  this.state.bank_deposit);
    data.append('transfer_format',               (this.state.transfer_format === "true"));
    data.append('tc',                            this.state.tc);
    data.append('sa',                            this.state.sa);
    data.append('step',                          6);
    // files
    const data_files = new FormData();

    data_files.append('voucher', this.state.voucher);

    const bearer = 'bearer '+ this.props.userToken;
    const url    = 'https://rupert-x.herokuapp.com/dashboard/v1/user_accounts/' + this.props.info_cuenta.uuid;

    axios({
    	method  : 'put',
    	url     : url,
    	data    : data,
    	headers : { 'Authorization': bearer,'Content-Type': 'application/json'}
    })
    .then(jsonresponse => {
    	if (jsonresponse.status === 204) {
    		if (this.state.voucher !== '') {
		    	this.submitFiles(data_files, bearer);
    		} else {
	  			this.props.history.push('/validating-account');
    		}
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
  		url: 'https://rupert-x.herokuapp.com/dashboard/v1/assets/users/upload_voucher',
  		data: data_files,
  		headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
  	})
  	.then(jsonresponse => {
  		this.toggleLoading();
  		if (jsonresponse.status === 204) {
  			this.props.history.push('/validating-account');
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
  		case 'checkbox':
  			value = target.checked;
  		break;
  		case 'radio':
  			value = (target.value === "true" || target.value === "false") ? target.value === "true" : target.value;
  		break;
  		case 'file':
  			value = target.files[0];
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
		axios.get('https://rupert-x.herokuapp.com/dashboard/v1/user_accounts', {
      headers: { 'Authorization': bearer, 'Content-Type': 'application/json' }
		})
		.then(jsonresponse => {
			Object.entries(jsonresponse.data[0]).map((v) => {
				this.fillForm(v[0], v[1]);
			});
		})
		.catch(error => {
			this.showerror(error);
		});
		axios.get(this.props.baseurl + '/v1/users', {
      headers: { 'Authorization': bearer, 'Content-Type': 'application/json' }
		})
		.then(jsonresponse => {
			Object.entries(jsonresponse.data[0]).map((v) => {
				this.fillForm(v[0], v[1]);
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
							<p className="t-center blue">Paso 3: Validación de Información</p>
							<ul className="register--steps-number">
								<li className="register-step"><a className="register-step--link" href="#" role="button" to="pnpasouno">1</a></li>
								<li className="register-step"><a className="register-step--link" href="#" role="button" to="pnpasodos">2</a></li>
								<li className="register-step"><a className="register-step--link" href="#" role="button" to="pnpasotres">3</a></li>
								<li className="register-step"><a className="register-step--link active" href="#" role="button" to="pnpasocuatro">4</a></li>
							</ul>
						</div>
					</div>
					<div className="col-7 register-form--step-1">
						<form className="register--form" onSubmit={this.onSubmit}>
							<h2>Declaración Jurada</h2>
							<p>Yo <strong>{this.props.infouser.firstname} {this.props.infouser.lastname}</strong>, en mi calidad de <strong>Representante legal, apoderado o delegado </strong>de <strong>{this.props.infouser.enterprise_name}</strong>, declaro bajo juramento que los fondos o valores que entrego y las transacciones. Bacon ipsum dolor amet salami alcatra chuck buffalo cow ham hock bresaola pork belly burgdoggen sirloin. Pork meatball frankfurter ball tip. Ground round short loin fatback strip steak, cow sausage biltong kevin turkey. Sirloin ribeye landjaeger hamburger, tail pig swine</p>
							<div className="register--form-wrapper">
								<div className="register--form--wrapper">
									<textarea
										className="register--input"
										name="origin_of_funds"
										id="origin_of_funds"
										rows="5"
										required
										placeholder="Explique la proveniencia"
										onChange={this.onChange}
										value={
											(this.state.origin_of_funds && this.state.origin_of_funds !== "") ?
											this.state.origin_of_funds :
											''
										}
									>
									</textarea>
								</div>
							</div>
							<div className="register--form-d-flex">
								<div className="register--form--wrapper">
									<label className="register--label" htmlFor="initial_amount">Monto inicial</label>
									{/*<InputMask
										className="register--input"
										mask="$ 9999999999999999"
										maskChar=" "
										type="text"
										name="initial_amount"
										id="initial_amount"
										placeholder="Digite la cantidad"
										required
										value={
											(this.state.initial_amount && this.state.initial_amount !== '') ?
											this.state.initial_amount :
											''
										}
										onChange={this.onChange}
									/>*/}
									<NumberFormat placeholder="Digite la cantidad" className="register--input" value={
											(this.state.initial_amount && this.state.initial_amount !== '') ?
											this.state.initial_amount :
											''
										} thousandSeparator={true} prefix={'$'} decimalSeparator={'.'} decimalScale={2} onValueChange={(values) => {
                                        const { formattedValue} = values;
                                        // formattedValue = $2,223
                                        // value ie, 2223
                                        this.setState({initial_amount: formattedValue})
                                    }}/>
								</div>
							</div>
							<div className="register--form-d-flex">
								<div className="register--form--wrapper">
									<label className="register--label" htmlFor="bank_deposit">Nombre del Banco</label>
									<select
										name="bank_deposit"
										id="bank_deposit"
										required
										value={
											(this.state.bank_deposit && this.state.bank_deposit !== '') ?
											this.state.bank_deposit :
											''
										}
										onChange={this.onChange}>
										<option value="">Seleccione</option>
										<option value="banco_agricola">Banco Agricola</option>
										<option value="banco_cuscatlan">Banco Cuscatlán</option>
										<option value="banco_wells_fargo">Wells Fargo</option>
										<option value="capital_one">CapitalOne</option>
									</select>
								</div>
							</div>
							<div className="register--form-d-flex">
								<div className="register--form--wrapper">
									<label className="register--label" htmlFor="transfer_format">Forma de transacción</label>
									<select
										name="transfer_format"
										id="transfer_format"
										required
										value={
											(this.state.transfer_format && this.state.transfer_format !== '') ?
											this.state.transfer_format :
											''
										}
										onChange={this.onChange}
										>
										<option value="">Seleccione</option>
										<option value={"true"}>Cheque</option>
										<option value={"false"}>Wire Transfer</option>
									</select>
								</div>
							</div>
							<div className="register--form-d-flex">
	              <div className="register--form--wrapper">
	                <label className="register--label" htmlFor="voucher">
	                	Voucher
										{
											(this.state.voucher_file_name && this.state.voucher_file_name !== "") ?
											<FaCheckCircle /> :
											''
										}
	              	</label>
	                <input className="custom-file-input" required type="file" name="voucher" id="voucher" />
	              </div>
	            </div>
							<div className="register--form-wrapper">
								<div className="register--form--wrapper">
									<p>¿Se proyecta realizar inversiones a corto plazo?</p>
									<div className="pretty p-default p-round">
								        <input type="radio" 
										required
										id="plans_investments_yes"
										required
										name="plans_investments"
										value={true}
										checked={this.state.plans_investments}
										onChange={this.onChange}
										/>
								        <div className="state">
								            <label>SI</label>
								        </div>
								    </div>
									{/*<input
										type="radio"
										id="plans_investments_yes"
										required
										name="plans_investments"
										value={true}
										checked={this.state.plans_investments}
										onChange={this.onChange}
									/>
									<label className="register--label d-inline-block" htmlFor="plans_investments_yes">Sí</label>*/}

									<div className="pretty p-default p-round">
								        <input type="radio" 
										required
										id="plans_investments_no"
										required
										name="plans_investments"
										value={false}
										checked={!this.state.plans_investments}
										onChange={this.onChange}
										/>
								        <div className="state">
								            <label>NO</label>
								        </div>
								    </div>
									{/*<input
										type="radio"
										id="plans_investments_no"
										required
										name="plans_investments"
										value={false}
										checked={!this.state.plans_investments}
										onChange={this.onChange}
									/>
									<label className="register--label d-inline-block" htmlFor="plans_investments_no">No</label>*/}
									<br/>
									<br/>
									<textarea
										className="register--input"
										name="plans_investments_explication"
										id="plans_investments_explication"
										rows="5"
										placeholder="Explique"
										required={this.state.plans_investments}
										value={
											(this.state.plans_investments_explication && this.state.plans_investments_explication !== '') ?
											this.state.plans_investments_explication :
											''
										}
										onChange={this.onChange}
									></textarea>
								</div>
							</div>
							<br/>
							<br/>
							<br/>
							<div className="register--form-d-flex">
								<div className="register--form--wrapper">
									{/*<input
										type="checkbox"
										name="tc"
										id="tc"
										required
										checked={
											(this.state.tc && this.state.tc !== "") ?
											this.state.tc :
											false
										}
										onChange={this.onChange}
									/>*/}

									<div className="pretty p-default p-curve">
								        <input type="checkbox"
								        name="tc"
										id="tc"
										required
										checked={
											(this.state.tc && this.state.tc !== "") ?
											this.state.tc :
											false
										}
										onChange={this.onChange}
										/>
								        <div className="state">
								            <label></label>
								        </div>
								    </div>
									<label className="register--label" htmlFor="tc">He leído, la <a href="#">solicitud de admisión</a> y estoy de acuerdo en todo lo que en ella se presenta.</label>
								</div>
							</div>
							<div className="register--form-d-flex">
								<div className="register--form--wrapper">
									{/*<input
										type="checkbox"
										name="sa"
										id="sa"
										required
										checked={
											(this.state.sa && this.state.sa !== "") ?
											this.state.sa :
											false
										}
										onChange={this.onChange}
									/>*/}
									<div className="pretty p-default p-curve">
								        <input type="checkbox"
								        name="sa"
										id="sa"
										required
										checked={
											(this.state.sa && this.state.sa !== "") ?
											this.state.sa :
											false
										}
										onChange={this.onChange}
										/>
								        <div className="state">
								            <label></label>
								        </div>
								    </div>
									<label className="register--label" htmlFor="sa">He leído, los <a href="#">términos y condiciones</a> que conlleva la obtención y manipulación del Dashboard.</label>
								</div>
							</div>
							<div className="register--form-d-flex">
								<div className="register--form--buttons-right">
									<Link to="/pnpasotres" className="btn btn-back">Atrás</Link>
								</div>
								<div className="register--form--buttons">
									<LaddaButton
									    loading={this.state.loading}
									    data-style={EXPAND_LEFT}
									    type="submit"
									    className={`btn btn-next ${this.state.step >= this.state.active_step ? "disabled-link" : ""}`}>
									    Finalizar
									</LaddaButton>
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

export default withRouter(connect(mapStateToProps)(Pasocuatro));

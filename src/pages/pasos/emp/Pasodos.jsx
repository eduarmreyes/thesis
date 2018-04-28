import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import InputMask from 'react-input-mask';
import LaddaButton, { EXPAND_LEFT } from 'react-ladda';
import DatePicker from 'react-datepicker';
import moment from 'moment';
// imported css
import 'react-datepicker/dist/react-datepicker.css';
import '../../../assets/css/pages/pasos.css'
import {DatetimePickerTrigger} from 'rc-datetime-picker';
class Pasodos extends Component{
	constructor(props){
		super(props);

		this.state = {
			countries     : [],
			stado         : '',
			loading       : false,
			error_message : '',
			birthdaydate: moment(),
			datedocument:moment(),
			step:2,
			active_step:this.props.info_cuenta['step']
		}
		this.onChange             = this.onChange.bind(this);
		this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
		this.handleDocDateChange = this.handleDocDateChange.bind(this);
		this.onSubmit             = this.onSubmit.bind(this);
		this.removeMask           = this.removeMask.bind(this);
		this.showerror            = this.showerror.bind(this);
		this.toggleLoading        = this.toggleLoading.bind(this);
		this.fillForm             = this.fillForm.bind(this);
		this.updateStep             = this.updateStep.bind(this);
		this.selectbirthdaydate = this.selectbirthdaydate.bind(this)
		this.selectdate_document = this.selectdate_document.bind(this)

		// Create state for all form inputs
    this.state.gender                         = '';
    this.state.firstname                      = '';
    this.state.lastname                       = '';
    this.state.place_of_birth                 = '';
    this.state.birthday                       = '';
    this.state.civil_status                   = 'Soltero/a';
    this.state.occupation                     = '';
    this.state.country                        = '';
    this.state.deparment                      = '';
    this.state.resident_us                    = false;
    this.state.address                        = '';
    this.state.enterprise_telefone                      = '';
    this.state.mobilephone                    = '';
    this.state.doc1                           = '';
    this.state.place_document                 = '';
    this.state.date_document                  = '';
    this.state.doc2                           = '';
    this.state.referred_by                    = '';
    this.state.ppe                            = false;
    this.state.ppe_description                = '';
    this.state.ppe_current                    = '';
    this.state.type_document_indentification  = '';
    this.state.number_document_identification = '';
    this.state.number_document_identification = '';
    this.state.resident_us_description = '';
	}
	onSubmit(e) {
		e.preventDefault();

		this.toggleLoading();

		const data =  new FormData();  
		data.append('gender',                         this.state.gender);
		data.append('firstname',                      this.state.firstname);
		data.append('lastname',                       this.state.lastname);
		data.append('place_of_birth',                 this.state.place_of_birth);

		var birthdaydate = this.state.birthdaydate;
     	var birthday = birthdaydate.format('YYYY-MM-DD');

		data.append('birthday',                       birthday);
		data.append('civil_status',                   this.state.civil_status);
		data.append('occupation',                     this.state.occupation);
		data.append('country',                        this.state.country);
		data.append('deparment',                      this.state.deparment);
		data.append('resident_us',                    this.state.resident_us);
		data.append('address',                        this.state.address);
		data.append('enterprise_telefone',                      this.removeMask(this.state.enterprise_telefone));
		data.append('mobilephone',                    this.removeMask(this.state.mobilephone));
		data.append('doc1',                           this.state.doc1);
		data.append('place_document',                 this.state.place_document);

		var selected_date_document = this.state.datedocument;
     	var date_document = selected_date_document.format('YYYY-MM-DD');

		data.append('date_document',                  date_document);
		data.append('doc2',                           this.state.doc2);
		data.append('referred_by',                    this.state.referred_by);
		data.append('ppe',                            this.state.ppe);
		data.append('ppe_description',                this.state.ppe_description);
		if (this.state.ppe_current !== '') {
			data.append('ppe_current', this.state.ppe_current);
		}
		data.append('type_document_indentification',  this.state.type_document_indentification);
		data.append('number_document_identification', this.removeMask(this.state.number_document_identification));
		if (this.state.resident_us_description !== '') {
			data.append('resident_us_description', this.state.resident_us_description);
		}
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
			this.showerror(error);
    });
  }
  updateStep(bearer) {
		const url = this.props.baseurl + '/v1/user_accounts/' + this.props.info_cuenta.uuid;

		const data =  new FormData();
		data.append('step', 2);

		axios({
			method: 'put',
			url: url,
			data: data,
			headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
		})
		.then(jsonresponse => {
			this.toggleLoading();
			if (jsonresponse.status === 204) {
				this.props.history.push('/empasotres');
			} else {
				this.showerror('Request responded with status ' + jsonresponse.status);
			}
		})  
		.catch(error => {
			this.toggleLoading(); 
		 	 this.showerror(error)
		});
  }
  selectbirthdaydate(birthdaydate){
    this.setState({
      birthdaydate
    });
  }
  selectdate_document(datedocument){
    this.setState({
      datedocument
    });
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
    });
    this.toggleLoading();
  }
  fillForm(i, d) {
		this.setState({
	    [i]: d
	  });
  }
	removeMask(v) {
		if (typeof v === "number") {return v;}
		return v.replace(/[^0-9]/g, '');
	}
	handleBirthdayChange (date) {
	  this.setState({birthday: date})
	}
	handleDocDateChange (date) {
	  this.setState({date_document: date})
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
  		default:
  			value = target.value;
  		break;
  	}
  	const name = target.name;

  	this.setState({
  	  [name]: value
  	});
  }
	componentDidMount() {
		const bearer = 'bearer '+ this.props.userToken;
		axios.get(this.props.baseurl + '/v1/contries?per_page=250', {
      headers: { 'Authorization': bearer, 'Content-Type': 'application/json' }
		})
		.then(jsonresponse => {
			this.setState({
				countries: jsonresponse.data
			});
		})
		.catch(error => {
			this.showerror(error);
		});
		axios({
			method: 'get',
			url: this.props.baseurl + '/v1/me',
			headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
		})
		.then(jsonresponse => {
			Object.entries(jsonresponse.data).map((v) => {
				return this.fillForm(v[0], v[1]);
			});
		})
		.catch(error => {
			this.showerror(error);
		});

		/*const datePicker=document.getElementsByClassName("react-datepicker__input-container")[0];
   		datePicker.childNodes[0].setAttribute("readOnly",true);*/

	}
	render(){
		const the_countries = this.state.countries.map((c) => {
			return <option key={c.id} value={c.code}>{ c.name }</option>
		});

		const shortcuts = {
	      'Today': moment(),
	      'Yesterday': moment().subtract(1, 'days')
	    };
		return(
		<section id="register" className="register">
			<div className="flex-container">
				<div className="col-5">
					<div className="register--information">
						<h1 className="t-center">REGISTRO</h1>
						<p className="t-center register--indications">Pork filet mignon andouille picanha fatback. Ball tip pastrami turducken prosciutto</p>
						<p className="t-center blue">Paso 2: Datos del representante legal</p>
						<ul className="register--steps-number">
							<li className="register-step"><a className="register-step--link" to="empasouno">1</a></li>
							<li className="register-step"><a className="register-step--link active" to="empasodos">2</a></li>
							<li className="register-step"><a className="register-step--link" to="empasotres">3</a></li>
							<li className="register-step"><a className="register-step--link" to="empasocuatro">4</a></li>
							<li className="register-step"><a className="register-step--link" to="empasocinco">5</a></li>
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
								<p>* Género</p>
								<div className="pretty p-default p-round">
							        <input type="radio" 
									required
									id="gender_male"
									name="gender"
									checked={
										(typeof this.state.gender !== "undefined") ?
										this.state.gender === "male" :
										false
									}
									value="male"
									onChange={this.onChange}
									/>
							        <div className="state">
							            <label>Másculino</label>
							        </div>

							    </div>
								{/*<input type="radio"
									required
									id="gender_male"
									name="gender"
									checked={
										(typeof this.state.gender !== "undefined") ?
										this.state.gender === "male" :
										false
									}
									value="male"
									onChange={this.onChange}
							 	/>
								<label className="register--label d-inline-block" htmlFor="gender_male">Másculino</label>*/}
								{/*<input
									type="radio"
									required
									id="gender_female"
									name="gender"
									checked={
										(typeof this.state.gender !== "undefined") ?
										this.state.gender === "female" :
										false
									}
									value="female"
									onChange={this.onChange}
								/>
								<label className="register--label d-inline-block" htmlFor="gender_female">Femenino</label>*/}
								<div className="pretty p-default p-round">
							        <input type="radio" 
									required
									id="gender_female"
									name="gender"
									checked={
										(typeof this.state.gender !== "undefined") ?
										this.state.gender === "female" :
										false
									}
									value="female"
									onChange={this.onChange}
									/>
							        <div className="state">
							            <label>Másculino</label>
							        </div>

							    </div>
							</div>
						</div>
						<div className="">
							<div className="register--form-d-flex">
								<div className="register--form--wrapper">
									<label className="register--label" htmlFor="firstname">* Nombre</label>
									<input className="register--input" required type="text" value={
										(this.state.firstname && this.state.firstname !== 'null') ?
										this.state.firstname :
										''
									} name="firstname" id="firstname" onChange={this.onChange} />
								</div>
								<div className="register--form--wrapper">
									<label className="register--label" htmlFor="lastname">* Apellidos</label>
									<input className="register--input" required type="text" value={
										(this.state.lastname && this.state.lastname !== 'null') ?
										this.state.lastname :
										''
									} name="lastname" id="lastname" onChange={this.onChange} />
								</div>
							</div>
						</div>
						<div className="">
							<div className="register--form-d-flex">
								<div className="register--form--wrapper">
									<label className="register--label" htmlFor="place">* Lugar de nacimiento</label>
									<input className="register--input" required type="text" value={
										(this.state.place_of_birth && this.state.place_of_birth !== 'null') ?
										this.state.place_of_birth :
										''
									} name="place_of_birth" id="place" onChange={this.onChange} />
								</div>
								<div className="register--form--wrapper register--form-date">
									<label className="register--label" htmlFor="birthday">* Fecha de nacimiento</label>
									<DatetimePickerTrigger
				                          shortcuts={shortcuts} 
				                          closeOnSelectDay ={true}
				                          moment={this.state.birthdaydate}
				                          onChange={this.selectbirthdaydate}>
				                          <input type="text" value={this.state.birthdaydate.format('YYYY-MM-DD')} readOnly />
				                        </DatetimePickerTrigger>
									{/*<DatePicker
										dateFormat="DD-MM-YYYY"
										className="register--input"
										required
						        onChange={this.handleBirthdayChange}
						        name="birthday"
						        id="birthday"
						        openToDate={moment("1990-09-28")}
						        showYearDropdown
										placeholderText="Select your birthday"
										selected= {
											(this.state.birthday && this.state.birthday !== 'null') ?
											moment(this.state.birthday) :
											moment()
										}
					        />*/}
								</div>
							</div>
						</div>
						<div className="">
							<div className="register--form-d-flex">
								<div className="register--form--wrapper">
									<label className="register--label" htmlFor="civil_status">* Estado civil</label>
									{/*<input className="register--input" required type="text" value={
										(this.state.civil_status && this.state.civil_status !== 'null') ?
										this.state.civil_status :
										''
									} name="civil_status" id="civil_status" onChange={this.onChange} />*/}
									<select className="register--input" required name="civil_status" id="civil_status" onChange={this.onChange} >
										<option value="Soltero/a">Soltero/a</option>
										<option value="Comprometido/a">Comprometido/a</option>
										<option value="Casado/a">Casado/a</option>
										<option value="Divorciado/a">Divorciado/a</option>										
									</select>
								</div>
								<div className="register--form--wrapper register--form-date">
									<label className="register--label" htmlFor="occupation">* Profesión</label>
									<input className="register--input" required type="text" value={
										(this.state.occupation && this.state.occupation !== 'null') ?
										this.state.occupation :
										''
									} name="occupation" id="occupation" onChange={this.onChange} />
								</div>
							</div>
						</div>
						<div className="">
							<div className="register--form-d-flex">
								<div className="register--form--wrapper">
									<label className="register--label" htmlFor="country">* País</label>
									<select required name="country" id="country" value={
										(this.state.country && this.state.country !== 'null') ?
										this.state.country :
										''
									} onChange={this.onChange}>
										<option value="">Seleccione un país</option>
										{ the_countries }
									</select>
								</div>
								<div className="register--form--wrapper register--form-date">
									<label className="register--label" htmlFor="deparment">Departamento, Ciudad</label>
									<input className="register--input" required type="text" value={
										(this.state.deparment && this.state.deparment !== 'null') ?
										this.state.deparment :
										''
									} name="deparment" id="deparment" onChange={this.onChange}/>
								</div>
							</div>
						</div>
						<div className="">
							<div className="register--form--wrapper">
								<p>¿Eres ciudadano de los Estados Unidos de América?</p>
								{/*<input
									type="radio"
									required
									id="us_citizen_yes"
									name="resident_us"
									checked={
										(typeof this.state.resident_us !== 'undefined') ?
										this.state.resident_us :
										false
									}
									value={true}
									onChange={this.onChange}
									/>
								<label className="register--label d-inline-block" htmlFor="us_citizen_yes">Sí</label>*/}
								<div className="pretty p-default p-round">
							        <input type="radio" 
									required
									id="us_citizen_yes"
									name="resident_us"
									checked={
										(typeof this.state.resident_us !== 'undefined') ?
										this.state.resident_us :
										false
									}
									value={true}
									onChange={this.onChange}
									/>
							        <div className="state">
							            <label>SI</label>
							        </div>

							    </div>
								{/*<input
									type="radio"
									required
									id="us_citizen_no"
									name="resident_us"
									checked={
										(typeof this.state.resident_us !== 'undefined') ?
										!this.state.resident_us :
										false
									}
									value={false}
									onChange={this.onChange}
								/>
								<label className="register--label d-inline-block" htmlFor="us_citizen_no">No</label>*/}
								<div className="pretty p-default p-round">
							        <input type="radio" 
									required
									id="us_citizen_no"
									name="resident_us"
									checked={
										(typeof this.state.resident_us !== 'undefined') ?
										!this.state.resident_us :
										false
									}
									value={false}
									onChange={this.onChange}
									/>
							        <div className="state">
							            <label>NO</label>
							        </div>

							    </div>
							    <br/>
							    <br/>
								<textarea
									required={this.state.resident_us}
									className="register--input"
									value={
										(this.state.resident_us_description && this.state.resident_us_description !== '' ) ? this.state.resident_us_description : ''
									}
									disabled={this.state.resident_us === false ? true : ""}
									name="resident_us_description"
									id="resident_us_description"
									rows="5"
									placeholder="Explique"
									onChange={this.onChange}
								></textarea>
							</div>
						</div>
						<br/>
						<br/>
						<br/>
						<div className="register--form-d-flex">
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="address">* Dirección de residencia</label>
								<input className="register--input" required type="text" value={
									(this.state.address && this.state.address !== 'null') ?
									this.state.address :
									''
								} name="address" id="address" onChange={this.onChange} />
							</div>
						</div>
						<div className="register--form-d-flex">
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="enterprise_telefone">* Teléfono</label>
								<InputMask className="register--input" required type="text"
								mask="+(999) 99 99 99 99" maskChar=" "
								value={
									(this.state.enterprise_telefone && this.state.enterprise_telefone !== 'null') ?
									this.state.enterprise_telefone :
									''
								} name="enterprise_telefone" id="enterprise_telefone" onChange={this.onChange} />
							</div>
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="mobilephone">* Móvil</label>
								<InputMask className="register--input" required type="text"
								mask="+(999) 99 99 99 99" maskChar=" "
								value={
									(this.state.mobilephone && this.state.mobilephone !== 'null') ?
									this.state.mobilephone :
									''
								} name="mobilephone" id="mobilephone" onChange={this.onChange} />
							</div>
						</div>
						<div className="register--form-d-flex">
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="citizenship_identity_document">* Número de Identidad ciudadana</label>
								<InputMask className="register--input" required={this.state.resident_us} type="text"
								mask="99999999-9" maskChar=" "
								value={
									(this.state.doc1 && this.state.doc1 !== 'null') ?
									this.state.doc1 :
									''
								} name="doc1" id="citizenship_identity_document" onChange={this.onChange} />
							</div>
						</div>
						<div className="register--form-d-flex">
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="place_document">* Lugar de expedición del documento</label>
								<input className="register--input" required type="text" value={
									(this.state.place_document && this.state.place_document !== 'null') ?
									this.state.place_document :
									''
								} name="place_document" id="place_document" onChange={this.onChange} />
							</div>
							<div className="register--form--wrapper register--form-date">
								<label className="register--label" htmlFor="date_document">* Fecha de expedición del documento</label>
								<DatetimePickerTrigger
				                          shortcuts={shortcuts} 
				                          closeOnSelectDay ={true}
				                          moment={this.state.datedocument}
				                          onChange={this.selectdate_document}>
				                          <input type="text" value={this.state.datedocument.format('YYYY-MM-DD')} readOnly />
			                        </DatetimePickerTrigger>
								{/*<DatePicker
									dateFormat="DD-MM-YYYY"
									className="register--input"
									required
					        onChange={this.handleDocDateChange}
					        name="date_document"
					        id="date_document"
					        showYearDropdown
									placeholderText="Select the date"
									selected={
										(this.state.date_document && this.state.date_document !== 'null') ?
										moment(this.state.date_document) :
										moment()
									}
							
				        />*/}
							</div>
						</div>
						<div className="register--form-d-flex">
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="type_document_indentification">* Documento de Identificación</label>
								<select required={this.state.resident_us}   id="type_document_indentification"	name="type_document_indentification" value={
									(this.state.type_document_indentification && this.state.type_document_indentification !== 'null') ?
									this.state.type_document_indentification :
									''
								} onChange={this.onChange}>
									<option value="">Seleccione opción</option>
									<option value="passport">Pasaporte</option>
									<option value="resident_id">Carnet de Residencia</option>
								</select>
							</div>							
							<div className="register--form--wrapper">
							<br/>
								<input className="register--input" required type="text" value={
									(this.state.number_document_identification && this.state.number_document_identification !== 'null') ?
									this.state.number_document_identification :
									''
								} name="number_document_identification" id="number_document_identification" placeholder="Ingresar el número" onChange={this.onChange} />
							</div>
						</div>
					
						<div className="register--form-d-flex">
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="referred_by">Correo de referido (Opcional)</label>
								<input className="register--input" type="email" value={
									(this.state.referred_by && this.state.referred_by !== 'null') ?
									this.state.referred_by :
									''
								} name="referred_by" id="referred_by" onChange={this.onChange}/>
							</div>
						</div>
						<div className="register--form-d-flex">
							<div className="register--form--wrapper">
								<p>¿Es persona políticamente expuesta?</p>
								{/*<input
									type="radio"
									required
									id="politic_yes"
									name="ppe"
									checked={
										(typeof this.state.ppe !== 'undefined') ?
										(this.state.ppe) :
										false
									}
									value={true}
									onChange={this.onChange}
								/>
								<label className="register--label d-inline-block" htmlFor="politic_yes">Sí</label>*/}
								<div className="pretty p-default p-round">
							        <input type="radio" 
									required
									id="politic_yes"
									name="ppe"
									checked={
										(typeof this.state.ppe !== 'undefined') ?
										(this.state.ppe) :
										false
									}
									value={true}
									onChange={this.onChange}
									/>
							        <div className="state">
							            <label>SI</label>
							        </div>

							    </div>
								{/*<input
									type="radio"
									required
									id="politic_no"
									name="ppe"
									checked={
										(typeof this.state.ppe !== 'undefined') ?
										!(this.state.ppe) :
										false
									}
									value={false}
									onChange={this.onChange}
								/>
								<label className="register--label d-inline-block" htmlFor="politic_no">No</label>*/}

								<div className="pretty p-default p-round">
							        <input type="radio" 
									required
									id="politic_no"
									name="ppe"
									checked={
										(typeof this.state.ppe !== 'undefined') ?
										!(this.state.ppe) :
										false
									}
									value={false}
									onChange={this.onChange}
									/>
							        <div className="state">
							            <label>NO</label>
							        </div>
							    </div>
							    <br/>
							    <br/>
								<textarea
									required={this.state.ppe}
									className="register--input"
									name="ppe_current"
									id="ppe_current"
									rows="5"
									placeholder="Explique"
									onChange={this.onChange}
									value={
										(this.state.ppe_current && this.state.ppe_current !== '') ?
										this.state.ppe_current :
										''
									}
								></textarea>
							</div>
						</div>
						<br/>
						<br/>
						<br/>
						<div className="register--form-d-flex">
							<div className="register--form--wrapper">
								<label className="register--label" htmlFor="ppe_description">Cargo que desempeña</label>
								<input className="register--input" required type="text" value={
									(this.state.ppe_description && this.state.ppe_description !== 'null') ?
									this.state.ppe_description :
									''
								} name="ppe_description" id="ppe_description" onChange={this.onChange}/>
							</div>
						</div>
						<div className="register--form-d-flex">
							{this.state.msj}
						</div>
						<div className="register--form-d-flex">
							<div className="register--form--buttons-right">
								<Link to="/empasouno" className="btn btn-back">Atrás</Link>
							</div>
							<div className="register--form--buttons">
								<LaddaButton
								    loading={this.state.loading}
								    data-style={EXPAND_LEFT}
								    type="submit"
								    className="btn btn-save">
								    Guardar
								</LaddaButton>
								<Link to="/empasotres" className={`btn btn-next ${this.state.step >= this.state.active_step ? "disabled-link" : ""}`}>Siguiente</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
		</section>
		);
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

export default withRouter(connect(mapStateToProps)(Pasodos));

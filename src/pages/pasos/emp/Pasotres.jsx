import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux"
import axios from 'axios';
import InputMask from 'react-input-mask';
import LaddaButton, { EXPAND_LEFT } from 'react-ladda';

import actions from "../../../actions"
import '../../../assets/css/pages/pasos.css'

class Pasotres extends Component{
	constructor(props){
		super(props);

		this.state = {
			stado         : '',
			loading       : false,
			error_message : '',
			step:3,
			active_step:this.props.info_cuenta['step']
		}
		this.onChange      = this.onChange.bind(this);
		this.onSubmit      = this.onSubmit.bind(this);
		this.showerror     = this.showerror.bind(this);
		this.toggleLoading = this.toggleLoading.bind(this);
		this.fillForm      = this.fillForm.bind(this);
		this.updateStep      = this.updateStep.bind(this);

		// Create state for all form inputs
    this.state.economic_activity             = '';
    this.state.firstname                     = '';
    this.state.activity_economic_description = '';
    this.state.position_held                 = '';
    this.state.salaried_estimated            = '';
    this.state.place_of_work                 = '';
    this.state.telephone                     = '';
    this.state.work_address                  = '';
	}

	onSubmit(e) {
    e.preventDefault();

    this.toggleLoading();

    const data =  new FormData();  
    data.append('economic_activity',							this.state.economic_activity);    
    data.append('firstname',											this.state.firstname);
    data.append('activity_economic_description',	this.state.activity_economic_description);
    data.append('position_held',									this.state.position_held);
    data.append('salaried_estimated',							this.state.salaried_estimated);
    data.append('place_of_work',									this.state.place_of_work);
    data.append('telephone',											this.removeMask(this.state.telephone));
    data.append('work_address',										this.state.work_address);
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
     	 this.showerror(error);
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
				this.props.history.push('/empasocuatro');
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
		if (typeof v === "number") {return v;}
		return v.replace(/[^0-9]/g, '');
	}
  showerror(error){
    let message = '* ' + error.response.data.errors;        
    this.setState({
      error_message:message
    });
    this.toggleLoading();
  }
  onChange(e) {
  	this.setState({
			[e.target.name]: e.target.value
    });
  }
	componentDidMount() {
		const bearer = 'bearer '+ this.props.userToken;
		axios.get(this.props.baseurl + '/v1/me', {
      headers: { 'Authorization': bearer, 'Content-Type': 'application/json' }
		})
		.then(jsonresponse => {
			Object.entries(jsonresponse.data).map((v) => {
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
						<p className="t-center blue">Paso 2: Datos del representante legal</p>
						<ul className="register--steps-number">
							<li className="register-step"><a className="register-step--link" to="empasouno">1</a></li>
							<li className="register-step"><a className="register-step--link" to="empasodos">2</a></li>
							<li className="register-step"><a className="register-step--link active" to="empasotres">3</a></li>
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
							<div className="register--form-d-flex">
								<div className="register--form--wrapper w-100">
									<p>¿Actividad económica que desarrolla?</p>
									<div className="register--economic-activities d-flex">
										<div className="pretty p-default p-round">
									        <input type="radio" id="economic_activity_employee" name="economic_activity" required value="empleado" checked={this.state.economic_activity === "empleado"} onChange={this.onChange} 		/>
									        <div className="state">
									            <label>Empleado</label>
									        </div>
									    </div>
									    <div className="pretty p-default p-round">
									        <input type="radio" id="economic_activity_merchant" name="economic_activity" required value="comerciante" checked={this.state.economic_activity === "comerciante"} onChange={this.onChange}	/>
									        <div className="state">
									            <label>Comerciante</label>
									        </div>
									    </div>
									    <div className="pretty p-default p-round">
									        <input type="radio" id="economic_activity_professional" name="economic_activity" required value="Profesional" checked={this.state.economic_activity === "Profesional"} onChange={this.onChange} 		/>
									        <div className="state">
									            <label>Profesional</label>
									        </div>
									    </div>
									    <div className="pretty p-default p-round">
									        <input type="radio" id="economic_activity_other" name="economic_activity" required value="otro" checked={this.state.economic_activity === "otro"} onChange={this.onChange} 		/>
									        <div className="state">
									            <label>Otro</label>
									        </div>
									    </div>
									</div>
									<br/>
									<input className="register--input" type="text"
										value={
											(this.state.activity_economic_description && this.state.activity_economic_description !== 'null') ?
											this.state.activity_economic_description :
											''
										} name="activity_economic_description" id="activity_economic_description" required placeholder="Detalle de actividad económica" onChange={this.onChange} />
								</div>
							</div>
							<br/>
							<br/>
							<br/>
							<div className="register--form-wrapper">
								<div className="register--form-d-flex">
									<div className="register--form--wrapper">
										<label className="register--label" htmlFor="position_held">Cargo que desempeña</label>
										<input className="register--input" type="text"
											value={
												(this.state.position_held && this.state.position_held !== 'null') ?
												this.state.position_held :
												''
											} name="position_held" id="position_held" onChange={this.onChange} />
									</div>
									<div className="register--form--wrapper register--form-date">
									</div>
								</div>
							</div>
							<div className="register--form-wrapper">
								<div className="register--form-d-flex">
									<div className="register--form--wrapper">
										<label className="register--label" htmlFor="salaried_estimated">¿Estimado de ingresos anuales?</label>
										<select name="salaried_estimated" value={
											(this.state.salaried_estimated && this.state.salaried_estimated !== 'null') ?
											this.state.salaried_estimated :
											''
										} id="salaried_estimated" onChange={this.onChange}>
											<option value="">Seleccione</option>
											<option value="1">$1.00 a $9,6000.00</option>
											<option value="2">$9,6001.00 a $24,000.00</option>
											<option value="3">$24,001.00 a $54,000.00</option>
											<option value="4">$54,001.00 a $78,000.00</option>
											<option value="5">$78,001.00 a $120,000.00</option>
											<option value="6">$120,000.00 a Más</option>
										</select>
									</div>
									<div className="register--form--wrapper register--form-date"></div>
								</div>
							</div>
							<div className="register--form-d-flex">
								<div className="register--form--wrapper">
									<label className="register--label" htmlFor="place_of_work">Nombre del lugar de trabajo</label>
									<input className="register--input" type="text"
										value={
											(this.state.place_of_work && this.state.place_of_work !== 'null') ?
											this.state.place_of_work :
											''
										} name="place_of_work" id="place_of_work" onChange={this.onChange} />
								</div>
								<div className="register--form--wrapper">
									<label className="register--label" htmlFor="telephone">Teléfono</label>
									<InputMask
										className="register--input"
										mask="+(999) 99 99 99 99"
										maskChar=" "
										name="telephone"
										id="telephone"
										onChange={this.onChange}
										type="text"
									
										value={
											(this.state.telephone && this.state.telephone !== 'null') ?
											this.state.telephone :
											''
										}
									/>
								</div>
							</div>
							<div className="register--form-d-flex">
								<div className="register--form--wrapper">
									<label className="register--label" htmlFor="work_address">Dirección de trabajo</label>
									<input className="register--input" type="text"
										value={
											(this.state.work_address && this.state.work_address !== 'null') ?
											this.state.work_address :
											''
										} name="work_address" id="work_address" onChange={this.onChange} />
								</div>
							</div>
							<div className="register--form-d-flex">
								<div className="register--form--buttons-right">
									<Link to="/empasodos" className="btn btn-back">Atrás</Link>
								</div>
								<div className="register--form--buttons">
									<LaddaButton
									    loading={this.state.loading}
									    data-style={EXPAND_LEFT}
									    type="submit"
									    className="btn btn-save">
									    Guardar
									</LaddaButton>
									<Link to="/empasocuatro" className={`btn btn-next ${this.state.step >= this.state.active_step ? "disabled-link" : ""}`}>Siguiente</Link>
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

export default withRouter(connect(mapStateToProps)(Pasotres));

import React, {Component} from 'react';
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios';

import actions from "../../actions";
import '../../assets/css/pages/style.css';


class CompanyType extends Component {
	constructor(props){
		super(props)

		this.state = {
			estado:0
		}

		this.onSubmit  = this.onSubmit.bind(this)
		this.onChange  = this.onChange.bind(this)
	}
  onSubmit(e) {
		e.preventDefault();

		const data =  new FormData();
		data.append('type_of_user', this.state.selection);
		data.append('note', "Enviar tipo de usuario");

		const bearer = 'bearer '+ this.props.userToken;
		const url    = this.props.baseurl + '/v1/users/';

		axios({
			method: 'put',
			url: url,
			data: data,
			headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
		})
    .then(jsonresponse => {
    	if (jsonresponse.status === 204) {
				const obj = {
				  authorize   : this.props.authorize,
				  token       : this.props.userToken,
				  scope       : this.props.scope,
				  email       : this.props.email,
				  id          : this.props.id,
				  register    : this.props.register,
				  type        : this.state.selection,
				  infouser    : this.props.infouser,
				  info_cuenta : this.props.info_cuenta

				};
				this.props.dispatch(actions.setAuth(obj));
		  	if (this.state.selection === 'company') {
				  this.props.history.push("/empasouno");
				} else {
				  this.props.history.push("/pnpasouno");
		  	}
    	}
    })
    .catch(error => {
    });
	}
	onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
	}
	componentDidMount() {}
	render(){
		return(
			<div className="page-empty">
		      <div className="page-empty-content ">
		      	<h1 className="border-radius-top empty-color-title aling-center ">¡COMENCEMOS!</h1>
		      	<div className="page-empty-text aling-center">
		      		<span>¿Eres una empresa o una persona natural?</span>
		      	</div>
		      	<form className="border-radius-bottom border-0top form" onSubmit={this.onSubmit}>
		      		<br/>
		      		<div className="form-check">
			      		<label className="form-check-label page-empty-inline">
			      			<input type="radio" className="form-check-input" name="selection" id="selection" value="personality"  required onChange={this.onChange} />
			      		 	Persona natural
			      		</label>
			      		<label className="form-check-label page-empty-inline">
			      			<input type="radio" className="form-check-input" name="selection" id="selection" value="company" required onChange={this.onChange}  />
			      		 	Empresa
			      		</label>
		      		</div>	
		      		<br/>	 
		      		<br/>     		
		      		<div className="form-group form-group-button">
		            	<button type="submit" className="button button-radius button-primary-width button-primary button-center">INGRESAR</button>
		          	</div>
		      	</form>
		      </div>
		    </div>
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

export default withRouter(connect(mapStateToProps)(CompanyType))
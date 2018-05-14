import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import actions from "../../actions"
import '../../assets/css/pages/general.css'
class Select_acount extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'Perfil',
			page:'perfil',
			menu:'',
			
		}
		this.select_acount = this.select_acount.bind(this)
	}
	componentDidMount(){
  console.log(this.props)
  console.log(this.props.info_cuenta)
	 const bearer = 'bearer '+ this.props.userToken;

	    axios.request('get', {
        url:this.props.baseurl + '/v1/user_accounts',
        headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
      })
      .then(jsonresponse => { 
       	let content;
        content = jsonresponse.data.map((lista, index) => {	       				     
	        return (  	
	      	 <div key={index} className="select-account-row d-flex">
    				<div className="select-account-card">
    					<h3 className="select-account--account-number blue">{lista.code}</h3>
    					<p className="no-margin small">Código de cuenta</p>
    					<br/>
    					<h4 className="select-account--account-due-date">{lista.cutdate_contract}</h4>
    					<p className="no-margin small select-account--due-date">Fecha de fin de contrato</p>
    					<br/>
    					<a onClick={event => { this.select_acount(event, lista.uuid) }} href={null} className="select-account--select-account">SELECCIONAR CUENTA</a>
    				</div>				
    			</div>  
	        );
	    });

          this.setState({
          	tabla:content
          })
      })  
      .catch(error => {

      });		
  	}
  	select_acount(event,uuid){
      const bearer = 'bearer '+ this.props.userToken;
      axios.request('get', {
        url:this.props.baseurl + '/v1/user_accounts/'+uuid+'',
        headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
      })
      .then(jsonresponse => { 
        const data = jsonresponse.data

        const obj = {
            authorize:this.props.authorize,
            token: this.props.userToken,
            scope:this.props.scope,
            email:this.props.email,
            id:this.props.id,
            register:this.props.register,
            type:this.props.type,
            infouser:this.props.infouser,
            info_cuenta:data            
          }
          this.props.dispatch(actions.setAuth(obj))
          this.props.history.push("/dashboard")

      })  
      .catch(error => {
      });
  	}
	render(){
		return(
			<section id="select-acccount" className="select-acccountj">
				<div className="select-account--logo-wrapper">
					<img src="/img/logotext.png" alt="Logo"  width="100%" />
				</div>
				{this.state.tabla}
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

export default withRouter(connect(mapStateToProps)(Select_acount))

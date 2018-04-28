import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import '../../assets/css/pages/style.css'
import axios from 'axios'

class Confirm extends Component{
	constructor(props){
		super(props)

		this.state = {
			estado:0,
			token:props.match.params.token,
			title:'¡PROCESANDO!',
			description:'Se esta validando su token!',
			enlace:''
		}
		this.confirm = this.confirm.bind(this)
	}
	load_login(event){
		this.props.history.push("/")
	}
	confirm(){


	  const data =  new FormData();      
      data.append('confirmation_token', this.state.token);



	   axios.patch(this.props.baseurl + '/v1/users/confirm', data)
      .then(jsonresponse => { 
  
        //let resgister = jsonresponse.data.register;
        this.setState({
          msj:'!Cuenta creada correctamente¡'
        })

        this.setState({
        	title:'¡EXITO!'
        })
        this.setState({
        	description:'Gracias por crear tu cuenta con nosotros, te invitamos a que ingreses a nuestro Dashboard y comienzes tu mundo de oportunidades'
        })
       	let btn = <button onClick={this.load_login.bind(this)}  type="submit" className="button button-radius button-primary-width button-primary button-center">EMPEZAR</button>;
       	this.setState({
        	enlace:btn
        })
      })  
      .catch(error => {
     	this.setState({
        	title:'!ERROR¡'
        })
        this.setState({
        	description:'Error, problema al validar el token!'
        })
        let btn = <button type="submit" className="button button-radius button-primary-width button-primary button-center">REENVIAR CORREO</button>;
       	this.setState({
        	enlace:btn
        })
      });
	}
	componentDidMount(){
		this.confirm();
 	}
	render(){
		return(
		 	<div className="page-empty">
		      <div className="page-empty-content-validate ">
		      	<h1 className="border-radius-top empty-color-title aling-center ">{this.state.title}</h1>
		      	<div className="page-empty-text aling-center">
		      		
		      	</div>
		      	<form className="border-radius-bottom border-0top form">
		      		<br/>
		      		 <span>{this.state.description}</span>
		      		<br/>  
		      		<br/>   		
		      		<div className="form-group form-group-button">
		            	{this.state.enlace}
		          	</div>
		      	</form>
		      </div>
		    </div>
		)
	}
}

const mapStateToProps = (state, props) => {
  return {  
    baseurl:state.mainReducer.setBaseUrl.baseurl
  }
}

export default withRouter(connect(mapStateToProps)(Confirm))
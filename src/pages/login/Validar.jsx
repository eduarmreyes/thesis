import React, { Component } from 'react'
import '../../assets/css/pages/style.css'

class Validar extends Component{
	constructor(props){
		super(props)

		this.state = {
			estado:0
		}
	}

	render(){
		return(
		 	<div className="page-empty">
		      <div className="page-empty-content-validate ">
		      	<h1 className="border-radius-top empty-color-title aling-center ">Valida tu cuenta</h1>
		      	<div className="page-empty-text aling-center">
		      		
		      	</div>
		      	<form className="border-radius-bottom border-0top form">
		      		<br/>
		      		 <span>Tu cuenta ha sido creada exitosamente, hemos enviado un correo a la direccion que antes nos proprcionaste para activar la cuenta.
		      		 Ingresa a tu correo y activa tu cuenta con el link que se te asignará,
		      		 en caso contrario que no hayas recibido aun tu correo, te enviaremos un nuevo correo de confirmación</span>
		      		<br/>  
		      		<br/>   		
		      		<div className="form-group form-group-button">
		            	<button type="submit" className="button button-radius button-primary-width button-primary button-center">REENVIAR CORREO</button>
		          	</div>
		      	</form>
		      </div>
		    </div>
		)
	}
}

export default Validar
import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import '../../assets/css/pages/general.css'

class ValidatingAccount extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'Perfil',
			page:'perfil',
			menu:'',
		}
	}
	componentDidMount(){

  }
	render(){
		return(
			<section id="select-acccount" className="select-acccountj">
				<div className="select-account--logo-wrapper">
					<img src="/img/logotext.png" alt="Logo Consultor Forex"  width="100%" />
				</div>
        <div className="validating-account--wrapper">
          <div className="validating-account-message-wrapper t-center">
            <h2 className="validating-account--thanks-message">
              Muchas gracias
            </h2>
            <h1 className="validating-account--validating-message">
              Estamos procesando tu información
            </h1>
            <p className="validating-account--color-gray">Hemos recibido tus datos y estamos trabajando en la aprobación de los mismos. Uno de nuestros ejecutivos de FOREX revisa que toda la información proporcionada sea correcta y verídica. Esto puede demorar un máximo de 48 horas.</p>
            <p className="validating-account--color-gray">Se te informará por medio de un correo electrónico o SMS cuando tu cuenta esté aprobada. Si tienes alguna consulta puedes escribirnos a nuestro correo de asistencia</p>
            <p><a href='mailto:info@consultorforex.com'>info@consultorforex.com</a>
            </p>
            <p>
              o
            </p>
            <p>
              <a href='tel:+50398678742'>
                +503 9867 8742
              </a>
            </p>
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
    info_cuenta: state.mainReducer.auth.info_cuenta
  }
}

export default withRouter(connect(mapStateToProps)(ValidatingAccount))

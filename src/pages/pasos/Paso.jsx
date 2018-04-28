import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import '../../assets/css/pages/pasos.css'
import Pasouno from "../../pages/pasos/pn/Pasouno"
/*import Pasotres from "../../pages/pasos/pn/Pasotres"
import Pasodos from "../../pages/pasos/pn/Pasodos"
import Pasocuatro from "../../pages/pasos/pn/Pasocuatro"*/
class Paso extends Component{
	constructor(props){
		super(props)

		this.state = {
			stado:''
		}

		this.get_paso = this.get_paso.bind(this)
	}
	get_paso(){

		/*console.log(this.props.infouser.ppe_description);
		const ppe_description = this.props.infouser.ppe_description;
		const work_address = this.props.infouser.work_address;


		var paso = 1;
		if (ppe_description === null ) {
			paso = 1;
		}else{
			if (ppe_description !=  null && work_address === null) {
				paso = 2;
			}else{

			}
		}

		work_address

		 const scope = this.props.scope;
		 if (true) {}
        */
        /*switch(scope) {
            case 'user':
              return <Pasouno />
            case 'admin':
              return <Pasodos />
            case 'moderador':
              return <Pasotres />
            case 'moderador':
              return <Pasocuatro />
        }*/


        return <Pasouno />
	}
	render(){
		return(
		 <div>
		 	{this.get_paso()}
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
    infouser:state.mainReducer.auth.infouser
  }
}

export default withRouter(connect(mapStateToProps)(Paso))
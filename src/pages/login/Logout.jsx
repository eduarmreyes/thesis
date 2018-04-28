
import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import actions from "../../actions"
import '../../assets/css/pages/style.css'
import '../../assets/css/pages/login.css'

class Logout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stado: 0,
      msj:''
     
    }
    this.logout = this.logout.bind(this)
  }
   logout(){
    const scope = this.props.scope;
    const obj = {
      authorize:null,
      token: null,
      scope:null,
      email:null,
      id:null,
      register:null,
      type:null,
      infouser:null,
      info_cuenta:null
      
    }
    this.props.dispatch(actions.setAuth(obj))
    if ( scope === 'admin') {
      this.props.history.push("/admin")
    }
    if ( scope === 'user') {
      this.props.history.push("/")
    }          
  }


  componentDidMount(){
    this.logout()
  }
  render() {
    return(
     <div>
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
    register: state.mainReducer.auth.register
  }
}

export default withRouter(connect(mapStateToProps)(Logout))

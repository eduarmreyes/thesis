
import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import actions from "../../actions"
import '../../assets/css/pages/style.css'
import '../../assets/css/pages/login.css'
import '../../assets/css/pages/movil.css'
import Lottie from 'react-lottie';
import * as animationData from "../../components/lottieAnimation/LoadingRupertx.json"
class LoginAdmin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stado: 0,
      msj:''
     
    }
    this.onChange  = this.onChange.bind(this)
    this.onSubmit  = this.onSubmit.bind(this)
    this.showerror = this.showerror.bind(this)
    this.get_me = this.get_me.bind(this)
  }
   onSubmit(e) {
      const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData
      }

      const load_view = <div className="content-loading">
        <Lottie options={defaultOptions} height={125} width={125} isStopped={this.state.isStopped} isPaused={this.state.isPaused}/>
      </div>;


      this.setState({
        content:load_view
      })

      e.preventDefault();    
      const data =  new FormData();  
      data.append('grant_type', 'password');    
      data.append('email', this.state.email);
      data.append('password', this.state.password);
      data.append('scope', 'admin');

      axios.post(this.props.baseurl + '/v1/oauth/token', data)
      .then(jsonresponse => { 
       

        const data = jsonresponse.data
        

          const obj = {
            authorize:true,
            token: data.access_token,
            scope:data.scope,
            email:null,
            id:null,
            register:null,
            type:null,
            infouser:null,
            info_cuenta:null,
            info_cuenta_pfx:null
            
          }
          this.props.dispatch(actions.setAuth(obj))
       


          this.get_me()

      })  
      .catch(error => {
        this.load_view()
        this.showerror(error)
      });
  }

  get_me(){   
 
      const bearer = 'bearer '+ this.props.userToken;
    
      axios.request('POST', {
        url:this.props.baseurl + '/v1/me_admin',
        headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
      })
      .then(jsonresponse => { 

        const data = jsonresponse.data
          const obj = {
            authorize:this.props.authorize,
            token: this.props.userToken,
            scope: this.props.scope,
            email: data.email,
            id: data.id,
            register: data.register,
            infouser: jsonresponse.data,
            type:null,      
            info_cuenta:null,
            info_cuenta_pfx:null      
          }
 
         this.props.dispatch(actions.setAuth(obj))
         this.props.history.push("/dashboard")

      })  
      .catch(error => {
        this.showerror(error)
      });
  }
  onChange(e){
    this.setState({
        [e.target.name]: e.target.value
    });
  }
  showerror(error){
    let message = '* Error al guadar los datos';        
    this.setState({
      msj:message
    })
  }
  componentDidMount(){
    this.load_view()
  }
  load_view(){
    const view_login =    <div className="page-empty-content">
        <h1 className="border-radius-top empty-color-title aling-center ">INGRESAR</h1>
        <form className="border-radius-bottom border-0top" onSubmit={this.onSubmit}>
          <div className="form-group"><label className="label-gray-color">Correo electronico</label><input type="text" name="email" className="form-control" required onChange={this.onChange} />
          </div>
          <div className="form-group"><label className="label-gray-color">Contraseña </label><input type="password" name="password" className="form-control"  required onChange={this.onChange} />
          </div>
          <div className="form-group">
              <div className="msj">
                {this.state.msj}
              </div>
          </div>
          <div className="form-group form-group-button">
            <button type="submit" className="button button-radius button-primary-width button-primary button-center">INGRESAR</button>
          </div>
          <div className="form-group form-group-button">
            <div className="form-group-button-description content-aling-center label-gray-color">Crea una cuenta con nosotros, <a className="blue-link" href="/singup">Click</a></div>
          </div>
          <div className="form-group form-group-button ">
            <hr className="line-gray" />
            <div className="form-group-button-description content-aling-center"><a className="label-gray-color">¿Has olvidado tu Contraseña?</a></div>
          </div>
        </form>
        {/*<div className="form-description"><a className="button-block button-google button" href="#">Login using Google+</a><a
                className="button-block button-facebook button" href="#">Login using Facebook</a></div>*/}
      </div>
      this.setState({
        content:view_login
      })
  }
  render() {
    return(
     <div className="page-empty">
       {this.state.content}
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
    baseurl:state.mainReducer.setBaseUrl.baseurl
  }
}

export default withRouter(connect(mapStateToProps)(LoginAdmin))

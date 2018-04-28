import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import $ from 'jquery';

import '../../assets/css/pages/style.css'
import '../../assets/css/pages/login.css'

class Singup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stado: 0,
      msj:''
     
    }
    this.onChange  = this.onChange.bind(this)
    this.onSubmit  = this.onSubmit.bind(this)
    this.showerror = this.showerror.bind(this)
  }
  onSubmit(e) {
    e.preventDefault();    

    const data =  new FormData();
    data.append('Email', this.state.username);
    data.append('UserName', this.state.email);
    data.append('Password', this.state.password);
    data.append('FullName', this.state.name);

    $.ajax({
      type: "POST",
      url: this.props.baseurl + "/Account/Register",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({
        UserName: this.state.username,
        Email: this.state.email,
        Password: this.state.password,
        FullName: this.state.name,
      }),
      success: function(response) {
        debugger;
        console.log(response);
      },
      error: function(response) {
        debugger;
        console.log(response);
      }
    });
  }
  onChange(e){
    this.setState({
        [e.target.name]: e.target.value
    });
  }
  showerror(error){
    
    let message = '* Error al enviar los datos';        
    this.setState({
      msj:message
    })
  }
  componentDidMount(){
  }
  render() {
    return(
     <div className="page-empty">
      <div className="page-empty-content">
        <h1 className="border-radius-top empty-color-title aling-center">Registrarse</h1>
        <form className="border-radius-bottom border-0top" onSubmit={this.onSubmit}>
          <div className="form-group"><label className="label-gray-color">Usuario</label><input type="text" name="username" className="form-control" required onChange={this.onChange} />
          </div>
          <div className="form-group"><label className="label-gray-color">Nombre</label><input type="text" name="name" className="form-control" required onChange={this.onChange} />
          </div>
          <div className="form-group"><label className="label-gray-color">Correo electrónico</label><input type="email" name="email" className="form-control" required onChange={this.onChange} />
          </div>
          <div className="form-group"><label className="label-gray-color">Contraseña</label><input type="password" name="password" className="form-control" required onChange={this.onChange} />
          </div>
          <div className="form-group"><label className="label-gray-color">Confirmar Contraseña</label><input type="password" name="password_confirmation" required className="form-control" onChange={this.onChange} />
          </div>
          <div className="form-group">
              <div className="msj">
                  {this.state.msj}
              </div>
          </div>
          <div className="form-group form-group-button">
            <button type="submit" className="button button-radius button-primary-width button button-primary button-center">Registrar</button>
          </div>
          <div className="form-group form-group-button">
            <div className="form-group-button-description content-aling-center line-height">
                <a className="label-gray-color ">Ya posees una cuenta con nosotros?</a> 
                <a className="blue-link" href="/">Ingresar</a>
            </div>
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

export default withRouter(connect(mapStateToProps)(Singup))

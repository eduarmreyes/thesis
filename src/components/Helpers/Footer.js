import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { NavLink } from 'react-router-dom';
 class Footer extends Component {
    constructor(props){
        super(props)

        this.state = {
            estado:''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.showerror = this.showerror.bind(this)
        this.showsucces = this.showsucces.bind(this)

    }
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();    

        var type   = this.state.type;
        var body    = this.state.body;
        var account      = this.props.infocuenta['uuid'];
        const data =  new FormData();  
        data.append('type',            type === 'N/A' ? null : this.state.type );    
        data.append('body',            body === 'N/A' ? null : this.state.body);
        data.append('account',         account === 'N/A' ? null : this.state.account);

        const bearer = 'Bearer '+ this.props.userToken;

        axios({
            method: 'post',
            url: 'https://rupert-x.herokuapp.com/dashboard/v1/contact_us',
            data: data,
                headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
        })
        .then(jsonresponse => {
            this.showsucces()
        })  
        .catch(error => {
             this.showerror(error)
        });

        this.setState({
            overlay:false
        })
    }
    showerror(error){
        let message = <p className="error">*{error.response.data.error}</p>;        
        this.setState({
          msj:message
        })
    }
    showsucces(){
        let message = <p className="succes">* Sus Datos se guardaron correctamente</p>;   
        this.setState({
          msj:message
        })
    }

    render() {
        return (
            <div className="footer">
                <div className="footer-left">
                    Copyright &copy; 2017 Consultor Forex. Todos los derechos reservados.
                </div>
                <div className="footer-right">
                    <ul>
                        <li>
                            <NavLink to="/terms">
                                Terminos y Condiciones
                            </NavLink>
                        </li>
                        <li><a rel="noopener noreferrer" href="https://consultorforex.com/contactanos/" target="_blank" >Contactos</a></li>
                        <li   className={` ${this.props.scope === 'admin' ? "display-none" : ""}`} ><a href="#Soporte">Soporte</a></li>
                        <li><a rel="noopener noreferrer" href="https://consultorforex.com/nosotros/ " target="_blank" >Sobre nosotros </a></li>
                        <li>
                            <NavLink to="/faq">
                                FAQ
                            </NavLink>
                        </li>

                    </ul>
                </div>
                <div id="Soporte" className={`popup-contact overlay ${this.state.overlay === true ? "overlay_visible" : ""}`} >
                    <div className="popup">
                        <div className="popup-title">
                            <h4>Contactanos </h4> <hr/> <a className="close" onClick={this.save_confirm} href={null}>x</a>                                
                        </div>
                        <div className="popup-body">
                            <p>
                                En FOREX estamos para apoyarte en cualquier duda o inquietud que se generé alrededor de nuestro servicio o producto. Elige la categoría al cual pertenece tu inquietud.
                            </p>
                            <div className="pretty p-default p-round">
                                <input  onChange={this.onChange} type="radio" name="type" value="referidos" />
                                <div className="state">
                                    <label>Proceso de referidos</label>
                                </div>
                            </div>
                             <br/>
                             <p>
                                 Reportar inconvenientes con el proceso de apertura de cuentas de referidos
                             </p>                        
                             <div className="pretty p-default p-round">
                                <input onChange={this.onChange} type="radio" name="type" value="desembolsos"/>
                                <div className="state">
                                    <label>Desemboloso</label>
                                </div>
                            </div>
                             <br/>
                             <p>
                                 Solicitud relacionada a retiros que no se puedan procesas por medio del portal o consultas complementarias que provengan de los retiros hechos a través del portal, solicitud de bono de referidos, solicitud de puntos FX, ect.
                             </p>
                             <div className="pretty p-default p-round">
                                <input onChange={this.onChange} type="radio" name="type" value="servicio_al_cliente" />
                                <div className="state">
                                    <label>Servicio al Cliente</label>
                                </div>
                            </div>
                             <br/>
                             <p>
                                 Inquietudes referentes a solicitudes generales, preguntas, dudas, consultas sobre depósitos, procesos, estados de cuenta de referidos, cantidad de puntos FX acumulados.
                             </p>
                             
                           <textarea  placeholder="Escribe tu inquietud." rows="5"  cols="50" name="body" id="body" value={this.state.body || ''} onChange={this.onChange}></textarea>
                            <div className="msj-content">
                                {this.state.msj}
                            </div>
                            <div className="popup-retiro">
                                <div className="form-group section-btn">
                                     <a className="blue btn" href={null} onClick={this.onSubmit}  > ENVIAR</a>
                                </div>
                            </div>                        
                        </div>                                      
                    </div>
                </div>
            </div>
        );
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
    infocuenta:state.mainReducer.auth.info_cuenta,
    baseurl:state.mainReducer.setBaseUrl.baseurl
  }
}

export default withRouter(connect(mapStateToProps)(Footer))
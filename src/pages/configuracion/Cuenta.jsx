import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import '../../assets/css/pages/general.css'
import Backend from '../../components/Layouts/Backend';

import axios from 'axios';
class Cuenta extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'Cuenta',
			page:'cuenta',
			menu:this.props.scope  === 'user' ? "config-user" : "config",
			current_password:'',
			password:'',
			password_confirmation:'',
			errorone:false,
			errortwo:false,
			errorthre:false,
			overlay:false
		}
		this.changue_password = this.changue_password.bind(this)
		this.onChange =  this.onChange.bind(this)
		this.validate =  this.validate.bind(this)
		this.close_overlay = this.close_overlay.bind(this)
	}
	componentDidMount(){
		
	}
	validate(){

		var count = 0;
		this.setState({
			count:this.state.count
		})

		if (this.state.current_password === '') {
			this.setState({
				errorone:true				
			})
			count = count + 1

		}else{
			this.setState({
				errorone:false
			})
			count = 0;
		}

			if (this.state.password === '') {

				this.setState({
					errortwo:true
				})
				count = count + 1

			}else{

				this.setState({
					errortwo:false
				})
				count = 0;
			}

				if (this.state.password_confirmation === '') {

					this.setState({
						errorthre:true
					})
					count = count + 1
				}else{
					this.setState({
						errorthre:false
					})
					count = 0;
				}

					if (this.state.password === this.state.password_confirmation ) {

						count = 0;
						
					}else{
						this.setState({
							errorthre:true,
							errortwo:true			
						})
						let message = '* Las  Contraseñas no son iguales!';        
					    this.setState({
					      msj:message
					    })

					    count = count + 1;
					}
					console.log(count)

		if (count === 0) {

			this.setState({
				overlay:true
			})	

		}


	}
	close_overlay(){
		this.setState({
			overlay:false
		})	
	}
	changue_password(e){
		e.preventDefault(); 		
		this.setState({
			overlay:false
		})
		
	    const bearer = 'bearer '+ this.props.userToken;   
	    const data =  new FormData();  
	    //data.append('id', this.props.infouser['id']);
	    
	    data.append('note', 'Cambio de contraseña');   
	    data.append('current_password', this.state.current_password);
	    data.append('password', this.state.password);
	    data.append('password_confirmation', this.state.password_confirmation);
	    var url = '';
	    var url_cliente = '/v1/user_password';
	    var url_admin = '/v1/users/'+this.props.infouser['id'];

	   	if (this.props.scope === 'user') {
       		url = url_cliente;
        }else{
       		url = url_admin;
	    }
	    axios({
	          method: 'PUT',
	          url:this.props.baseurl + url,
	          data: data,
	          headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
	    })	     
	    .then(jsonresponse => { 
	       this.showsucces()
	       this.setState({
	       	password:''
	       })
	       this.setState({
	       	password_confirmation:''
	       })
	    })  
	    .catch(error => {
	        this.showerror(error)
	    });
			
	  }
	  showerror(error){
	    let message = '* Error al guadar los datos';        
	    this.setState({
	      msj:message
	    })
	  }
	  showsucces(error){
	    let message = 'La contraseña se actualizo correctamente!!';        
	    this.setState({
	      msj:message
	    })
	  }
	  onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });        
      } 
	render(){
		return(
			<Backend title={this.state.title} page={this.state.page} menu={this.state.menu}>	
				<div className="page-cliente-empty ">
					<div className="page-cliente-empty-content none-margin">
						
						<ul className="cuenta-list">
							<li>Cambio de Contraseña</li>
							<li className="width77">
							</li>
							<li></li>
						</ul>
						<div className="margin50">
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/>
							 Ut enim ad minim veniam</p>						
							 <div className="content-form">
							 	<div className="form-group">
                                        <br/>
                                    </div>
                             		<div className="form-group">
                                        <input type="password" className={`form-control ${this.state.errorone === true ? "error" : ""}`}  id="current_password" name="current_password"  placeholder="Contraseña Actual" required  onChange={this.onChange}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className={`form-control ${this.state.errortwo === true ? "error" : ""}`}  id="password" name="password"  placeholder="Nueva contraseña" required  onChange={this.onChange}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className={`form-control ${this.state.errorthre === true ? "error" : ""}`}  id="password_confirmation" name="password_confirmation" required aria-describedby="emailHelp"  onChange={this.onChange} placeholder="Confirmar contraseña" />
                                    </div>
                                    <div className="form-group">
                                        {this.state.msj}
                                    </div>                                  
                                    <div className="form-group">
                                        <br/>
                                    </div>
                                    <div className="form-group section-btn">
                                        <a className="blue btn"  onClick={this.validate}> Aceptar</a>
                                    </div>
                                    <div className="form-group">
                                        <br/>
                                    </div>
							 </div>						
						</div>
						<br/>
						{/*<ul className="cuenta-list">
							<li>Cambio de Contraseña</li>
							<li className="width77">
							</li>
							<li>Editar</li>
						</ul>
						<div className="margin50">
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/>
							 Ut enim ad minim veniam</p>
							 <div className="content-form">
							 	<div className="form-group">
                                        <br/>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Destino" />
                                    </div>
                                    <div className="form-group">
                                        <br/>
                                    </div>
                                    <div className="form-group section-btn">
                                        <a className="blue btn" href=""> Aceptar</a>
                                    </div>
                                    <div className="form-group">
                                        <br/>
                                    </div>
							 </div>
						</div>
						*/}
					</div>
				</div>	
				 <div id="changuepass" className={`overlay ${this.state.overlay === true ? "overlay_visible" : ""}`}>
                        <div className="popup">
                            <div className="popup-title">
                                <h4>Confirmación </h4>                                 
                            </div>
                            <div className="popup-body">
                          		<p>
                          			¿Esta seguro que desea cambiar la contraseña actual ?
                          		</p>
                                <div className="popup-retiro">
                                    <div className="form-group section-btn">
                                        <a className="close blue btn"  onClick={this.close_overlay}>CANCELAR</a> <a className="blue btn"  onClick={e => {this.changue_password(e)}} > ACEPTAR</a>
                                    </div>
                                </div>                        
                            </div>                                      
                        </div>
                    </div>
			</Backend>
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
    infouser: state.mainReducer.auth.infouser,
    info_cuenta: state.mainReducer.auth.info_cuenta,
    baseurl:state.mainReducer.setBaseUrl.baseurl

    
  }
}

export default withRouter(connect(mapStateToProps)(Cuenta))
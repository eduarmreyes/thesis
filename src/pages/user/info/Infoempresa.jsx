import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import '../../../assets/css/pages/general.css'
import Backend from '../../../components/Layouts/Backend';
import actions from "../../../actions"
class Infoempresa extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'Perfil',
			page:'empresa',
			menu:'perfil-cliente',
			active:false,
			beneficiary:this.props.infouser['beneficiary'],
			beneficiary_relationship:this.props.infouser['beneficiary_relationship'],
			beneficiary_telephone:this.props.infouser['beneficiary_telephone'],
			doc_beneficiary:this.props.infouser['doc_beneficiary']
		}


		this.show_form = this.show_form.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.showerror = this.showerror.bind(this)
		this.showsucces = this.showsucces.bind(this)
		this.onChange = this.onChange.bind(this)
		this.save_confirm = this.save_confirm.bind(this)
		
	}
	onChange(e) {
	  	this.setState({
	      [e.target.name]: e.target.value
	    });  
	}
    onSubmit(e) {
	    e.preventDefault();    

	    var beneficiary = this.state.beneficiary;
	    var beneficiary_relationship  = this.state.beneficiary_relationship;
	    var beneficiary_telephone     = this.state.beneficiary_telephone;
	    var doc_beneficiary   = this.state.doc_beneficiary;
	    var note   = this.state.note;


	    const data =  new FormData();  
	  
	    data.append('beneficiary',		beneficiary === 'N/A' ? null : this.state.beneficiary);
	    data.append('beneficiary_relationship',			beneficiary_relationship === 'N/A' ? null : this.state.beneficiary_relationship);
	    data.append('beneficiary_telephone',	    	beneficiary_telephone === 'N/A' ? null : this.state.beneficiary_telephone);
	    data.append('doc_beneficiary',			doc_beneficiary === 'N/A' ? null : this.state.doc_beneficiary);
	    data.append('note',			note === 'N/A' ? null : this.state.note);
		const bearer = 'Bearer '+ this.props.userToken;

		axios({
	    	method: 'put',
	    	url: 'https://rupert-x.herokuapp.com/dashboard/v1/users',
	    	data: data,
				headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
	    })
	    .then(jsonresponse => {
	    	this.showsucces()
	    	this.get_me()
	    	this.show_form()
	    })  
	    .catch(error => {
	     	 this.showerror(error)
	    });

	    this.setState({
	    	overlay:false
	    })
	}
	showerror(error){
	  	let message = <p className="error">*Error al guadar los datos</p>;        
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
  	save_confirm(){
  		this.setState({
  			overlay:!this.state.overlay
  		})
  	}
  	get_me(){   
 
      const bearer = 'bearer '+ this.props.userToken;
     

      axios.request('POST', {
        url:'https://rupert-x.herokuapp.com/dashboard/v1/me',
        headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
      })
      .then(jsonresponse => { 
          const obj = {
            authorize:this.props.authorize,
            token: this.props.userToken,
            scope: this.props.scope,
            email: this.props.email,
            id: this.props.id,
            register: this.props.register,
            type:this.props.type,
            infouser: jsonresponse.data,            
            info_cuenta:this.props.info_cuenta            
          }
        this.props.dispatch(actions.setAuth(obj))
        //this.props.history.push("/companytype")

      })  
      .catch(error => {
        this.showerror(error)
      });
	}
	componentDidMount(){
		console.log(this.props)

		if (this.state.beneficiary === null) {
			this.setState({
				beneficiary:'N/A'
			})
		}
		if (this.state.beneficiary_relationship === null) {
			this.setState({
				beneficiary_relationship:'N/A'
			})
		}
		if (this.state.beneficiary_telephone === null) {
			this.setState({
				beneficiary_telephone:'N/A'
			})
		}
		if (this.state.doc_beneficiary === null) {
			this.setState({
				doc_beneficiary:'N/A'
			})
		}
	
	}
  	show_form(){
    	if (this.state.active === false) {
    		this.setState({
	    		active:true
	    	})
    	}else{
    		this.setState({
	    		active:false
	    	})
    	}   

    	this.setState({
	      msj:''
	    }) 	
    }
	render(){
		return(
			<Backend title={this.state.title} page={this.state.page} menu={this.state.menu}>			
				<div className="page-cliente-empty none-margin">
					<form onSubmit={this.onSubmit}>
						<div className="infor-person margin50">
							<div className="user-name">
								<div className="section">
									<ul>
										<li>										
											<strong className={` ${this.state.active === false ? "active" : "inactive"}`} >{this.state.beneficiary}</strong>
											<input className={` ${this.state.active === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="beneficiary" name="beneficiary" value={this.state.beneficiary || ''} />
											<br/>
											<span>Nombre del Beneficiario</span>										
										</li>							
									</ul>
								</div>
							</div>
							<div className="col-person ">
								<div className="content-body">
									<div className="section">
									    
										<ul>
											<li>
												<label>N° de identidad </label>
												<strong className={` ${this.state.active === false ? "active" : "inactive"}`} > {this.state.doc_beneficiary}</strong>
												<input className={` ${this.state.active === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="doc_beneficiary" name="doc_beneficiary" value={this.state.doc_beneficiary || ''} />
											</li>
											<li>
											
											</li>
										</ul>								
									</div>
									<div className="section">
										<ul>
											<li>
												<span>Relacion</span><br/>
												<strong className={` ${this.state.active === false ? "active" : "inactive"}`} > {this.state.beneficiary_relationship}</strong>
												<input className={` ${this.state.active === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="beneficiary_relationship" name="beneficiary_relationship" value={this.state.beneficiary_relationship || ''} />										
											</li>
											<li>
											</li>
										</ul>
									</div>
						
								</div>					
							</div>
							<div className="col-person ">
								
								<div className="content-body">
									<div className="section">
										<ul>
											<li>
											     <span>Teléfono de Contacto</span><br/>
												<strong className={` ${this.state.active === false ? "active" : "inactive"}`} > {this.state.beneficiary_telephone}</strong>
													<input className={` ${this.state.active === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="beneficiary_telephone" name="beneficiary_telephone" value={this.state.beneficiary_telephone || ''} />
												
											</li>
											<li>
												
											</li>
										</ul>
									</div>
									<div className="section">
										<ul>
											<li>
												<label className="edit top100">
												<a href={null} onClick={this.show_form} className={` btn-save  ${this.state.active === true ? "active btn" : "inactive"}`} >CANCELAR</a>
												<a onClick={this.show_form} className={` btn-save  ${this.state.active === true ? "active btn" : "inactive"}`} >GUARDAR</a>
												<a className={` ${this.state.active === false ? "active" : "inactive"}`} href={null} onClick={this.save_confirm}> <i className="md-icon">edit</i> Editar </a>
											</label> 
												
											</li>
											
										</ul>
									</div>
									<div className="msj-content">
										{this.state.msj}
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
				<div id="Editar" className={`popup-note overlay ${this.state.overlay === true ? "overlay_visible" : ""}`} >
                        <div className="popup">
                            <div className="popup-title">
                                <h4>Petición de editar </h4> <hr/> <a className="close" onClick={this.save_confirm} href={null}>x</a>                                
                            </div>
                            <div className="popup-body">
                                <p>
                                    Por políticas de FOREX debe dejar constancia de la razón por la que realiza una modificación en los datos de perfil. Debe ser breve para su pronta aprobación.
                                </p>
                               <textarea  placeholder="" rows="5"  cols="50" name="note" id="note" value={this.state.note || ''} onChange={this.onChange}></textarea>
                                <div className="popup-retiro">
                                    <div className="form-group section-btn">
                                         <a className="blue btn" href={null} onClick={this.onSubmit} > ENVIAR</a>
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
    type: state.mainReducer.auth.type,
    infouser: state.mainReducer.auth.infouser,
    info_cuenta: state.mainReducer.auth.info_cuenta,
    baseurl:state.mainReducer.setBaseUrl.baseurl
  }
}


export default withRouter(connect(mapStateToProps)(Infoempresa))

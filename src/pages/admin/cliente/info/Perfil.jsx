import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import '../../../../assets/css/pages/general.css'
import Backend from '../../../../components/Layouts/Backend';
import moment from 'moment';
import * as NumberFormat from 'react-number-format';
class General extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'Perfil',
			page:'perfil',
			menu:'detallecliente-admin',
			id_user:props.match.params.id_user,
			uuid:props.match.params.uuid,
			count_account:'',
			showpersonal:false,
			showcontact:false,
			showinfo:false,
			active_contact:false,
			active_info:false,
			infouser:[],
            overlay_new_acount:false,
            initial_amount:'',
            origin_of_funds:'',  
            voucher:'',
            bank_deposit:'',   
            transfer_format:'',
            tc:'',
            error_form_count:0   
		}

		this.validate = this.validate.bind(this)	
		this.show_contactform = this.show_contactform.bind(this)
		this.show_infoform = this.show_infoform.bind(this)
		this.onSubmitcontact = this.onSubmitcontact.bind(this)
		this.onSubmitinfoeconomica = this.onSubmitinfoeconomica.bind(this)
		this.showsucces = this.showsucces.bind(this)
		this.showerror = this.showerror.bind(this)
		this.showinfo = this.showinfo.bind(this)
		this.showcontact = this.showcontact.bind(this)
		this.showpersonal = this.showpersonal.bind(this)
		this.showsuccesct = this.showsuccesct.bind(this)
		this.showerrorct = this.showerrorct.bind(this)
		this.onChange = this.onChange.bind(this)
		this.detail = this.detail.bind(this)
		this.set_data = this.set_data.bind(this)

		this.overlay_new_acount_confirm = this.overlay_new_acount_confirm.bind(this)        
        this.create_acount = this.create_acount.bind(this)
        this.show_overlay_new_acount = this.show_overlay_new_acount.bind(this)
        this.validate_new_acount = this.validate_new_acount.bind(this)

        this.create_deposito = this.create_deposito.bind(this)
		
	}	
	componentDidMount(){
		this.detail()
		this.validate()

  	}
	detail(){
		const bearer = 'bearer '+ this.props.userToken;
		setTimeout(() => {  
	    axios.request('GUET', {
	      url:this.props.baseurl + '/v1/users/'+this.state.id_user+'',
	      headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
	    })
	    .then(jsonresponse => { 
			
	      const json = jsonresponse.data;
	      this.setState({
	      	infouser:json
	      })
		   
	      this.set_data()
	    })
	    .catch(error => {


	    });  
	   }, 500)
	}
	set_data(){
		var infouser = this.state.infouser;	
	   this.setState({			
			nombre:infouser.firstname ,
			apellido:infouser.lastname ,
			nombre_completo:infouser.firstname +' '+ infouser.lastname,
			civil_status:infouser.civil_status,
			telefono:infouser.telephone,
			movil:infouser.mobilephone,
			number_document_identification:infouser.number_document_identification,
			occupation:infouser.occupation,
			type_document_indentification:infouser.type_document_indentification,
			country:infouser.country,
			deparment:infouser.deparment,
			direccion:infouser.address,
			doc1:infouser.doc1,
			resident_us:infouser.resident_us,
			resident_us_description:infouser.resident_us_description,
			ppe:infouser.ppe,
			place_of_work:infouser.place_of_work,
			position_held:infouser.position_held,
			work_address:infouser.work_address,
			workphone:infouser.workphone,			
			puntosforex:infouser.fxpoints,
			nombre_banco:infouser.bank_name,
			pais_banco:infouser.bank_country,
			numero_cuenta:infouser.bank_account,
			fecha_nacimiento:infouser.birthday,
			fecha_iniciocontrato:null,
			fecha_finalizacioncontrato:null,
			referred_by:infouser.referred_by,
			empresa_nombre:infouser.enterprise_name,
			empresa_telefono:infouser.enterprise_telefone,
			empresa_movil:infouser.enterprise_mobilephone,
			empresa_direccion:infouser.enterprise_address,
			email:infouser.email,			

		})
		this.validate()
	}
	validate(){
    	if (this.state.doc1 === null) {
			this.setState({
				doc1:'N/A'
			})
		}
		if (this.state.workphone === null) {
			this.setState({
				workphone:'N/A'
			})
		}

		if (this.state.work_address === null) {
			this.setState({
				work_address:'N/A'
			})
		}

		if (this.state.position_held === null) {
			this.setState({
				position_held:'N/A'
			})
		}

		if (this.state.place_of_work === null) {
			this.setState({
				place_of_work:'N/A'
			})
		}

		if (this.state.type_document_indentification === null) {
			this.setState({
				type_document_indentification:'N/A'
			})
		}

		if (this.state.number_document_identification === null) {
			this.setState({
				number_document_identification:'N/A'
			})
		}
		if (this.state.nombre === null) {
			this.setState({
				nombre:'N/A'
			})
		}
		if (this.state.apellido === null) {
			this.setState({
				apellido:'N/A'
			})
		}
		if (this.state.civil_status === null) {
			this.setState({
				civil_status:'N/A'
			})
		}
		if (this.state.occupation === null) {
			this.setState({
				occupation:'N/A'
			})
		}
		if (this.state.movil === null) {
			this.setState({
				movil:'N/A'
			})
		}
		if (this.state.country === null) {
			this.setState({
				country:'N/A'
			})
		}
		
		if (this.state.deparment === null) {
			this.setState({
				deparment:'N/A'
			})
		}
		if (this.state.ppe === null) {
			this.setState({
				ppe:'N/A'
			})
		}
		if (this.state.resident_us === null) {
			this.setState({
				resident_us:'N/A'
			})
		}
		if (this.state.resident_us_description === null) {
			this.setState({
				resident_us_description:'N/A'
			})
		}
		if (this.state.direccion === null) {
			this.setState({
				direccion:'N/A'
			})
		}
		if (this.state.puntosforex === null) {
			this.setState({
				puntosforex:'N/A'
			})
		}
		if (this.state.nombre_banco === null) {
			this.setState({
				nombre_banco:'N/A'
			})
		}
		if (this.state.pais_banco === null) {
			this.setState({
				pais_banco:'N/A'
			})
		}
		if (this.state.numero_cuenta === null) {
			this.setState({
				numero_cuenta:'N/A'
			})
		}
		if (this.state.fecha_nacimiento === null) {
			this.setState({
				fecha_nacimiento:'N/A'
			})
		}
		if (this.state.fecha_iniciocontrato === null) {
			this.setState({
				fecha_iniciocontrato:'N/A'
			})
		}
		if (this.state.fecha_finalizacioncontrato === null) {
			this.setState({
				fecha_finalizacioncontrato:'N/A'
			})
		}
		if (this.state.empresa_nombre === null) {
			this.setState({
				empresa_nombre:'N/A'
			})
		}
		if (this.state.empresa_telefono === null) {
			this.setState({
				empresa_telefono:'N/A'
			})
		}
		if (this.state.empresa_movil === null) {
			this.setState({
				empresa_movil:'N/A'
			})
		}
		if (this.state.empresa_direccion === null) {
			this.setState({
				empresa_direccion:'N/A'
			})
		}
		if (this.state.referred_by === null) {
			this.setState({
				referred_by:'N/A'
			})
		}
    }
	
	onChange(e) {
	  	this.setState({
	      [e.target.name]: e.target.value
	    });  

	    if (e.target.name ==='tc') {
           //console.log(this.refs.check_me.checked);
           this.setState({
              tc:this.refs.check_me.checked
           })
        }
	}

  	showpersonal(event, estado) {
   		event.preventDefault()
   		this.setState({
   		 	showpersonal:!this.state.showpersonal
   		})
	}
	showcontact(event, estado) {
   		event.preventDefault()
   		this.setState({
   		 	showcontact:!this.state.showcontact
   		})
	}
	showinfo(event, estado) {
   	    event.preventDefault()
   	    this.setState({
   		 	showinfo:!this.state.showinfo
   		})
	}
	show_contactform(){
    	if (this.state.active_contact === false) {
    		this.setState({
	    		active_contact:true
	    	})
    	}else{
    		this.setState({
	    		active_contact:false
	    	})
    	} 
		if(this.state.showcontact === false)
    	{
    		this.setState({
	    		showcontact:true
	    	})
    	}
    	this.setState({
	      msj:''
	    })  	
    }
    show_infoform(){
    	if (this.state.active_info === false) {
    		this.setState({
	    		active_info:true
	    	})
    	}else{
    		this.setState({
	    		active_info:false
	    	})
    	} 
    	if(this.state.showinfo === false)
    	{
    		this.setState({
	    		showinfo:true
	    	})
    	}
    	this.setState({
	      msj:''
	    })  	
    }
    showerror(error){
	  	let message = <p className="error">*Error al enviar los datos</p>;        
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
  	showerrorct(error){
	  	let message = <p className="error">*Error al enviar los datos</p>;        
	    this.setState({
	      msjct:message
	    })
	}
	showsuccesct(){
		let message = <p className="succes">* Sus Datos se guardaron correctamente</p>;   
	    this.setState({
	      msjct:message
	    })
  	}
	onSubmitcontact(e) {
	    e.preventDefault();    

	    var telefono   = this.state.telefono;
	    var movil      = this.state.movil;
	    var direccion  = this.state.direccion;



	    const data =  new FormData();  
	  
	    data.append('telephone',		    telefono  === 'N/A' ? null : this.state.telefono);
	    data.append('mobilephone',			movil     === 'N/A' ? null : this.state.movil);
	    data.append('address',	    direccion === 'N/A' ? null : this.state.direccion);
		const bearer = 'Bearer '+ this.props.userToken;

		axios({
	    	method: 'put',
	    	url: 'https://rupert-x.herokuapp.com/dashboard/v1/users/'+this.state.id_user+'',
	    	data: data,
				headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
	    })
	    .then(jsonresponse => {
	    	this.showsuccesct()
	    	this.detail()
	    })  
	    .catch(error => {
	     	 this.showerrorct(error)
	    });
	}
	onSubmitinfoeconomica(e) {
	    e.preventDefault();    

	    var place_of_work  = this.state.place_of_work;
	    var position_held  = this.state.position_held;
	    var workphone      = this.state.workphone;
	    var work_address   = this.state.work_address;



	    const data =  new FormData();  
	  
	    data.append('place_of_work',		place_of_work === 'N/A' ? null : this.state.place_of_work);
	    data.append('position_held',	    position_held === 'N/A' ? null : this.state.position_held);
	    data.append('workphone',	    	workphone     === 'N/A' ? null : this.state.workphone);
	    data.append('work_address',			work_address  === 'N/A' ? null : this.state.work_address);
	    
		const bearer = 'Bearer '+ this.props.userToken;

		axios({
	    	method: 'put',
	    	url: 'https://rupert-x.herokuapp.com/dashboard/v1/users/'+this.state.id_user+'',
	    	data: data,
				headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
	    })
	    .then(jsonresponse => {
	    	this.showsucces()
	    	this.detail()
	    })  
	    .catch(error => {
	     	 this.showerror(error)
	    });
	}
	handleChange(selectorFiles: FileList) {
      this.setState({
        voucher:selectorFiles[0]
      })
    }
    create_acount(e){
        e.preventDefault(); 
        const bearer = 'bearer '+ this.props.userToken; 

    

        var total_centavos = this.state.initial_amount * 100;
        const data =  new FormData();    
        data.append('initial_amount', total_centavos);
        data.append('type_account', 'account_new');
        data.append('origin_of_funds', this.state.origin_of_funds);
        data.append('transfer_format', this.state.transfer_format);
        data.append('tc', this.state.tc);
        data.append('sa', true);
        data.append('bank_deposit', this.state.bank_deposit);
        axios({
              method: 'POST',
              url:this.props.baseurl + '/v1/user_accounts/',
              data: data,
              headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
        })         
        .then(jsonresponse => {
            this.create_deposito(jsonresponse.data.uuid)
            this.showsucces();
        })  
        .catch(error => {
           this.show_overlay_new_acount()
            this.overlay_new_acount_confirm()
            this.showerror(error)
        });     
    }
    create_deposito(uuid){
        console.log(uuid)
        const bearer = 'bearer '+ this.props.userToken; 

        var date = moment();
        var trans_date = date.format('YYYY-MM-DD');

        var total_centavos = this.state.initial_amount * 100;
        const data =  new FormData();    
        data.append('trans_date', trans_date);
        data.append('trans_initial', true);
        data.append('trans_gaining', false);
        data.append('trans_deposit', false);
        data.append('trans_retirement', false);
        data.append('trans_lost', false);
        data.append('amount', total_centavos);
        data.append('status', 'pending');

        /*var imagefile = document.querySelector('#voucher');
        console.log(imagefile.files)
        data.append("voucher", imagefile.files[0]);*/
        data.append("voucher", this.state.voucher);

        axios({
              method: 'POST',
              url:this.props.baseurl + '/v1/user_accounts/'+uuid+'/transactions',
              data: data,
              headers: { 'Authorization': bearer,'Content-Type': 'multipart/form-data','Accept': 'application/json'}
        })         
        .then(jsonresponse => {
            this.show_overlay_new_acount()
            this.overlay_new_acount_confirm()
            this.showsucces();
       
        })  
        .catch(error => {
            console.log(error)
            this.show_overlay_new_acount()
            this.overlay_new_acount_confirm()
            this.showerror(error)
        });
    }
    show_overlay_new_acount(){
      this.setState({
          overlay_new_acount:!this.state.overlay_new_acount
      })
    }
    overlay_new_acount_confirm(){
      this.setState({
          overlay_new_acount_confirm:!this.state.overlay_new_acount_confirm
      })  
    }
    validate_new_acount(){

        setTimeout(() => {  
          if (this.state.initial_amount === '') {
            this.setState({
                initial_amount_validate:'error',
                error_form_count:this.state.error_form_count + 1
            })
          }else{
            this.setState({
                initial_amount_validate:'',
                error_form_count:0
            })
          }
          if (this.state.origin_of_funds === "") {
            console.log('entre')
            this.setState({
                origin_of_funds_validate:'error',
                error_form_count:this.state.error_form_count + 1
            })
          }else{
            this.setState({
                origin_of_funds_validate:'',
                error_form_count:0
            })
          }
          if (this.state.voucher === "") {
            this.setState({
                voucher_validate:'error',
                error_form_count:this.state.error_form_count + 1
            })
          }else{
            this.setState({
                voucher_validate:'',
                error_form_count:0
            })
          }
          if (this.state.bank_deposit === "") {
            this.setState({
                bank_deposit_validate:'error',
                error_form_count:this.state.error_form_count + 1
            })
          }else{
            this.setState({
                bank_deposit_validate:'',
                error_form_count:0
            })
          }
          if (this.state.transfer_format === "") {
            this.setState({
                transfer_format_validate:'error',
                error_form_count:this.state.error_form_count + 1
            })
          }else{
            this.setState({
                transfer_format_validate:'',
                error_form_count:0
            })
          }
          if (this.state.tc === "") {
            this.setState({
                tc_validate:'error',
                error_form_count:this.state.error_form_count + 1
            })
          }else{
            this.setState({
                tc_validate:'',
                error_form_count:0
            })
          }
          if(this.state.error_form_count === 0){
            this.show_overlay_new_acount()
            this.overlay_new_acount_confirm()
          }
        }, 500) 
    }
	render(){
		return(
			<Backend title={this.state.title} page={this.state.page} menu={this.state.menu} uuid={this.state.uuid} id_user={this.state.id_user}>			
				<div className="page-cliente-empty none-margin">
					<div  className={`infor-person margin50 toggle-zona toggle toggle-selected `}>
						<div className="user-name">
							<div className="section">
								<ul>
									<li>										
										<strong>{this.state.nombre_completo}</strong><br/>
										<span>Persona juridica</span>		<br/>
										<a className="middle-flex"  href="#newacount" onClick={this.show_overlay_new_acount}><i className="md-icon">add_circle_outline</i> Nueva cuenta. </a>								
									</li>							
								</ul>
							</div>
						</div>
						<div className={`col-person`}>						
							<div className="content-body">
								<div className="section">
									<ul>
										<li>
											<span>Estado Civil</span><br/>
											<strong>{this.state.civil_status}</strong>
											
										</li>
										<li>
											<span>Profesión</span><br/>
											<strong>{this.state.occupation}</strong>
											
										</li>
									</ul>
								</div>

								<div className="section">
									<ul>
										<li>
											<span>País</span><br/>
											<strong>{this.state.country}</strong>
											
										</li>
										<li>
										    <span>Departamento/Ciudad</span><br/>
											<strong>{this.state.deparment}</strong>
											
										</li>
									</ul>
								</div>

								<div className="section">
								    <label>Numero de Identificación Ciudadana</label>
									<strong>{this.state.doc1}</strong>
								</div>
						
								<div className="section">
									<ul>
										<li>
											<span>Documento de Identificación </span><br/>
											<strong>{this.state.type_document_indentification} </strong>
											
										</li>
										<li>
										    <span>Numero de Documento</span><br/>
											<strong>{this.state.number_document_identification} </strong>
										</li>
									</ul>
								</div>
							</div>

						</div>
						<div className={`col-person`}>
							<div className="content-body"> 
								<div className="section">
									<ul>
										<li>
										    <span>¿Es persona politicamente expuesta?</span><br/>
											<strong>{ this.state.ppe === true ? "SI" : "NO"}</strong>										
										</li>
										<li>
											
										</li>
									</ul>
								</div>
								<div className="section">
									<span>¿Eres Ciudadano o residente de los Estado Unidos de America?</span>
									<strong>{this.state.resident_us === true ? "SI" : "NO"}</strong>
								</div>
								<div className="section">
									<span>Correo:</span>
									<strong>{this.state.email}</strong>
								</div>
							</div>

						</div>
					</div>
					<div className=" toggle-menu margin50">
						<ul>
							<li> 
								<label id="Contancto"> Datos Contacto</label>
							</li>
							<li className="card-center">							
							 <a href="#Contancto"  onClick={this.show_contactform} ><i className="md-icon">create</i></a>
							</li>
							
							<li className="card-center">
								<a href="#Contancto" onClick={event => { this.showcontact(event, "active") }}> <i className="md-icon">keyboard_arrow_down</i></a>
							</li>
						</ul>
						<ul>
							<li className="full-width-line">
								<hr/>
							</li>
						</ul>
					</div>
					<form onSubmit={this.onSubmitcontact}> 
					<div  className={`infor-person margin50 toggle-zona toggle${this.state.showcontact === true ? " toggle-selected" : ""}`}>
						<div className={`col-person  ${this.state.showcontact === true ? " center-panel " : "inactive"}`}>
							<div className="content-body">
								<div className="section">
								    
									<ul>
										<li>
											<label>Telefono de Residencia</label>
											<strong className={` ${this.state.active_contact === false ? "active" : "inactive"}`}>{this.state.telefono}</strong>
											<input className={` ${this.state.active_contact === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="telefono" name="telefono" value={this.state.telefono || ''} />
										</li>
										<li>
											<label>Movil</label>
											<strong className={` ${this.state.active_contact === false ? "active" : "inactive"}`}>{this.state.movil}</strong>
											<input className={` ${this.state.active_contact === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="movil" name="movil" value={this.state.movil || ''} />
										</li>
									</ul>
								</div>
								<div className="section">
								
									<span>Direccion de Residencia</span><br/>
									<strong className={` ${this.state.active_contact === false ? "active" : "inactive"}`} >{this.state.direccion}</strong>
								    <textarea className={` ${this.state.active_contact === true ? "active" : "inactive"}`} placeholder="" rows="5"  cols="50" name="direccion" value={this.state.direccion || ''} onChange={this.onChange}></textarea>
								</div>
							</div>
						</div>
						<div className={`col-person  ${this.state.showcontact === true ? " center-panel " : "inactive"}`}>
							<div className="content-body">
								<div className="section">
									<div className="grup-btn">
										<a className="btn-save" onClick={this.show_contactform} > Cancelar</a> <button type="submit" className="btn-save"> Guardar</button>
									</div>							
								</div>	
								<div className="msj-content">
										{this.state.msjct}
								</div>	
							</div>
						</div>					
					</div>
					</form>
					<div className=" toggle-menu margin50">
						<ul>
							<li> 
								<label id="Info"> Información Económica</label>
							</li>
							<li className="card-center">							
							 <a href="#Info" onClick={this.show_infoform} > <i className="md-icon">create</i></a>
							</li>
							<li className="card-center">
								<a href="#Info" onClick={event => { this.showinfo(event, "active") }}> <i className="md-icon">keyboard_arrow_down</i></a>
							</li>
						</ul>
						<ul>
							<li className="full-width-line">
								<hr/>
							</li>
						</ul>
					</div>
					<form onSubmit={this.onSubmitinfoeconomica}> 
					<div  className={`infor-person margin50 toggle-zona toggle${this.state.showinfo === true ? " toggle-selected" : ""}`}>
						<div className={`col-person  ${this.state.showinfo === true ? " center-panel " : "inactive"}`}>
							<div className="content-body">
								<div className="section">
								    
									<ul>
										<li>
											<label>Nombre del lugar de trabajo</label>
											<strong className={` ${this.state.active_info === false ? "active" : "inactive"}`}>{this.state.place_of_work}</strong>
											<input className={` ${this.state.active_info === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="place_of_work" name="place_of_work" value={this.state.place_of_work || ''} />	
										</li>
										<li>
										</li>
									</ul>								
								</div>
								<div className="section">
									<ul>
										<li>
											<span>Cargo que desempeña</span><br/>
											<strong className={` ${this.state.active_info === false ? "active" : "inactive"}`}>{this.state.position_held}</strong>
											<input className={` ${this.state.active_info === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="position_held" name="position_held" value={this.state.position_held || ''} />	
											
										</li>
										<li>
											<span>Telefóno de Trabajo</span><br/>
											<strong className={` ${this.state.active_info === false ? "active" : "inactive"}`}>{this.state.workphone}</strong>
											<input className={` ${this.state.active_info === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="workphone" name="workphone" value={this.state.workphone || ''} />											
										</li>
									</ul>
								</div>

								<div className="section">
									<ul>
										<li>
											<span>Estimado de ingresos anuales</span><br/>
											<strong className={` ${this.state.active_info === false ? "active" : "inactive"}`}>{this.state.country}</strong>	
											<input className={` ${this.state.active_info === true ? "active" : "inactive"}`} onChange={this.onChange} type="text" id="apellido" name="apellido" value={this.state.apellido || ''} />									
										</li>
										<li>
										</li>
									</ul>
								</div>
								<div className="section">
								    <label>Dirección de trabajo</label>
									<strong className={` ${this.state.active_info === false ? "active" : "inactive"}`} >{this.state.work_address}</strong>		
									<textarea className={` ${this.state.active_info === true ? "active" : "inactive"}`} placeholder="" rows="5"  cols="50" name="work_address" value={this.state.work_address || ''} onChange={this.onChange}></textarea>						
								</div>
							</div>
						</div>
						<div className={`col-person  ${this.state.showinfo === true ? " center-panel " : "inactive"}`}>
							<div className="content-body">
								<div className="section">
									<div className="grup-btn">
										<a className="btn-save" onClick={this.show_infoform}> Cancelar</a> <button type="submit" className="btn-save"> Guardar</button>
									</div>							
								</div>	
								<div className="msj-content">
									{this.state.msj}
								</div>	
							</div>
						</div>
					</div>
					</form>

				</div>
			    <div id="Editar" className="overlay">
                    <div className="popup">
                        <div className="popup-title">
                            <h4>Petición de editar </h4> <hr/> <a className="close" href={null}>x</a>
                            
                        </div>
                        <div className="popup-body">
                                <p>
                                    Estos campos solo pueden ser editados por un administrador o moderador de FOREX.
                                </p>
                                <p>
                                    Le pedimos que se ponga en contacto al teléfono <strong>(+503) 8888 8888 </strong> o enviar un correo a <br/>
                                    <strong>info@consultorforex.com</strong> y explicar la razon por la cual se quiere hacer esa edición. Se le ruega que se adjunte un comprobantet (si es requerido) al momento de enviar el correo.
                                 </p>
                                <div className="popup-retiro">
                                    <div className="form-group section-btn">
                                         <a className="blue btn" href={null} > ENTENDIDO</a>
                                    </div>
                                </div>
                    
                        </div>                                      
                    </div>
                </div>
                <div id="newa_count" className={`overlay ${this.state.overlay_new_acount === true ? "overlay_visible" : ""}`}>
                    <div className="popup popup_new_acount">
                        <div className="popup-title">
                            <h4>Agregar Nueva Cuenta</h4> <hr/> <a className="close"  onClick={this.show_overlay_new_acount}>x</a>                                
                        </div>
                        <div className="popup-body">
                            <div className="popup-acountnew">
                                <div className="form-group">
                                    <p>
                                        Si deseas crear otra cuenta de inversion con tus mismos datos personales, debes llenar la siguiente información.
                                    </p>
                                </div>
                                <div className="form-group">                                   
                                     <NumberFormat placeholder="Cantidad a depositar" id="initial_amount"  className={`form-control ${this.state.initial_amount_validate === "error" ? "error" : ""}`} value={this.state.initial_amount} thousandSeparator={true} prefix={'$'} decimalSeparator={'.'} decimalScale={2} onValueChange={(values) => {
                                        const { value} = values;
                                        // formattedValue = $2,223
                                        // value ie, 2223
                                        this.setState({initial_amount: value})
                                      }}/>
                                </div>
                            
                                <div className="form-group">  
                                    <select className={`form-control ${this.state.origin_of_funds_validate === "error" ? "error" : ""}`}  name="origin_of_funds" id="origin_of_funds" onChange={this.onChange}>    
                                        <option >Origen de Fondos</option>
                                        <option value="Ahorro">Ahorro</option>
                                        <option value="Salario">Salario</option>
                                        <option value="Inversiones">Inversiones</option>
                                        <option value="Herencia">Herencia</option>
                                        <option value="Prestamo">Préstamo</option>
                                        <option value="Otros">Otros</option>
                                    </select>
                                </div>
                                <div className="form-group">  
                                    <span>Voucher de comprobación</span>
                                </div>
                                <div className="form-group hcht40">  
                                  <input type="file" className={`custom-file-input ${this.state.voucher_validate === "error" ? "error" : ""}`}  id="voucher" name="voucher"  onChange={ (e) => this.handleChange(e.target.files) }  />
                                 
                                </div>
                                <div className="form-group">  
                                    <select className={`form-control ${this.state.bank_deposit_validate === "error" ? "error" : ""}`} id="bank_deposit" name="bank_deposit" onChange={this.onChange} >
                                        <option > Seleccione el Banco </option>
                                        <option value="banco_agricola"> Banco Agricola </option>
                                        <option value="banco_cuscatlan"> Banco Cuscatlan </option>
                                        <option value="banco_well_fargo"> Banco well fargo </option>
                                        <option value="capital_one"> Capital one </option>
                                    </select>
                                </div>
                                <div className="form-group">  
                                    <select className={`form-control ${this.state.transfer_format_validate === "error" ? "error" : ""}`} id="transfer_format" name="transfer_format" onChange={this.onChange} >
                                        <option> Tipo de Transferencia </option>
                                        <option value="Cheque Personal"> Cheque Personal </option>
                                        <option value="Cheque de Caja(de Gerencia)"> Cheque de Caja(de Gerencia) </option>
                                        <option value="Transferencia Electronica"> Transferencia Electronica </option>
                                        <option value="Transferencia Internacional"> Transferencia Internacional </option>
                                        <option value="Efectivo"> Efectivo </option>
                                    </select>
                                </div>
                                 
                                <div className="form-group">  
                                    <ul className="term">
                                        <li>
                                            <div className="pretty p-default p-curve">
                                                <input type="checkbox" id="tc"  name="tc" onChange={this.onChange} ref="check_me" />
                                                <div className="state">
                                                    <label></label>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <span>
                                                    Acepto los <a>términos y condiciones</a> que conlleva el sistema de referido de CONSULTOR FOREX.
                                                </span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="form-group">
                                    <br/>  
                                </div>
                                <div className="form-group msj">
                                        {this.state.msj}
                                </div>
            
    
                                <div className="form-group section-btn">                                
                                    <a className="blue btn" href={null}  onClick={this.validate_new_acount}> Aceptar</a>
                                </div>
                                <div className="form-group">
                                    <br/>
                                </div>
                            </div>
                        </div>                                      
                    </div>
                </div>
                <div id="add_new_acount_confirm" className={`overlay ${this.state.overlay_new_acount_confirm === true ? "overlay_visible" : ""}`}>
                    <div className="popup">
                        <div className="popup-title">
                            <h4>Confirmación </h4>                                  
                        </div>
                        <div className="popup-body">
                            <p>
                                ¿Esta seguro que desea aplicar la transacción ?
                            </p>
                            <div className="popup-acountnew">
                                <div className="form-group section-btn">
                                    <a className="close blue btn" href="" onClick={this.overlay_new_acount_confirm}>CANCELAR</a> <a className="blue btn" href="" onClick={e => {this.create_acount(e)}} > ACEPTAR</a>
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

export default withRouter(connect(mapStateToProps)(General))

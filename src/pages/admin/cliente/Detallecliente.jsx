import React, { Component } from 'react'
import '../../../assets/css/pages/general.css'
import Backend from '../../../components/Layouts/Backend';
import ChartLine from "../../../components/Graphics/ChartLine"
import axios from 'axios'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import {DatetimePickerTrigger} from 'rc-datetime-picker';
import * as NumberFormat from 'react-number-format';
class Detallecliente extends Component{
	constructor(props){
		super(props)

		this.state = {
			chart: null,
            useDummyData:true,
			title:'Detalle Cliente',
			page:'detallecliente',
			menu:'detallecliente',
			id_useracount:props.match.params.id_user,
			uuid:props.match.params.uuid,
			overlayreferir_confirm:false,
            overlayretiro_confirm:false,
            trans_date: moment(),
            trans_date_deposito:moment(),
            selectrans_date_deposito:moment(),
            date:moment(),
            erroroneref:false,
            errortworef:false,
            erroroneret:false,
            errortworet:false,
            name:'',
            email:'',
            amount:'',
            telephone:''
		}
		this.getDataInit = this.getDataInit.bind(this)
		this.get_infoacount = this.get_infoacount.bind(this)
		this.get_transacciones = this.get_transacciones.bind(this)

		this.validate_retiro =  this.validate_retiro.bind(this)
        this.close_overlay_retiro = this.close_overlay_retiro.bind(this)
        this.close_overlayretiro_confirm = this.close_overlayretiro_confirm.bind(this)
        this.selectrans_date = this.selectrans_date.bind(this)
        this.create_retiro = this.create_retiro.bind(this)
        this.validate_deposito =  this.validate_deposito.bind(this)
        this.close_overlay_deposito = this.close_overlay_deposito.bind(this)
        this.close_overlaydeposito_confirm = this.close_overlaydeposito_confirm.bind(this)
        this.selectrans_date_deposito = this.selectrans_date_deposito.bind(this)
        this.create_deposito = this.create_deposito.bind(this)

        this.onChange = this.onChange.bind(this)

        
		
	}	
	componentDidMount() {  
		this.get_infoacount()
		this.get_transacciones()
	    this.detail()
	}
	getDataInit(chart) {
	    this.setState({ initChart: chart })	  
	}
	showerror(error){
        let message = '* Error al Enviar los datos';        
        this.setState({
            msj:message
        })     
	}
	showsucces(error){
        let message = 'Los datos se guardaron correctamente!!';        
        this.setState({
          msj:message
        })
    }
    selectrans_date(trans_date){
        this.setState({
          trans_date
        });
    }
    selectrans_date_deposito(trans_date_deposito){
        this.setState({
          trans_date_deposito
        });
    }
	updateGraphics() {
	    this.setState({
	      chart: null,
	      initChart: null
	    })
	      let json = null
	      let chart = null
	      let chartProps = null
	      let toUpdate = {
	        dummyData: {}
	      }
	  

	      setTimeout(() => {  
	     	const bearer = 'bearer '+ this.props.userToken;
		    axios.request('GUET', {
		      url:this.props.baseurl + '/v1/accounts/'+this.state.uuid+'/graphics',
		      headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
		    })
		    .then(jsonresponse => { 

	        json = jsonresponse.data.response
	         chartProps = {
	          data: json.value,
	          id: "customID",
	          dates: json.label,
	          callback: this.getDataInit
	        }               
	                  
	        toUpdate.dummyData = {
	          graphics: json
	        }
	        chart = <ChartLine {...chartProps} />
	        toUpdate.chart = chart
	        this.setState(toUpdate)
	         })  
		    .catch(error => {

		    });
	
	    }, 500)  
  	}
  	validate(){
  		setTimeout(() => {  	
		    if (this.state.nombre === null) {
				this.setState({
					nombre:'N/A'
				})
			}
			if (this.state.movil === null) {
				this.setState({
					movil:'N/A'
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
		}, 500) 
  	}
  	get_infoacount(){
  		const bearer = 'bearer '+ this.props.userToken;
	    axios.request('GET', {
	      url:this.props.baseurl + '/v1/accounts/'+this.state.uuid+'',
	      headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
	    })
	    .then(jsonresponse => { 

	    	const json = jsonresponse.data;
	    	console.log(json)
	      this.setState({
	      	able_to_withdraw:json.able_to_withdraw,
	      	account_performance:json.account_performance,
	      	balance:json.balance,
	      	total_debits:json.total_debits,
	      	total_earnings:json.total_earnings,
	      	current_performance:json.current_performance,
	      	initial_amount:json.initial_amount,
	      	user_id:json.user_id,
            code:json.code
	      })

	    })
	    .catch(error => {


	    });  

	    this.updateGraphics()
  	}
  	get_transacciones(){
	    const bearer = 'bearer '+ this.props.userToken;
	     setTimeout(() => {  
	      axios.request('GUET', {
	        url:this.props.baseurl + '/v1/accounts/'+this.state.uuid+'/transactions?page=1&per_page=10',
	        headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
	      })
	      .then(jsonresponse => { 
	       let content;

	       content = jsonresponse.data.map((lista, index) => {  
      
	          return (    
	            <tr key={index}>
    	            <td>{ (lista.code === null || lista.code === "" || lista.code === " ") ? 'N/A' : lista.code }</td>
                    <td> {lista.name_user}</td> 
                    <td> {lista.amount}</td> 
                    <td> { lista.trans_gaining === true ? "Ganada" : ""}{ lista.trans_deposit === true ? "Deposito" : ""}{ lista.trans_initial === true ? "Inicial" : ""} { lista.trans_lost === true ? "Perdida" : ""} { lista.trans_retirement === true ? "Retiro" : ""}</td>      
                    <td> { lista.trans_date } </td>
                    <td> { lista.balance } </td>
	            </tr>            
	          );
	      });
	       this.setState({
	        tabla:content
	       })

	      })  
	      .catch(error => {
	        let content = <tr>
	          <td colSpan={6}> No se encontraron registros</td>
	        </tr>
	            this.setState({
	              tabla:content
	          })
	      });
	    }, 500)  
	}
	detail(){
		const bearer = 'bearer '+ this.props.userToken;
		setTimeout(() => {  
	    axios.request('GUET', {
	      url:this.props.baseurl + '/v1/users/'+this.state.id_useracount+'',
	      headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
	    })
	    .then(jsonresponse => { 
	
	      const json = jsonresponse.data;
	      this.setState({
	      	nombre:json.firstname ,
			nombre_completo:json.firstname +' '+ json.lastname,
			
			telefono:json.telephone,
			movil:json.mobilephone,
			direccion:json.address,
			puntosforex:json.fxpoints,
			nombre_banco:json.bank_name,

			pais_banco:json.bank_country,
			numero_cuenta:json.bank_account,
			fecha_nacimiento:json.birthday,
			fecha_iniciocontrato:null,
			fecha_finalizacioncontrato:null,
			referred_by:json.referred_by,
			empresa_nombre:json.enterprise_name,
			empresa_telefono:json.enterprise_telefone,
			empresa_movil:json.enterprise_mobilephone,
			empresa_direccion:json.enterprise_address,
			count_account:''
	      })

	    })
	    .catch(error => {


	    });  
	    this.validate()
	   }, 500)
	}
	create_retiro(e){
        e.preventDefault(); 

        this.setState({
            overlayretiro_confirm:false
        }) 
        const bearer = 'bearer '+ this.props.userToken;   



        var date = this.state.trans_date;
        var trans_date = date.format('YYYY-MM-DD');
        var total_centavos = this.state.amount * 100;

        const data =  new FormData();    
        data.append('trans_date', trans_date);
        data.append('trans_initial', false);
        data.append('trans_gaining', false);
        data.append('trans_deposit', false);
        data.append('trans_retirement', true);
        data.append('trans_lost', false);

        data.append('amount', total_centavos);
        data.append('status', 'pending');


        axios({
              method: 'POST',
              url:this.props.baseurl + '/v1/transactions/'+this.state.uuid+'',
              data: data,
              headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
        })
         
        .then(jsonresponse => { 
           this.showsucces()
           this.setState({
            trans_date:moment()
           })
           this.setState({
            amount:''
           })
            
            this.props.history.push("/transaccionesretiros/")
        })  
        .catch(error => {
            this.showerror(error)
            this.setState({
             trans_date:moment()
            })
            this.setState({
             amount:''
            })
      
            this.setState({
             overlayretiro:true
            })  
        });
    }
    validate_retiro(){

        if (this.state.trans_date === '' && this.state.amount === "") {
                console.log('unos')
                this.setState({
                    erroroneret:true
                })
                this.setState({
                    errortworet:true
                }) 
                this.setState({
                    overlayretiro:true
                }) 
        }else{
            if (this.state.trans_date === '') {
                this.setState({
                    erroroneret:true
                })
                this.setState({
                    errortworet:false
                }) 


                this.setState({
                    overlayretiro:true
                }) 
            }else{
                if (this.state.amount === "") {

                    console.log('tres')
                    this.setState({
                        erroroneret:false
                    })
                    this.setState({
                        errortworet:true
                    })

                    this.setState({
                        overlayretiro:true
                    }) 

                }else{
                    this.setState({
                        erroroneret:false
                    })
                    this.setState({
                        errortworet:false
                    })
                    this.setState({
                        overlayretiro:false
                    })  


                    this.setState({
                        overlayretiro_confirm:true
                    })
                }
            }
        }
    }
    close_overlay_retiro(){
        this.setState({
            overlayretiro:false
        }) 
    }
    close_overlayretiro_confirm(){
        this.setState({
            overlayretiro_confirm:false
        })  
    }
    create_deposito(e){
        e.preventDefault(); 

        this.setState({
            overlaydeposito_confirm:false
        }) 
        const bearer = 'bearer '+ this.props.userToken;   



        var date = this.state.trans_date_deposito;
        var trans_date = date.format('YYYY-MM-DD');
        var total_centavos = this.state.amount_deposito * 100;

        const data =  new FormData();    
        data.append('trans_date', trans_date);
        data.append('trans_initial', false);
        data.append('trans_gaining', false);
        data.append('trans_deposit', true);
        data.append('trans_retirement', false);
        data.append('trans_lost', false);
        var imagefile = document.querySelector('#voucher');
        data.append("voucher", imagefile.files[0]);
        data.append('amount', total_centavos);
        data.append('status', 'pending');


        axios({
              method: 'POST',
              url:this.props.baseurl + '/v1/transactions/'+this.state.uuid+'',
              data: data,
              headers: { 'Authorization': bearer,'Content-Type': 'multipart/form-data'}
        })
         
        .then(jsonresponse => { 
           this.showsucces()
           this.setState({
            trans_date_deposito:moment()
           })
           this.setState({
            amount_deposito:''
           })
            this.props.history.push("/transaccionesdepositos/")
        })  
        .catch(error => {
            this.showerror(error)
            this.setState({
             trans_date_deposito:moment()
            })
            this.setState({
             amount_deposito:''
            })
      
            this.setState({
             overlaydeposito:true
            })  
        });
    }
    validate_deposito(){

        if (this.state.trans_date_deposito === '' && this.state.amount_deposito === "") {
                console.log('unos')
                this.setState({
                    erroronered:true
                })
                this.setState({
                    errortwored:true
                })  
              
                this.setState({
                    overlaydeposito:true
                }) 
        }else{
            if (this.state.trans_date_deposito === '') {
                this.setState({
                    erroronered:true
                })
                this.setState({
                    errortwored:false
                }) 


                this.setState({
                    overlaydeposito:true
                }) 
            }else{
                if (this.state.amount_deposito === "") {

                  
                    this.setState({
                        erroronered:false
                    })
                    this.setState({
                        errortwored:true
                    })

                    this.setState({
                        overlaydeposito:true
                    }) 

                }else{
                    this.setState({
                        erroronered:false
                    })
                    this.setState({
                        errortwored:false
                    })
                    this.setState({
                        overlaydeposito:false
                    })  


                    this.setState({
                        overlaydeposito_confirm:true
                    })
                }
            }
        }
    }
    close_overlay_deposito(){
        this.setState({
            overlaydeposito:false
        })  
    }
    close_overlaydeposito_confirm(){
        this.setState({
            overlaydeposito_confirm:false
        })  
    }
    onChange(e){
   
    	this.setState({
            [e.target.name]: e.target.value
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

        //var date = moment();
        //var trans_date = date.format('YYYY-MM-DD');

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
		const shortcuts = {
          'Today': moment(),
          'Yesterday': moment().subtract(1, 'days')
        };
		return(
			<Backend title={this.state.title} page={this.state.page} menu={this.state.menu}>			
				<div className="page-cliente-empty none-margin">
					<div className="page-info height-card ">
        		         <div className="card-user">
        		             <strong className="purple title-number">{this.state.balance}</strong>
        		              <br/>
        		              <span>Saldo actual</span>
        		         </div>
		      
		          
        		        <div className="card-detail-col">
        		          <strong className="whiteblue title-number">{this.state.total_earnings}</strong>
        		          <br/>
        		          <span>Total de ganancia</span>
        		        </div>
		        
        		        <div className="card-detail-col">
        		          <strong className="whiteblue title-number">{this.state.able_to_withdraw}</strong>
        		          <br/>
        		          <span>Total permitido a retirar</span>
        		        </div>
        		                  
        		        <div className="card-detail-col">
        		            <strong className="purple title-number">{this.state.initial_amount}</strong>
        		              <br/>
        		              <span>Saldo inicial</span>
        		        </div>
		            </div>
    		        <div className="row-card ">      
    		          <div className="card-detail-col">
    		            <span>Total débitos</span> <strong className="whiteblue">{this.state.total_debits}</strong> 
    		          </div>
    		          <div className="card-detail-col">
    		            <span>Rendimiento Historico</span> <strong className="whiteblue">{this.state.account_performance}</strong>  
    		          </div>
    		          <div className="card-detail-col">
    		             <span>Rendimiento actual</span> <strong className="purple">{this.state.current_performance}</strong>  
    		          </div>
    		        </div>
		        	<br/>
					<div className="border-bottom side-margins border-chart margin50">
		                <h3>Bar Chart Using Chartist Library</h3>
		                <div className="chart-container">
		               		 {this.state.chart} 
		                </div> 
		            </div>		           
		            <br/>
					<br/>
					<br/>
					<br/>
					<br/>
		            <div className="generate-data margin50">
		            <h2 className="display-block">Transacciones de clientes</h2>
						<ul className="aling-left">
							<li>
								<a href="#Deposito_admin">AGREGAR DEPOSITO</a>
							</li>
							<li>
								<a href="#Retiros_admin">AGREGAR RETIRO</a>
							</li>
                            <li>
                                <NavLink to={'/perfiladmin/'+this.state.uuid+'/'+this.state.id_useracount+''}>VER PERFIL</NavLink>
                            </li>
						</ul>
					</div>
					<br/>
					<div className="page-cliente-empty-content margin50">
						<div className="table-content table-responsive">
							<table>
								<thead>
								  <tr>
					                <td> Cuenta </td>
                                    <td> Nombre </td>
                                    <td> Monto </td>
                                    <td> Tipo de transacción </td>
                                    <td> Finalización de Contrato </td>
                                    <td> Balance </td>
					              </tr>
								</thead>
								<tbody>
									{this.state.tabla}
									<tr>
						                <td colSpan={6}>
						                  <NavLink to={'/perfiladmin/'+this.state.uuid+'/'+this.state.id_useracount+''}>Ver mas Transacciones</NavLink>
						                </td>
						            </tr>
								</tbody>
							</table>
						</div>
					</div>
				
				</div>

				<div id="Retiros_admin" className={`overlay ${this.state.overlayretiro === true ? "overlay_visible" : ""}`}>
                    <div className="popup">
                        <div className="popup-title">
                            <h4>Generar Retiro</h4> <hr/> <a className="close" href={null} onClick={this.close_overlay_retiro}>x</a>
                            
                        </div>
                        <div className="popup-body">
                            <div className="popup-retiro">
                                <p>Usted esta genarando un retiro de la cuenta {this.state.code}</p>
                                <div className="form-group">
                                    <br/>
                                </div>                                
                                <div className="form-group">
                                    <DatetimePickerTrigger
                                      disabled={true}
                                      shortcuts={shortcuts} 
                                      moment={this.state.trans_date}
                                      onChange={this.selectrans_date}>
                                      <input type="text" value={this.state.trans_date.format('YYYY-MM-DD')} readOnly />
                                    </DatetimePickerTrigger>
                                </div>
                                <div className="form-group">

                                    <NumberFormat placeholder="Cantidad a Retirar" className={`form-control ${this.state.errortworet === true ? "error" : ""}`} value={this.state.amount} thousandSeparator={true} prefix={'$'} decimalSeparator={'.'} decimalScale={2} onValueChange={(values) => {
                                       const {value} = values;
                                        //const {formattedValue, value} = values;
                                        // formattedValue = $2,223
                                        // value ie, 2223
                                        this.setState({amount: value})
                                      }}/>
                                </div>
                                <div className="form-group msj">
                                        {this.state.msj}
                                    </div>
                                <div className="form-group">
                                    <br/>
                                </div>
                                <div className="form-group section-btn">                            
                                    <a className="blue btn" href={null} onClick={this.validate_retiro}> Aceptar</a>
                                </div>
                                <div className="form-group">
                                    <br/>
                                </div>
                            </div>
                        </div>                                      
                    </div>
                </div>
                <div id="addretiroconfirm" className={`overlay ${this.state.overlayretiro_confirm === true ? "overlay_visible" : ""}`}>
                    <div className="popup">
                        <div className="popup-title">
                            <h4>Confirmación </h4>  
                            
                        </div>
                        <div className="popup-body">
                            <p>
                                ¿Esta seguro que desea aplicar la transacción ?
                            </p>
                            <div className="popup-retiro">
                                <div className="form-group section-btn">
                                    <a className="close blue btn" href={null} onClick={this.close_overlayretiro_confirm}>CANCELAR</a> <a className="blue btn" href={null} onClick={e => {this.create_retiro(e)}} > ACEPTAR</a>
                                </div>
                            </div>                    
                        </div>                                      
                    </div>
                </div>

                <div id="Deposito_admin" className={`overlay ${this.state.overlaydeposito === true ? "overlay_visible" : ""}`}>
                        <div className="popup">
                            <div className="popup-title">
                                <h4>Generar aumento de Capital</h4> <hr/> <a className="close" href={null} onClick={this.close_overlay_deposito}>x</a>
                                
                            </div>
                            <div className="popup-body">
                                <div className="popup-retiro">
                                    <p>Usted esta abonando a la cuenta {this.state.code}</p>
                                    <div className="form-group">
                                        <br/>
                                    </div>
                                    
                                    <div className="form-group">
                                        <DatetimePickerTrigger
                                         disabled={true}
                                          shortcuts={shortcuts} 
                                          moment={this.state.trans_date_deposito}
                                          onChange={this.selectrans_date_deposito}>
                                          <input type="text" value={this.state.trans_date_deposito.format('YYYY-MM-DD')} readOnly />
                                        </DatetimePickerTrigger>
                                    </div>
                                    <div className="form-group">
                                        
                                         <NumberFormat placeholder="Cantidad a depositar" className={`form-control ${this.state.errortwored === true ? "error" : ""}`} value={this.state.amount_deposito} thousandSeparator={true} prefix={'$'} decimalSeparator={'.'} decimalScale={2} onValueChange={(values) => {
                                            const {value} = values;
                                            // const {formattedValue, value} = values;
                                            // formattedValue = $2,223
                                            // value ie, 2223
                                            this.setState({amount_deposito: value})
                                          }}/>
                                    </div>
                                    <div className="form-group">
                                        <input className="custom-file-input" type="file" name="voucher" id="voucher" onChange={this.onChange}/>
                                    </div>
                                    <div className="form-group msj">
                                            {this.state.msj}
                                        </div>
                                    <div className="form-group">
                                        <br/>
                                    </div>
                                    <div className="form-group section-btn">
                                
                                        <a className="blue btn" href={null} onClick={this.validate_deposito}> Aceptar</a>
                                    </div>
                                    <div className="form-group">
                                        <br/>
                                    </div>
                                </div>
                            </div>                                      
                        </div>
                </div>
                <div id="addretiroconfirm" className={`overlay ${this.state.overlaydeposito_confirm === true ? "overlay_visible" : ""}`}>
                    <div className="popup">
                        <div className="popup-title">
                            <h4>Confirmación </h4>  
                            
                        </div>
                        <div className="popup-body">
                            <p>
                                ¿Esta seguro que desea aplicar la transacción ?
                            </p>
                            <div className="popup-retiro">
                                <div className="form-group section-btn">
                                    <a className="close blue btn" href={null} onClick={this.close_overlaydeposito_confirm}>CANCELAR</a> <a className="blue btn" href={null} onClick={e => {this.create_deposito(e)}} > ACEPTAR</a>
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
    baseurl:state.mainReducer.setBaseUrl.baseurl
  }
}

export default withRouter(connect(mapStateToProps)(Detallecliente))
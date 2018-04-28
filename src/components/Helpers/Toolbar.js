import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import Navigation from './Navigation';
import axios from 'axios'
import moment from 'moment';
import {DatetimePickerTrigger} from 'rc-datetime-picker';
import * as NumberFormat from 'react-number-format';
import { NavLink } from 'react-router-dom';
class Topmenu extends Component {
    constructor(props){
        super(props)
        this.state= {
            stado:''
        }
        

    }
    toggleActionsBodyClass() {
        document.body.classList.toggle('toolbar-actions-open');
    }

   
  render() {
    return(
        <ul className="top">
            <li>
                <a onClick={this.toggleActionsBodyClass.bind(this)}>
                    <i className="md-icon">add</i>          
                </a>
            </li>

            {/*<li>
                <a  onClick={this.toggleSearchBodyClass.bind(this)}>
                    <i className="md-icon">search</i>
                </a>
            </li>*/}
        </ul>
    )
  }
}

class Bootommenuuser extends Component {
  /*logout(){
    const scope = this.props.scope;
    const obj = {
            authorize:null,
            token: null,
            scope:null,
            email:null,
            id:null,
            register:null,
            type:null,
            infouser:null
            
          }
          this.props.dispatch(actions.setAuth(obj))
          if ( scope === 'admin') {
            this.props.history.push("/log-admin")
          }
          if ( scope === 'user') {
            this.props.history.push("/log-user")
          }
          
  }*/
  render() {
    return(
        <ul className="bottom">
            
           
            {/*<li>
                <NavLink to="/cuenta">
                    <i className="md-icon">settings</i>
                </NavLink>
            </li>
             <li>
                <NavLink to="/login">
                    <i className="md-icon">perm_identity</i>
                </NavLink>
            </li>*/}
            {/*<li>
                <a href="/logout">
                    <i className="md-icon">power_settings_new</i>
                </a>
            </li>*/}
        </ul>
    )
  }
}

class Bootommenuadmin extends Component {
   render() {
    return(
        <ul className="bottom">
            
            
            <li>
                <NavLink to="/cuenta">
                    <i className="md-icon">settings</i>
                </NavLink>
            </li>
            {/*
            <li>
                <NavLink to="/login">
                    <i className="md-icon">perm_identity</i>
                </NavLink>
            </li>*/}

            {/*<li>
                <a href="/logout">
                    <i className="md-icon">power_settings_new</i>
                </a>
            </li>*/}
        </ul>
    )
  }
}
class Toolbar extends Component {
    constructor(props){
        super(props)
        this.state = {
            estado:'',
            erroroneref:false,
            errortworef:false,
            erroroneret:false,
            errortworet:false,
            name:'',
            email:'',
            amount:'',
            telephone:'',
            overlayreferir_confirm:false,
            overlayretiro_confirm:false,
            trans_date: moment(),
            trans_date_deposito:moment(),
            selectrans_date_deposito:moment(),
            date:moment(),
        }
        this.onChange  = this.onChange.bind(this)
        this.set_topmenu    = this.set_topmenu.bind(this)
        this.set_bootommenu = this.set_bootommenu.bind(this)

        this.validate_referir =  this.validate_referir.bind(this)
        this.close_overlay_referir = this.close_overlay_referir.bind(this)


        this.validate_retirement =  this.validate_retirement.bind(this)
        this.close_overlay_retirement = this.close_overlay_retirement.bind(this)
        this.close_overlay_retirement_confirm = this.close_overlay_retirement_confirm.bind(this)
        this.selectrans_date = this.selectrans_date.bind(this)
        this.create_retirement = this.create_retirement.bind(this)


        this.validate_deposit =  this.validate_deposit.bind(this)
        this.close_overlay_deposit = this.close_overlay_deposit.bind(this)
        this.close_overlay_deposit_confirm = this.close_overlay_deposit_confirm.bind(this)
        this.selectrans_date_deposito = this.selectrans_date_deposito.bind(this)
        this.create_deposit = this.create_deposit.bind(this)

        this.selec_date = this.selec_date.bind(this)

        this.create_pip = this.create_pip.bind(this)


        this.handleChange = this.handleChange.bind(this);

    }
    
    componentDidMount(){
        this.set_topmenu()
        this.set_bootommenu()
        console.log(this.props)
    }
    
    create_pip(e){

        e.preventDefault();   
        const bearer = 'bearer '+ this.props.userToken;   



        var pip_date = this.state.date;
        var date = pip_date.format('YYYY-MM-DD');


        const data =  new FormData();    
        data.append('date', date);
        data.append('pip', this.state.pip);



        axios({
              method: 'POST',
              url:'https://rupert-x.herokuapp.com/dashboard/v1/pips',
              data: data,
              headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
        })
         
        .then(jsonresponse => { 
           this.showsucces()
  
       
        })  
        .catch(error => {
            this.showerror(error)
     
        });
    }
    set_topmenu(){
        const scope = this.props.scope;

        switch(scope) {
            case 'user':
              return <Topmenu />
            case 'admin':
              return ''
            case 'moderador':
              return''
            default:
                /* code */
              break;
        }
    }
    set_bootommenu(){
        const scope = this.props.scope;

        
        switch(scope) {
            case 'user':
              return <Bootommenuuser />
            case 'admin':
              return <Bootommenuadmin />
            case 'moderador':
              return <Bootommenuadmin />
            default:
            /* code */
            break;
        }
    }
    toggleActionsBodyClass() {
        document.body.classList.toggle('toolbar-actions-open');
    }
      toggleSearchBodyClass() {
        document.body.classList.toggle('toolbar-search-open');
    }  
    onChange(e){
        switch(e.target.value) {
            case 'bonus_money':
                if (e.target.value === 'bonus_money') {
                    this.setState({
                        bonus_money: true
                    });
                    this.setState({
                        bonus_account: false
                    });
                }
            break; 
            case 'bonus_account':
                if (e.target.value === 'bonus_account') {
                    this.setState({
                        bonus_account: true
                    });
                    this.setState({
                        bonus_money: false
                    });
                } 
            break; 
            default:
            /* code */
            break; 
        }
 
        switch(e.target.name) {
        case 'amount_deposito':  
            
            if (e.target.name === 'amount_deposito') {

              const re = /^[0-9]+(.[0-9]{0,2})?$/;
              const expre = re.test(e.target.value);
              
              if (e.target.value === '' || expre === true) {
        
                this.setState({
                    amount_deposito:e.target.value
                })        
              }
            }else{
         
                this.setState({
                    amount_deposito:this.state.amount_deposito
                })
            }
        break;     
        default :

            if (e.target.name !== 'amount_deposito') {
                this.setState({
                    [e.target.name]: e.target.value
                });
            }else{
                this.setState({
                    [e.target.name]: this.state[e.target.name]
                });
            }
        break; 
            
        } 
      }     
    create_referir(e){
      e.preventDefault(); 

      this.setState({
        overlayreferir_confirm:false
      }) 
      const bearer = 'bearer '+ this.props.userToken;   
      const data =  new FormData();  
      data.append('email', this.state.email);    
      data.append('name', this.state.name);
      data.append('telephone', this.state.telephone);
      data.append('bonus_money', this.state.bonus_money);
      
      
      data.append('bonus_account', this.state.bonus_account);


        axios({
          method: 'POST',
          url:'https://rupert-x.herokuapp.com/dashboard/v1/user_referrals',
          data: data,
          headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
        })
     
      .then(jsonresponse => { 
       this.showsucces()
       this.setState({
        name:''
       })
       this.setState({
        email:''
       })
       this.setState({
        telephone:''
       })
      })  
      .catch(error => {
        this.showerror(error)
        this.setState({
         name:''
        })
        this.setState({
         email:''
        })
        this.setState({
         telephone:''
        })
        this.setState({
         overlayreferir:true
        })  
      });
    }    
    validate_referir(){

        if (this.state.name === '' && this.state.email === "" && this.state.telephone === "") {
  
            this.setState({
                    erroroneref:true
                })
                this.setState({
                    errortworef:true
                })  
                 this.setState({
                    errorthreref:true
                }) 
                

                this.setState({
                    overlayreferir:true
                }) 
        }else{
            if (this.state.name === '') {
                this.setState({
                    erroroneref:true
                })
                this.setState({
                    errortworef:false
                }) 
                this.setState({
                    errorthreref:false
                }) 
                this.setState({
                    overlayreferir:true
                }) 
            }else{
                if (this.state.email === "") {
                        this.setState({
                            erroroneref:false
                        })
                        this.setState({
                            errortworef:true
                        })

                        this.setState({
                            errorthreref:false
                        }) 

                        this.setState({
                            overlayreferir:true
                        }) 

                    }else{

                    if (this.state.telephone === "") {

                         this.setState({
                            errorthreref:true
                        }) 

                        this.setState({
                            erroroneref:false
                        })
                        this.setState({
                            errortworef:false
                        })

                        this.setState({
                            overlayreferir:true
                        }) 

                    }else{
                        this.setState({
                            erroroneref:false
                        })
                        this.setState({
                            errortworef:false
                        })
                        this.setState({
                            overlayreferir:false
                        })  

                         this.setState({
                            errorthreref:false
                        })  

                        this.setState({
                            overlayreferir_confirm:true
                        })
                    }      
                }
            }
        }
    }
    close_overlay_referir(){
        this.setState({
            overlayreferir:false
        })  
    }
    close_overlayreferir_confirm(){
        this.setState({
            overlayreferir_confirm:false
        })  
    }
    showsucces(){
        let message = 'Los datos se guardaron correctamente!!';        
        this.setState({
          msj:message
        })
    }
    showerror(error){
        let message = '* Error al enviar los datos';        
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
    create_retirement(e){
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
              url:this.props.baseurl + '/v1/user_accounts/'+this.props.info_cuenta['uuid']+'/transactions',
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

           this.props.history.push("/transaccionesretirosuser/")
       
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
    validate_retirement(){

        if (this.state.trans_date === '' && this.state.amount === "") {
       
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
    close_overlay_retirement(){
        this.setState({
            overlayretiro:false
        }) 
    }
    close_overlay_retirement_confirm(){
        this.setState({
            overlayretiro_confirm:false
        })  
    }
    create_deposit(e){
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

        //var imagefile = document.querySelector('#voucher');
        data.append("voucher", this.state.voucher);


        //data.append('voucher', this.state.voucher);
        data.append('amount', total_centavos);
        data.append('status', 'pending');


        axios({
          method: 'POST',
          url:'https://rupert-x.herokuapp.com/dashboard/v1/user_accounts/'+this.props.info_cuenta['uuid']+'/transactions',
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

           this.props.history.push("/transaccionesdepositosuser/")       
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
    handleChange(selectorFiles: FileList) {
      this.setState({
        voucher:selectorFiles[0]
      })
    }
    validate_deposit(){

        if (this.state.trans_date_deposito === '' && this.state.amount_deposito === "") {
             
             
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
    close_overlay_deposit(){
        this.setState({
            overlaydeposito:false
        })  
    }    
    close_overlay_deposit_confirm(){
        this.setState({
            overlaydeposito_confirm:false
        })  
    }
    selec_date(date){
        this.setState({
          date
        });
    }
   

    render() {
        const shortcuts = {
          'Today': moment(),
          'Yesterday': moment().subtract(1, 'days')
        };
        return (
            <div className="toolbar">
                <div className="toolbar-inner">
                    <div className="logo">
                        <img src="/img/logo.png" alt="" />
                    </div>

                    {this.set_topmenu()}

                    <Navigation />

                    {this.set_bootommenu()}
                    

                    <div className="toolbar-search">
                        <div className="toolbar-slide-overlay" />

                        <div className="toolbar-slide-inner">
                            <div className="toolbar-slide-close" onClick={this.toggleSearchBodyClass.bind(this)}>
                                <i className="md-icon">close</i>
                            </div>

                            <div className="toolbar-slide-content">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Type to search site" />
                                </div>

                                <div className="toolbar-slide-results">
                                    <div className="toolbar-slide-result">
                                        <span>Project</span>
                                        <strong>Knowledge Base</strong>
                                    </div>

                                    <div className="toolbar-slide-result">
                                        <span>Member</span>
                                        <strong>David H. Cherry</strong>
                                    </div>

                                    <div className="toolbar-slide-result">
                                        <span>Member</span>
                                        <strong>Nathanael J. Barrett</strong>
                                    </div>

                                    <div className="toolbar-slide-result">
                                        <span>Project</span>
                                        <strong>Internal Tools</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="toolbar-actions">
                        <div className="toolbar-slide-overlay" onClick={this.toggleActionsBodyClass.bind(this)} />

                        <div className="toolbar-slide-inner" onClick={this.toggleActionsBodyClass.bind(this)}>
                            <div className="toolbar-slide-close" onClick={this.toggleActionsBodyClass.bind(this)}>
                                <i className="md-icon">close</i>
                            </div>

                            <div className="toolbar-slide-content">
                                <ul>
                                    {/*<li>
                                        <a href="/tareasgenerales">
                                            <i className="md-icon">folder_open</i> <span>Tareas</span>
                                        </a>
                                    </li>*/}
                                    <li>
                                        <a href="#Soporte">
                                            <i className="md-icon">laptop_mac</i> <span>Soporte</span>
                                        </a>
                                    </li>
                                   <li>
                                        <NavLink to="/faq">
                                            <i className="md-icon">help</i>  <span>FAQ</span>
                                        </NavLink>
                                   </li>
                               
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id="pips" className="overlay">
                        <div className="popup">
                            <div className="popup-title">
                                <h4>Generar pips </h4> <hr/> <a className="close" href="">x</a>
                                
                            </div>
                            <div className="popup-body">
                            <form className="border-radius-bottom border-0top" onSubmit={this.create_pip}>
                                <div className="popup-deposito">
                                    <div className="form-group">
                                        <br/>
                                    </div>
                                    <div className="form-group">
                                        <DatetimePickerTrigger
                                          shortcuts={shortcuts} 
                                          closeOnSelectDay ={true}
                                          moment={this.state.date}
                                          onChange={this.selec_date}>
                                          <input type="text" value={this.state.date.format('YYYY-MM-DD')} readOnly />
                                        </DatetimePickerTrigger>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="pip" name="pip" placeholder="Agregar nuevo PIPs" onChange={this.onChange} />
                                    </div>
                                     <div className="form-group msj">
                                            {this.state.msj}
                                        </div>
                                    <div className="form-group">
                                        <br/>
                                    </div>
                                    <div className="form-group section-btn">
                                        <button type="submit" className="blue btn" href=""> ACEPTAR</button>
                                    </div>
                                    <div className="form-group">
                                        <br/>
                                    </div>
                                </div>
                            </form>
                            </div>                                      
                        </div>
                    </div> 
                    <div id="Retiro" className={`overlay ${this.state.overlayretiro === true ? "overlay_visible" : ""}`}>
                        <div className="popup">
                            <div className="popup-title">
                                <h4>Generar Retiro</h4> <hr/> <a role="button" className="close" href={null} onClick={this.close_overlay_retirement}>x</a>                                
                            </div>
                            <div className="popup-body">
                                <div className="popup-retiro">
                                    <p>Usted esta genarando un retiro de la cuenta  {this.props.scope === 'admin' ? "" : this.props.info_cuenta['code']}</p>
                                    <div className="form-group">
                                        <br/>
                                    </div>                                    
                                    <div className="form-group">
                                        <DatetimePickerTrigger
                                          disabled={true}
                                          shortcuts={shortcuts} 
                                          closeOnSelectDay ={true}
                                          moment={this.state.trans_date}
                                          onChange={this.selectrans_date}>
                                          <input type="text" value={this.state.trans_date.format('YYYY-MM-DD')} readOnly />
                                        </DatetimePickerTrigger>
                                    </div>
                                    <div className="form-group">
                                       
                                         <NumberFormat placeholder="Cantidad a retirar" className={`form-control ${this.state.errortwored === true ? "error" : ""}`} value={this.state.amount} thousandSeparator={true} prefix={'$'} decimalSeparator={'.'} decimalScale={2} onValueChange={(values) => {
                                            const { value} = values;
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
                                
                                        <a className="blue btn" href={null} role="button"  onClick={this.validate_retirement}> Aceptar</a>
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
                                        <a className="close blue btn" href={null} role="button" onClick={this.close_overlay_retirement_confirm}>CANCELAR</a> <a className="blue btn" href={null} role="button"  onClick={e => {this.create_retirement(e)}} > ACEPTAR</a>
                                    </div>
                                </div>                        
                            </div>                                      
                        </div>
                    </div>
                    <div id="Deposito" className={`overlay ${this.state.overlaydeposito === true ? "overlay_visible" : ""}`}>
                        <div className="popup">
                            <div className="popup-title">
                                <h4>Generar aumento de Capital</h4> <hr/> <a className="close" href={null} role="button" onClick={this.close_overlay_deposit}>x</a>                               
                            </div>
                            <div className="popup-body">
                                <div className="popup-retiro">
                                 <p>Usted esta abonando a la cuenta {this.props.scope === 'admin' ? "" : this.props.info_cuenta['code']}</p>
                                    <div className="form-group">
                                        <br/>
                                    </div>                                    
                                    <div className="form-group">
                                        <DatetimePickerTrigger
                                          disabled={true}
                                          shortcuts={shortcuts} 
                                          closeOnSelectDay ={true}
                                          moment={this.state.trans_date_deposito}
                                          onChange={this.selectrans_date_deposito}>
                                          <input type="text" value={this.state.trans_date_deposito.format('YYYY-MM-DD')} readOnly />
                                        </DatetimePickerTrigger>
                                    </div>
                                    <div className="form-group">                                 
                                        <NumberFormat placeholder="Cantidad a depositar" className={`form-control ${this.state.errortwored === true ? "error" : ""}`} value={this.state.amount_deposito} thousandSeparator={true} prefix={'$'} decimalSeparator={'.'} decimalScale={2} onValueChange={(values) => {
                                            const { value} = values;
                                            // formattedValue = $2,223
                                            // value ie, 2223
                                            this.setState({amount_deposito: value})
                                          }}/>
                                    </div>
                                    <div className="form-group">
                                        <br/>
                                        <span>Comprobante de deposito</span>
                                        <br/>
                                    </div>
                                    <div className="form-group hcht40">  
                                      <input type="file" className="custom-file-input"  id="voucher" name="voucher" required  onChange={ (e) => this.handleChange(e.target.files) }  />
                                    </div>
                                    <div className="form-group msj">
                                            {this.state.msj}
                                        </div>
                                    <div className="form-group">
                                        <br/>
                                    </div>
                                    <div className="form-group section-btn">
                                
                                        <a className="blue btn" href={null} role="button"  onClick={this.validate_deposit}> Aceptar</a>
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
                                        <a className="close blue btn" href={null} role="button" onClick={this.close_overlay_deposit_confirm}>CANCELAR</a> <a className="blue btn" href="" onClick={e => {this.create_deposit(e)}} > ACEPTAR</a>
                                    </div>
                                </div>                        
                            </div>                                      
                        </div>
                    </div>
                    <div id="Referir" className={`overlay ${this.state.overlayreferir === true ? "overlay_visible" : ""}`} >
                        <div className="popup">
                            <div className="popup-title">
                                <h4>Referir nuevo usuario</h4> <hr/> <a className="close" href={null} role="button" onClick={this.close_overlay_referir}>x</a>
                                
                            </div>
                            <div className="popup-body">
                              
                                <div className="popup-retiro">
                                    <div className="form-group">
                                        <br/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className={`form-control ${this.state.erroroneref === true ? "error" : ""}`} id="name" name="name" value={this.state.name} placeholder="Nombre completo" required onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className={`form-control ${this.state.errortworef === true ? "error" : ""}`} id="email" name="email" value={this.state.email} placeholder="Correo Electronico" required onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className={`form-control ${this.state.errorthreref === true ? "error" : ""}`} id="telephone" name="telephone" value={this.state.telephone} placeholder="Telefono" required onChange={this.onChange} />
                                    </div>
                                    <br/>
                                    <div className="register--form-wrapper">                         
                                        {/*<input type="radio"  name="bonus" value="bonus_money"  onChange={this.onChange} required />
                                        <label className="register--label d-inline-block" htmlFor="gender_male">Bono en efectivo</label>*/}

                                        <div className="pretty p-default p-round">
                                            <input type="radio"  name="bonus" value="bonus_money"  onChange={this.onChange} required  />
                                            <div className="state">
                                                <label>Bono en efectivo</label>
                                            </div>
                                        </div>
                                       {/*} <input type="radio"  name="bonus" value="bonus_account"  onChange={this.onChange} required />
                                        <label className="register--label d-inline-block" htmlFor="gender_female">Bono en cuenta</label>*/}
                                        <div className="pretty p-default p-round">
                                            <input type="radio"  name="bonus" value="bonus_account"  onChange={this.onChange} required/>
                                            <div className="state">
                                                <label>Bono en cuenta</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group msj">
                                        {this.state.msj}
                                    </div>
                                    <div className="form-group">
                                        <br/>
                                    </div>
                                    <div className="form-group section-btn">
                                        <a className="blue btn" href={null} onClick={this.validate_referir}> Aceptar</a>
                                    </div>
                                </div>
                              
                            </div>                                      
                        </div>
                    </div>

                    
                     <div id="changuepass" className={`overlay ${this.state.overlayreferir_confirm === true ? "overlay_visible" : ""}`}>
                        <div className="popup">
                            <div className="popup-title">
                                <h4>Confirmación </h4>  
                                
                            </div>
                            <div className="popup-body">
                                    <p>
                                        ¿Esta seguro que desea referir a  {this.state.name} ?
                                    </p>
                                    <div className="popup-retiro">
                                        <div className="form-group section-btn">
                                            <a role="button" className="close blue btn" href={null} onClick={this.close_overlay}>CANCELAR</a> <a className="blue btn" href="" onClick={e => {this.create_referir(e)}} > ACEPTAR</a>
                                        </div>
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
    info_cuenta: state.mainReducer.auth.info_cuenta,
    baseurl:state.mainReducer.setBaseUrl.baseurl
  }
}

export default withRouter(connect(mapStateToProps)(Toolbar))

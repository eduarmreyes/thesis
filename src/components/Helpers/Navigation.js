import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from "axios"
import actions from "../../actions"
import * as NumberFormat from 'react-number-format';
import moment from 'moment';

class NavigationUser extends Component {
  render() {
    return(
    /*Componente que se ejecutara cuando no encuentre un comonente al cual redireccionar*/
      <ul>
        <li>
          <NavLink to="/project-new" exact={true} activeClassName="active">
            <i className="md-icon">home</i> <span>Crear Proyecto</span>
          </NavLink>
        </li>
        <li>
            <NavLink to="/dashboard" exact={true} activeClassName="active">
                 <i className="md-icon">home</i> <span>Inicio</span>
            </NavLink>
        </li>     
         <li>
            <NavLink to="/transaccionesgeneralesuser" activeClassName="active">
                <i className="md-icon">timeline</i> <span>Indicadores</span>
            </NavLink>
        </li>
        <li>
            <NavLink to="/perfil" activeClassName="active">
                <i className="md-icon">person</i> <span>Perfil</span>
            </NavLink>            
        </li>  
        <li>
            <a href="#Retiro" >
                <i className="md-icon">attach_money</i> <span>Retiros</span>
            </a>
           
        </li> 
        <li>
            <a  href="#Deposito" >
                <i className="md-icon">trending_up</i> <span>Aumento a Capital</span>
            </a>            
        </li>                
    </ul>
    )
  }
}
class NavigationAdmin extends Component {
  render() {
    return(
      /*Componente que se ejecutara cuando no encuentre un comonente al cual redireccionar*/
      <ul>
        <li>
          <NavLink to="/project-new" exact={true} className="highlighted" activeClassName="active">
            <i className="md-icon">add</i> <span>Crear Proyecto</span>
          </NavLink>
        </li>
        <li>
            <NavLink to="/dashboard" exact={true} activeClassName="active">
                 <i className="md-icon">home</i> <span>Inicio</span>
            </NavLink>
        </li>

        <li>
            <NavLink to="/clientes" activeClassName="active">
                <i className="md-icon">person</i> <span>Perfil de administrador</span>
            </NavLink>
        </li>
        <li>
          <NavLink to="/transaccionesgenerales" activeClassName="active">
            <i className="md-icon">trending_up</i> <span>Indicadores</span>
          </NavLink>
        </li>
        <li>
            <NavLink to="/tareasgenerales" activeClassName="active">
                <i className="md-icon">format_list_bulleted</i> <span>Proyectos</span>
            </NavLink>
        </li>
        <li>
            <NavLink to="/usuariosgenerales" activeClassName="active">
              <i className="md-icon">people</i> <span>Usuarios</span>
            </NavLink>
        </li>
      </ul>
    );
  }
}
class Navigationmoderardor extends Component {
  render() {
    return(
    /*Componente que se ejecutara cuando no encuentre un comonente al cual redireccionar*/
      <ul>
        <li>
            <NavLink to="/dashboard" exact={true} activeClassName="active">
                 <i className="md-icon">home</i> <span>Inicio</span>
            </NavLink>
        </li>                   
    </ul>
    )
  }
}
class Navigation extends Component {
    constructor(props){
        super(props)

        this.state = {
            sidebar_user:'',
            sidebar_admin:'',
            sidebar_moderador:'',
            counts:false,
            overlay_new_acount:false,
            initial_amount:'',
            origin_of_funds:'',  
            voucher:'',
            bank_deposit:'',   
            transfer_format:'',
            tc:'',
            error_form_count:0 ,
            acept_terms:true    
        }
        this.showcounts = this.showcounts.bind(this)
        this.select_acount = this.select_acount.bind(this)
        this.overlay_new_acount_confirm = this.overlay_new_acount_confirm.bind(this)        
        this.create_acount = this.create_acount.bind(this)
        this.show_overlay_new_acount = this.show_overlay_new_acount.bind(this)
        this.validate_new_acount = this.validate_new_acount.bind(this)
        this.onChange = this.onChange.bind(this)
        this.create_deposito = this.create_deposito.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }
    set_navigation(){
      const scope = this.props.scope;
      switch(scope) {
          case 'user':
            return <NavigationUser />
          case 'admin':
            return <NavigationAdmin />
          case 'moderador':
            return <NavigationAdmin />
      }
    }
    showcounts(){ 
      this.setState({
          counts:!this.state.counts
      })
    }
    componentDidMount(){
      if (this.props.scope === "user") {
          
          this.select_acount()

      }
    }
    handleChange(selectorFiles: FileList) {
      this.setState({
        voucher:selectorFiles[0]
      })
    }
    select(e,uuid){
      const bearer = 'bearer '+ this.props.userToken;
      axios.request('get', {
        url:this.props.baseurl + '/v1/user_accounts/'+uuid+'',
        headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
      })
      .then(jsonresponse => { 
        const data = jsonresponse.data

        const obj = {
            authorize:this.props.authorize,
            token: this.props.userToken,
            scope:this.props.scope,
            email:this.props.email,
            id:this.props.id,
            register:this.props.register,
            type:this.props.type,
            infouser:this.props.infouser,
            info_cuenta:data,
            info_cuenta_pfx:this.props.info_cuenta_pfx 

          }

          this.props.dispatch(actions.setAuth(obj))
          this.props.history.push("/loading")

      })  
      .catch(error => {

      });
    }   
    select_acount(){        
      if (this.props.scope === 'user') {
        const bearer = 'bearer '+ this.props.userToken;
        setTimeout(() => { 
          axios.request('get', {
            url:this.props.baseurl + '/v1/user_accounts?page=1&per_page=100',
            headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
          })
          .then(jsonresponse => {  
            if (jsonresponse.data.lenght === 0) {
              let content = <a  href="#">No se encontro uan cuenta</a>
              this.setState({
                codeacount:content
              })       
            }else{
              const data = jsonresponse.data
                let content;
                content = jsonresponse.data.map((lista, index) => {                          
                return (        
                  <a className={` ${lista.uuid == this.props.infocuenta['uuid'] ? "active" : "" }`}  onClick={ e => { lista.code == null ? "" : this.select(e,lista.uuid)}} key={index} href="#">{lista.code == null ? "Cuenta por aprobar" : lista.code}</a>
                );
              });
              this.setState({
                codeacount:content
              })  
            }                    
          })  
          .catch(error => {
          }); 
        },0)
      }
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
    create_acount(e){
        e.preventDefault(); 
        const bearer = 'bearer '+ this.props.userToken; 

        var date = moment();
        var trans_date = date.format('YYYY-MM-DD');

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
    onChange(e){
      this.setState({
          [e.target.name]: e.target.value
      });
      if (e.target.name == 'tc') {
           console.log(this.refs.check_me.checked);
           this.setState({
              tc:this.refs.check_me.checked,
              acept_terms:this.refs.check_me.checked
           })

      }       
    }
    showerror(error){      
      let message = '* Error al guadar los datos!';        
      this.setState({
        msj:message
      })  
    }
    showsucces(){
        let message = 'Los datos se guardaron correctamente!!';        
        this.setState({
          msj:message
        })
    }
    render() {
        return(
            <div className="navigation">
                <div className={`dropdown ${this.props.scope === "user" ? "" : "display-none "}`} >
                  <button className="dropbtn"  onClick={this.showcounts}><i className="md-icon">loop</i> <span>Cuenta </span></button>
                  <div className={`dropdown-content ${this.state.counts === true ? " dropdown-content-show" : ""}`} >
                    {this.state.codeacount}
                    <a className="add-acount"  href="#newacount" onClick={this.show_overlay_new_acount}><i className="md-icon">playlist_add</i> Agregar nueva cuenta.</a>
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
                                                <input type="checkbox" id="tc"   name="tc" onChange={this.onChange}  ref="check_me"  defaultChecked="true" />
                                                <div className="state">
                                                    <label></label>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <span>
                                                    Acepto los <a target='_blank' rel='noopener noreferrer' href="/terms"> Terminos y Condiciones </a> que conlleva el sistema de referido de UEES.
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
                                    <a className={`blue btn ${this.state.acept_terms === true ? "" : "display-none"}`} href="#"  onClick={this.validate_new_acount}> Aceptar</a>
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
                {this.set_navigation()} 
                {/*<strong>Additional Links</strong>
                <ul className="bottom-ul">
                    <li>
                        <NavLink to="/usuariosgenerales" activeClassName="active">
                            <i className="md-icon">people</i> <span>Usuarios</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cuenta" activeClassName="active">
                            <i className="md-icon">settings</i> <span>Configuracion</span>
                        </NavLink>
                    </li>
                </ul>*/}
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
    infocuenta: state.mainReducer.auth.info_cuenta,
    baseurl:state.mainReducer.setBaseUrl.baseurl,
    info_cuenta_pfx:state.mainReducer.auth.info_cuenta_pfx
  }
}

export default withRouter(connect(mapStateToProps)(Navigation))
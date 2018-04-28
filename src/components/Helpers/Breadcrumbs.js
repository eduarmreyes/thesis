import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import actions from "../../actions"
import axios from 'axios';

class Breadcrumbs extends Component {
  constructor(props){
    super(props)

    this.state = {
      type_user:'',
      content:'',
      codeacount:''
    }
    this.select_acount = this.select_acount.bind(this)
    this.set_barrheader = this.set_barrheader.bind(this)
    this.select = this.select.bind(this)
    this.onChange  = this.onChange.bind(this)
    
  }

  componentDidMount(){
    //this.select_acount();
    
      this.set_barrheader();

  }
  select(uuid){

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
          info_cuenta:data            
        }
        this.props.dispatch(actions.setAuth(obj))
        this.props.history.push("/loading")

    })  
    .catch(error => {

    });
  }
  onChange(e){
      this.setState({
          [e.target.name]: e.target.value
      });

      if (e.target.name === 'cuenta') {
          this.select(e.target.value)
      }       
  } 
  select_acount(){
    if (this.props.scope === 'user') {
    const bearer = 'bearer '+ this.props.userToken;
      setTimeout(() => { 
        axios.request('get', {
          url:this.props.baseurl + '/v1/user_accounts',
          headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
        })
        .then(jsonresponse => { 
        
          let content;
          content = jsonresponse.data.map((lista, index) => { 
                     
            return (    
              <option key={index} value={lista.uuid} selected={this.props.infocuenta['uuid'] === lista.uuid} >{lista.code}</option> 
            );
        });

          this.setState({
            codeacount:content
          })

          this.set_barrheader();
        })  
        .catch(error => {
        }); 
      },20)
    }
  }
  set_barrheader(){
    let user;
    if(this.props.scope === 'user'){        
       user = 'Usuario';
      }

      if(this.props.scope === 'admin'){
        user = 'Administrador';
      }
      if(this.props.scope === 'moderador'){
        user = 'Moderador';
      }


    /*const barrheader_user = <ul className="breadcrumbs">
      <li><a className="active select_account" >Cuenta Activa</a></li>
      <li>
      <a className="active" >
        <select className="list_account" name="cuenta" onChange={this.onChange}>

          {this.state.codeacount}
        </select>
      </a>
      </li>
      <li>
        <a className="referir-btn" href="#Referir">Referir</a>
      </li>
    </ul>;*/

    const barrheader_admin = <ul className="breadcrumbs">
      <li><a className="active" >{user}</a></li>
    </ul>;


    if (this.props.scope === 'user') {
      this.setState({
        content: barrheader_admin
      })
    }else{
       this.setState({
        content: barrheader_admin
      })
    }
  }
  render() { 
    return (
        <div>
          {this.state.content}
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
    baseurl:state.mainReducer.setBaseUrl.baseurl
  }
}

export default withRouter(connect(mapStateToProps)(Breadcrumbs))


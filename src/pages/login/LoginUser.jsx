import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import $ from 'jquery';

import actions from '../../actions';
import '../../assets/css/pages/style.css';
import '../../assets/css/pages/login.css';
import '../../assets/css/pages/movil.css';
import Lottie from 'react-lottie';
import * as animationData from '../../components/lottieAnimation/LoadingRupertx.json';

class LoginUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stado: 0,
      msj: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showerror = this.showerror.bind(this);
    this.get_me = this.get_me.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
    };

    const load_view = (
      <div className="content-loading">
        <Lottie
          options={defaultOptions}
          height={125}
          width={125}
          isStopped={this.state.isStopped}
          isPaused={this.state.isPaused}
        />
      </div>
    );

    const data = JSON.stringify({
      UserName: this.state.email,
      Password: this.state.password,
    });

    const obj = {
      authorize: true,
      token: 'token-783848822771634',
      scope: 'admin',
      email: null,
      id: null,
      register: null,
      type: null,
      infouser: null,
      info_cuenta: null,
    };
    this.props.dispatch(actions.setAuth(obj));
    this.get_me();

    $.ajax({
      type: 'POST',
      url: this.props.baseurl + '/Account/Login',
      contentType: 'application/json',
      dataType: 'json',
      data: data,
      success: response => {
        const obj = {
          authorize: true,
          token: response.token,
          scope: 'admin',
          email: null,
          id: null,
          register: null,
          type: null,
          infouser: null,
          info_cuenta: null,
        };
        this.props.dispatch(actions.setAuth(obj));
        this.get_me();
      },
      error: response => {
        console.log(response);
        let error = {};
        switch (response.status) {
          case 401:
            error = {
              message: 'Usuario o Contraseña incorrecta',
            };
            this.showerror(error);
            break;
          default:
            error = {
              message: 'Error en el servidor, por favor contacte a IT de la Universidad',
            };
            this.showerror(error);
            break;
        }
        this.load_view();
      },
    });
  }

  get_me() {
    const data = {
      email: this.state.email,
      id: 'fjawoeifjawñoi2j13ño1ij234ñ1o2j34ñoi',
    };
    const obj = {
      // authorize       : this.props.authorize,
      authorize: true,
      token: 'token-783848822771634',
      scope: 'admin',
      email: data.email,
      id: data.id,
      type: null,
      infouser: data,
      info_cuenta: null,
    };
    this.props.dispatch(actions.setAuth(obj));
    this.props.history.push('/dashboard');

    // this.get_my_account_info();

    // const bearer = 'bearer '+ this.props.userToken;
    // axios.request('POST', {
    //   url:this.props.baseurl + '/v1/me',
    //   headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
    // })
    // .then(jsonresponse => {})
    // .catch(error => {
    //   this.showerror(error)
    // });
  }
  get_my_account_info() {
    const bearer = 'bearer ' + this.props.userToken;
    axios
      .get(this.props.baseurl + '/v1/user_accounts?page=1&per_page=100', {
        headers: { Authorization: bearer, 'Content-Type': 'application/json' },
      })
      .then(jsonresponse => {
        const data = jsonresponse.data;
        console.log(jsonresponse);
        var pfx = [];
        for (var i = data.length - 1; i >= 0; i--) {
          var info = data[i];
          if (info.code === 'FX-POINT') {
            pfx = info;
            console.log(pfx);
          }
        }
        const obj = {
          authorize: this.props.authorize,
          token: this.props.userToken,
          scope: this.props.scope,
          email: this.props.email,
          id: this.props.id,
          register: this.props.register,
          type: null,
          infouser: this.props.infouser,
          info_cuenta: data[0],
        };
        this.props.dispatch(actions.setAuth(obj));
        if (this.props.infouser.approved === true) {
          this.props.history.push('/dashboard');
          return;
        }
        switch (this.props.infouser.type_of_user) {
          case 'personality':
            this.props.history.push('/pnpasouno');
            switch (data[0].step) {
              case 1:
                this.props.history.push('/pnpasouno');
                break;
              case 2:
                this.props.history.push('/pnpasodos');
                break;
              case 3:
                this.props.history.push('/pnpasotres');
                break;
              case 4:
                this.props.history.push('/pnpasocuatro');
                break;
              case 6:
                this.props.history.push('/validating-account');
                break;
              default:
                break;
            }
            break;
          case 'company':
            this.props.history.push('/empasouno');
            switch (data[0].step) {
              case 1:
                this.props.history.push('/empasouno');
                break;
              case 2:
                this.props.history.push('/empasodos');
                break;
              case 3:
                this.props.history.push('/empasotres');
                break;
              case 4:
                this.props.history.push('/empasocuatro');
                break;
              case 5:
                this.props.history.push('/empasocinco');
                break;
              case 6:
                this.props.history.push('/validating-account');
                break;
              default:
                break;
            }
            break;
          default:
            this.props.history.push('/companytype');
            break;
        }
      })
      .catch(error => {
        this.showerror(error);
      });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  showerror(error) {
    let message = '* Error al enviar los datos. ' + error.message;
    this.setState({
      msj: message,
    });
  }

  componentDidMount() {
    console.log(this.props.baseurl);
    this.load_view();
  }

  load_view() {
    const view_login = (
      <div className="page-empty-content">
        <h1 className="border-radius-top empty-color-title aling-center ">INGRESAR</h1>
        <form className="border-radius-bottom border-0top" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="label-gray-color">Usuario</label>
            <input
              type="text"
              name="email"
              className="form-control"
              required
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label className="label-gray-color">Contraseña </label>
            <input
              type="password"
              name="password"
              className="form-control"
              required
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <div className="msj">{this.state.msj}</div>
          </div>
          <div className="form-group form-group-button">
            <button
              type="submit"
              className="button button-radius button-primary-width button-primary button-center"
            >
              INGRESAR
            </button>
          </div>
          <div className="form-group form-group-button">
            <div className="form-group-button-description content-aling-center label-gray-color">
              Crea tu cuenta,{' '}
              <a className="blue-link" href="/singup">
                Click
              </a>
            </div>
          </div>
        </form>
      </div>
    );
    this.setState({
      content: view_login,
    });
  }
  render() {
    return <div className="page-empty">{this.state.content}</div>;
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
    baseurl: state.mainReducer.setBaseUrl.baseurl,
  };
};

export default withRouter(connect(mapStateToProps)(LoginUser));

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
class Shortcuts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
    };
  }

  toggleBodyClass() {
    document.body.classList.toggle('content-side-open');
  }
  componentDidMount() {
    if (this.props.infocuenta === null) {
    } else {
      this.setState({
        code: this.props.infocuenta['code'],
      });
    }
  }
  render() {
    return (
      <div className="shortcuts">
        <a className="shortcut-item" href="/logout">
          <i className="md-icon">power_settings_new</i>
          <span />
        </a>
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
    baseurl: state.mainReducer.setBaseUrl.baseurl,
  };
};

export default withRouter(connect(mapStateToProps)(Shortcuts));

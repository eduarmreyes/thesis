import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-left">
          Copyright &copy; 2017 UEES. Todos los derechos reservados.
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {};
};

export default withRouter(connect(mapStateToProps)(Footer));

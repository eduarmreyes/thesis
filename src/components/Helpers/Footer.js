import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
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

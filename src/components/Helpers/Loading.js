import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../../assets/css/pages/loading.css";

import Lottie from "react-lottie";
import * as animationData from "../../components/lottieAnimation/LoadingRupertx.json";
class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stado: ""
    };
  }
  componentWillMount() {
    setTimeout(() => {
      if (this.props.authorize === true) {
        this.props.history.push("/project-list");
      } else {
        this.props.history.push("/");
      }
    }, 1000);
  }
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData
    };
    return (
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
  }
}
const mapStateToProps = (state, props) => {
  return {
    authorize: state.mainReducer.auth.authorize
  };
};

export default withRouter(connect(mapStateToProps)(Loading));

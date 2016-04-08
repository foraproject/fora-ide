/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from '../components/modal';
import * as actions from "../actions/modal";

class ModalContainer extends Component {
  render() {
    return (this.props.children) ?
      <Modal {...this.props} /> :
      <div style={{display: "none"}}></div>
  }
}

const mapStateToProps = (state) => {
  return {
    children: state.modal.children
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => {
      dispatch(actions.closeModal())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalContainer);

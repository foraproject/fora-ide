/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadProject } from '../actions/project';
import Workspace from '../components/workspace';

class WorkspaceContainer extends Component {
  render() {
    return (
      <Workspace />
    )
  }
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(
  mapStateToProps,
  {}
)(WorkspaceContainer);

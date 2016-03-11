import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectTree from '../components/project-tree';
import { openFile } from "../actions/editor.js";

class ProjectTreeContainer extends Component {
  render() {
    return (
      <ProjectTree project={this.props.project} openFile={this.props.openFile} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    project: state.project
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openFile: (filePath) => {
      dispatch(openFile(filePath))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectTreeContainer);

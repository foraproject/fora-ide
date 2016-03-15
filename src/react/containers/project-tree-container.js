import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectTree from '../components/project-tree';
import * as editorActions from "../actions/editor.js";
import * as projectActions from "../actions/project.js";
import * as menuActions from "../actions/context-menu.js";

class ProjectTreeContainer extends Component {
  render() {
    return (
      <ProjectTree {...this.props} />
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
      dispatch(editorActions.openFile(filePath))
    },
    showContextMenu: (items, position) => {
      dispatch(menuActions.openContextMenu(items, position))
    },
    selectProjectItem: (name, parents) => {
      dispatch(projectActions.selectProjectItem(name, parents))
    },
    expandDir: (name, parents) => {
      dispatch(projectActions.expandDir(name, parents));
    },
    collapseDir: (name, parents) => {
      dispatch(projectActions.collapseDir(name, parents));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectTreeContainer);

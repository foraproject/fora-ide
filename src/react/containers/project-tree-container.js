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
    showContextMenu: (items, position, predicate) => {
      dispatch(projectActions.showContextMenu(items, position, predicate))
    },
    selectProjectItem: (name, parents, nodeType, unselectPrevious = true) => {
      dispatch(projectActions.selectProjectItem(name, parents, nodeType, unselectPrevious))
    },
    selectMultipleProjectItems: (name, parents, nodeType) => {
      dispatch(projectActions.selectMultipleProjectItems(name, parents, nodeType))
    },
    expandDir: (name, parents, nodeType) => {
      dispatch(projectActions.expandDir(name, parents, nodeType));
    },
    collapseDir: (name, parents, nodeType) => {
      dispatch(projectActions.collapseDir(name, parents, nodeType));
    },
    copyDirOrFile: (name, parents, nodeType) => {
      dispatch(projectActions.copyDirOrFile(name, parents, nodeType));
    },
    cutDirOrFile: (name, parents, nodeType) => {
      dispatch(projectActions.cutDirOrFile(name, parents, nodeType));
    },
    pasteDirOrFile: (name, parents, nodeType) => {
      dispatch(projectActions.pasteDirOrFile(name, parents, nodeType));
    },
    deleteDirOrFile: (name, parents, nodeType) => {
      dispatch(projectActions.deleteDirOrFile(name, parents, nodeType));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectTreeContainer);

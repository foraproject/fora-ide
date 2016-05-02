/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectTree from '../components/project-tree';
import * as editorActions from "../actions/editor.js";
import * as projectActions from "../actions/project.js";
import * as modalActions from "../actions/modal.js";

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
    selectNode: (name, parents, nodeType, unselectPrevious = true) => {
      dispatch(projectActions.selectNode(name, parents, nodeType, unselectPrevious))
    },
    selectMultipleNodes: (name, parents, nodeType) => {
      dispatch(projectActions.selectMultipleNodes(name, parents, nodeType))
    },
    expandDir: (name, parents, nodeType) => {
      dispatch(projectActions.expandDir(name, parents, nodeType));
    },
    collapseDir: (name, parents, nodeType) => {
      dispatch(projectActions.collapseDir(name, parents, nodeType));
    },
    openModal: (children) => {
      dispatch(modalActions.openModal(children));
    },
    closeModal: (children) => {
      dispatch(modalActions.closeModal());
    },
    renameNode: (newName, name, parents, nodeType) => {
      dispatch(projectActions.renameNode(name, parents, nodeType));
    },
    copyNode: (name, parents, nodeType) => {
      dispatch(projectActions.copyNode(name, parents, nodeType));
    },
    cutNode: (name, parents, nodeType) => {
      dispatch(projectActions.cutNode(name, parents, nodeType));
    },
    pasteNode: (name, parents, nodeType) => {
      dispatch(projectActions.pasteNode(name, parents, nodeType));
    },
    deleteNode: (name, parents, nodeType) => {
      dispatch(projectActions.deleteNode(name, parents, nodeType));
    },
    dragNode: (name, parents, nodeType) => {
      dispatch(projectActions.dragNode(name, parents, nodeType));
    },
    dragEnterNode: (name, parents, nodeType) => {
      dispatch(projectActions.dragEnterNode(name, parents, nodeType));
    },
    clearNodeDropTarget: () => {
      dispatch(projectActions.clearNodeDropTarget());
    },
    dropNode: (name, parents, nodeType) => {
      dispatch(projectActions.dropNode(name, parents, nodeType));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectTreeContainer);

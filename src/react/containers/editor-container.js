/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Editor from '../components/editor';
import * as actions from "../actions/editor.js";
import * as menuActions from "../actions/context-menu.js";

class EditorContainer extends Component {
  render() {
    return (
      <Editor {...this.props} {...this.props.activeFiles} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activeFiles: state.activeFiles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openFile: (filePath) => {
      dispatch(actions.openFile(filePath))
    },
    closeFile: (filePath) => {
      dispatch(actions.closeFile(filePath))
    },
    closeAllFiles: () => {
      dispatch(actions.closeAllFiles())
    },
    closeOtherFiles: (filePath) => {
      dispatch(actions.closeOtherFiles(filePath))
    },
    showContextMenu: (items, position) => {
      dispatch(menuActions.openContextMenu(items, position))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorContainer);

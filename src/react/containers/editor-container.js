import React, { Component } from 'react';
import { connect } from 'react-redux';
import Editor from '../components/editor';
import * as actions from "../actions/editor.js";
import * as menuActions from "../actions/context-menu.js";

class EditorContainer extends Component {
  render() {
    return (
      <Editor files={this.props.activeFiles.files} lastUsed={this.props.activeFiles.lastUsed}
        active={this.props.activeFiles.active} openFile={this.props.openFile} closeFile={this.props.closeFile} showContextMenu={this.props.showContextMenu} />
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
    closeAllExcept: (filePath) => {
      dispatch(actions.closeAllExcept(filePath))
    },
    showContextMenu: (items, position) => {
      console.log(position)
      dispatch(menuActions.openContextMenu(items, position))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorContainer);

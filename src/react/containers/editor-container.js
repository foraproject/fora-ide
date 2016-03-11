import React, { Component } from 'react';
import { connect } from 'react-redux';
import Editor from '../components/editor';
import { closeFile, openFile } from "../actions/editor.js";

class EditorContainer extends Component {
  render() {
    return (
      <Editor files={this.props.activeFiles.files} lastUsed={this.props.activeFiles.lastUsed}
        active={this.props.activeFiles.active} onOpenFile={this.props.onOpenFile} onCloseFile={this.props.onCloseFile} />
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
    onOpenFile: (filePath) => {
      dispatch(openFile(filePath))
    },
    onCloseFile: (filePath) => {
      dispatch(closeFile(filePath))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorContainer);

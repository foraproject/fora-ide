import React, { Component } from 'react';
import { connect } from 'react-redux';
import Editor from '../components/editor';

class EditorContainer extends Component {
  render() {
    return (
      <Editor files={this.props.editor.files} activeFile={this.props.editor.activeFile} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    editor: state.editor
  }
}

export default connect(
  mapStateToProps,
  {}
)(EditorContainer);

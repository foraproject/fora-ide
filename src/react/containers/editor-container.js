import React, { Component } from 'react';
import { connect } from 'react-redux';
import Editor from '../components/editor';

class EditorContainer extends Component {
  render() {
    return (
      <Editor />
    )
  }
}


const mapStateToProps = (state) => {
  return {};
}

export default connect(
  mapStateToProps,
  {
    // loadProject
  }
)(EditorContainer);

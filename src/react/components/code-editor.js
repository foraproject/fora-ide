/* @flow */
import React from "react";

class CodeEditor extends React.Component {

  componentWillMount() {
    this.editorId = `src-code-editor-${this.getRandomId()}`;
  }

  componentDidMount() {
    const editor = ace.edit(this.editorId);
    editor.setTheme("ace/theme/dreamweaver");
    editor.getSession().setMode("ace/mode/jsx");
    document.getElementById(this.editorId).style.fontSize='14px';
    editor.setValue(this.props.source, -1);
  }

  getRandomId() {
    return "r-" +  Math.random().toString().substring(3) + Math.random().toString().substring(3);
  }

  getStyle() {
    return { width: "100%", height: "100%", display: (this.props.visible ? "block" : "none") };
  }

  render() {
    return (
      <div id={this.editorId} style={this.getStyle()} ref={(c) => this._editor = c}>
      </div>
    );
  }

}

export default CodeEditor;

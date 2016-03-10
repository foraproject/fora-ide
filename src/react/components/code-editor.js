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
    return Math.random().toString(36).substring(12);
  }

  getStyle() {
    return { flex: 1, display: "flex", flexDirection: "column", width: "100%", display: (this.props.visible ? "block" : "none") };
  }

  render() {
    return (
      <div id={this.editorId} style={this.getStyle()} ref={(c) => this._editor = c}>
      </div>
    );
  }

}

export default CodeEditor;

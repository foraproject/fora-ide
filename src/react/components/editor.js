import React from "react";

class Editor extends React.Component {

  componentDidMount() {
    const editor = ace.edit("src-code-editor");
    editor.setTheme("ace/theme/dreamweaver");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setValue(example);
    document.getElementById('src-code-editor').style.fontSize='14px';
  }

  render() {
    return(
      <div id="src-code-editor" style={{ flex: 1, width: "100%" }} ref={(c) => this._editor = c}>
      </div>
    );
  }

}

export default Editor;

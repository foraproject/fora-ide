import React from "react";

class Editor extends React.Component {

  showActiveFile() {
    const editor = ace.edit("src-code-editor");
    const file = this.props.files.filter(f => f.path === this.props.activeFile);
    if (file.length) {
      editor.setValue(file[0].contents)
    }
  }

  componentDidMount() {
    const editor = ace.edit("src-code-editor");
    editor.setTheme("ace/theme/dreamweaver");
    editor.getSession().setMode("ace/mode/javascript");
    document.getElementById('src-code-editor').style.fontSize='14px';
    this.showActiveFile();
  }

  render() {
    return(
      <div id="src-code-editor" style={{ flex: 1, width: "100%" }} ref={(c) => this._editor = c}>
      </div>
    );
  }

}

export default Editor;

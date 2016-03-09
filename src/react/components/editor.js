import React from "react";

const example = `
import React from "react";
import css from "./css";

class MenuItem extends React.Component {
  render() {
    return(
      <li style={{ width: "56px", float: "left", color: css.palette.fg }}>{this.props.title}</li>
    );
  }
}

class MainMenu extends React.Component {
  render() {
    return(
      <ul style={{ fontSize: css.fontSize.medium, paddingTop: "8px", background: css.palette.lightBg, height: "24px", margin: 0 }}>
        <MenuItem title="File" />
        <MenuItem title="Edit" />
        <MenuItem title="Find" />
        <MenuItem title="View" />
        <MenuItem title="Run" />
        <MenuItem title="Tools" />
        <MenuItem title="Deploy" />
      </ul>
    );
  }
}

export default MainMenu;
`;

class Editor extends React.Component {

  componentDidMount() {
    const editor = ace.edit("src-code-editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setValue(example);
    document.getElementById('src-code-editor').style.fontSize='14px';
  }

  render() {
    return(
      <div id="src-code-editor" style={{ height: "100%", width: "100%" }} ref={(c) => this._editor = c}>
      </div>
    );
  }

}

export default Editor;

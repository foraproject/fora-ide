import React from "react";
import TabBar from "./tab-bar";
import CodeEditor from "./code-editor";

class Editor extends React.Component {

  render() {
    const _activeFile = this.props.files.filter(f => f.path === this.props.activeFile);
    const activeFile = _activeFile.length ? _activeFile[0] : null;
    return(
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <TabBar items={this.props.files.map(p => { return { title: p.name.split('/').slice(-1)[0], fullTitle: p.name, key: p.path } })} active={this.props.actveFile}/>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {this.props.files.map(f => <CodeEditor visible={f.path === this.props.activeFile} source={activeFile.contents} />)}
        </div>
      </div>
    );
  }

}

export default Editor;

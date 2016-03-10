import React from "react";
import TabBar from "./tab-bar";
import CodeEditor from "./code-editor";

class Editor extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    console.log(arguments)
    return nextProps.activeFile !== this.props.activeFile;
  }

  render() {
    //console.log(this.props)
    const _activeFile = this.props.files.filter(f => f.name === this.props.activeFile);
    const activeFile = _activeFile.length ? _activeFile[0] : null;
    return(
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <TabBar items={this.props.files.map(p => { return { title: p.name.split('/').slice(-1)[0], fullTitle: p.name, key: p.name } })} activeTab={this.props.actveFile}/>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {this.props.files.map(f => <CodeEditor key={"editor-" + f.name} visible={f.name === this.props.activeFile} source={activeFile.contents} />)}
        </div>
      </div>
    );
  }

}

export default Editor;

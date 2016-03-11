import React from "react";
import TabBar from "./tab-bar";
import CodeEditor from "./code-editor";

class Editor extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.files.length !== this.props.files.length || nextProps.active !== this.props.active;
  }

  render() {
    const tabItems = this.props.files.map(p => { return { title: p.name.split('/').slice(-1)[0], fullTitle: p.name, key: p.name } });
    return(
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <TabBar onOpenItem={this.props.onOpenFile} onCloseItem={this.props.onCloseFile} items={tabItems} active={this.props.active}/>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {this.props.files.map(f => <CodeEditor key={"editor-" + f.name} visible={f.name === this.props.active} source={f.contents} />)}
        </div>
      </div>
    );
  }

}

export default Editor;

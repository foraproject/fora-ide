import React from "react";
import SplitPane from "react-split-pane";
import TabBar from "./tab-bar";
import CodeEditor from "./code-editor";

class Editor extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.files.length !== this.props.files.length || nextProps.active !== this.props.active;
  }

  showTabContextMenu(itemKey, event) {
    const self = this;
    this.props.showContextMenu([
      { title: "Close Tab",  handler: () => self.props.closeFile(itemKey) },
      { title: "Close All Tabs", handler: () => self.props.closeAllFiles() },
      { title: "Close Other Tabs", handler: () => self.props.closeOtherFiles(itemKey) },
      { title: "Save File", handler: () => self.props.saveFile(itemKey) }
    ], { left: event.pageX, top: event.pageY });
  }

  render() {
    const tabItems = this.props.files.map(p => { return { title: p.name.split('/').slice(-1)[0], fullTitle: p.name, key: p.name } });
    return(
      <div>
        <SplitPane id="editor-container" split="horizontal" defaultSize="32">
          <TabBar openItem={this.props.openFile} closeItem={this.props.closeFile} active={this.props.active}
            showContextMenu={this.showTabContextMenu.bind(this)} items={tabItems} />
          <div>
            {this.props.files.map(f => <CodeEditor key={"editor-" + f.name} visible={f.name === this.props.active} source={f.contents} />)}
          </div>
        </SplitPane>
      </div>
    );
  }
}

export default Editor;

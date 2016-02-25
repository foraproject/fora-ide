import React from "react";

import Menu from "./main-menu";
import SplitPane from "react-split-pane";
import ProjectTree from "./project-tree";
import Editor from "./editor";

class Workspace extends React.Component {
  render() {
    return(
      <div>
        <Menu></Menu>
        <SplitPane split="vertical" minSize="50">
          <ProjectTree />
          <Editor />
        </SplitPane>
      </div>
    );
  }
}

export default Workspace;

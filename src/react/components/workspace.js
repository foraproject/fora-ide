import React from "react";

import Menu from "./main-menu";
import SplitPane from "react-split-pane";
import ProjectTreeContainer from "../containers/project-tree-container";
import EditorContainer from "../containers/editor-container";
import css from "./css";

class Workspace extends React.Component {
  render() {
    return(
      <div>
        <Menu></Menu>
        <div style={{ backgroundColor: css.palette.bg, height: "100%" }}>
          <SplitPane split="vertical" minSize="200" defaultSize="240">
            <ProjectTreeContainer />
            <EditorContainer />
          </SplitPane>
        </div>
      </div>
    );
  }
}

export default Workspace;

import React from "react";

import Menu from "./main-menu";
import SplitPane from "react-split-pane";
import ProjectTreeContainer from "../containers/project-tree-container";
import EditorContainer from "../containers/editor-container";
import css from "./css";

const cssFix = `
.SplitPane.vertical { position: relative !important; height: auto !important; }
.SplitPane.vertical .Pane.vertical:last-child { display: flex; flex-direction: column }
`;

class Workspace extends React.Component {
  render() {
    return(
      <div>
        <style dangerouslySetInnerHTML={{ __html: cssFix }}></style>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
          <div style={{ flex: "0"}}>
            <Menu></Menu>
          </div>
          <div style={{ flex: "1", flexDirection: "column", display: "flex" }}>
            <SplitPane id="editor-container" split="vertical" minSize="200" defaultSize="240">
              <ProjectTreeContainer />
              <EditorContainer />
            </SplitPane>
          </div>
        </div>
      </div>
    );
  }
}

export default Workspace;

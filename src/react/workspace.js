import React from "react";

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

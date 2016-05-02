/* @flow */
import React from "react";
import R from "ramda";
import css from "./css";
import TreeNode from "./project-tree-node";

class ProjectTree extends React.Component {
  render() {
    return(
      <div style={{ fontSize: "13px", color: css.palette.fg }}>
        <ul style={{ margin: "4px 0 0 0", padding: "0" }}>
          <TreeNode {...this.props} node={this.props.project} parents={[]} />
        </ul>
      </div>
    );
  }
}

export default ProjectTree;

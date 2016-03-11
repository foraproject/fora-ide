import React from "react";
import css from "./css";

class TreeNode extends React.Component {

  getStyle(node) {
    const listStyle = "none";
    const padding = "4px 0 4px 16px";
    const margin = "0";
    const cursor = "default";
    return {
      listStyle,
      padding,
      margin,
      cursor
    };
  }

  getKey(name, parents) {
    return `project-tree-${parents.concat(name).join("-")}`;
  }

  getIcon(node) {
    switch(node.type) {
      case "dir":
        return <i style={{ paddingRight: "4px" }} className="fa fa-folder"></i>;
      default:
        return <i style={{ paddingRight: "4px" }} className="fa fa-file-code-o"></i>;
    }
  }

  onClick(event) {
    if (this.props.node.type === "file") {
      this.props.onOpenFile(this.props.parents.concat(this.props.node.name).join("/"));
    }
    event.stopPropagation();
  }

  render() {
    const node = this.props.node;
    const name = node.name;
    const parents = this.props.parents || [];
    const key = this.getKey(name, parents);

    if (node.collapsed) {
      return (
        <li key={key} onClick={this.onClick.bind(this)} style={this.getStyle(node)}><span>{name}</span></li>
      );
    } else {
      return (
        <li key={key} onClick={this.onClick.bind(this)} style={this.getStyle(node)}>
          <p style={{ height: "20px", padding: "0", margin: "0" }}>{this.getIcon(node)}{name}</p>
          { node.contents ?
            (
              <ul style={{ margin: 0, padding: 0 }}>
                {node.contents.map(node => <TreeNode key={`${key}-${node.name}-tr`} parents={parents.concat(name)} node={node} onOpenFile={this.props.onOpenFile} />)}
              </ul>
            ):
            []
          }
        </li>
      );
    }
  }
}

class ProjectTree extends React.Component {
  render() {
    return(
      <div style={{ fontSize: "13px", color: css.palette.fg }}>
        <ul style={{ margin: "4px 0 0 0", padding: "0" }}>
          <TreeNode onOpenFile={this.props.onOpenFile} node={this.props.project} />
        </ul>
      </div>
    );
  }
}

export default ProjectTree;

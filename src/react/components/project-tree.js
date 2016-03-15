import React from "react";
import css from "./css";

class TreeNode extends React.Component {

  getStyle() {
    const listStyle = "none";
    const padding = "0 0 0 16px";
    const margin = "0";
    const cursor = "default";
    return {
      listStyle,
      padding,
      margin,
      cursor
    };
  }

  getTextStyle() {
    const style = {
      height: "20px",
      padding: "4px 0 0 0",
      margin: "0"
    };

    if (
      (this.props.project.selected && this.props.parents) &&
      (this.props.node.name === this.props.project.selected.name) &&
      (this.props.parents.length === this.props.project.selected.parents.length) &&
      (this.props.parents.every((p, i) => p === this.props.project.selected.parents[i]))
    ) {
      style.background = css.palette.lightBg;
    }

    return style;
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

  getExpandCollapseIcon(node) {
    switch(node.type) {
      case "dir":
        return node.collapsed ?
        <i style={{ paddingRight: "4px" }} className="fa fa-caret-right"></i> :
        <i style={{ paddingRight: "4px" }} className="fa fa-caret-down"></i>;
      default:
        return null;
    }
  }

  onClick(event) {
    this.props.selectProjectItem(this.props.node.name, this.props.parents);

    switch (this.props.node.type) {
      case "file": {
        this.props.openFile(this.props.parents.concat(this.props.node.name).join("/"));
        break;
      }
      case "dir": {
        if (this.props.node.collapsed) {
          this.props.expandDir(this.props.node.name, this.props.parents);
        } else {
          this.props.collapseDir(this.props.node.name, this.props.parents);
        }
      }
    }
    event.stopPropagation();
  }

  showContextMenu(event) {
    this.props.selectProjectItem(this.props.node.name, this.props.parents);

    this.props.showContextMenu([
      { title: "New File",  handler: () => self.props.newFile() },
      { title: "New Folder", handler: () => self.props.newDir() },
      {},
      { title: "Rename",  handler: () => self.props.renameDirOrFile() },
      { title: "Duplicate", handler: () => self.props.duplicateDirOrFile() },
      { title: "Delete", handler: () => self.props.deleteDirOrFile() },
      { title: "Copy", handler: () => self.props.copyDirOrFile() },
      { title: "Paste", handler: () => self.props.pasteDirOrFile() },
      { title: "Cut", handler: () => self.props.cutDirOrFile() },
      {},
      { title: "Copy File Path",  handler: () => self.props.copyPath() }
    ], { left: event.pageX, top: event.pageY });
    event.stopPropagation();
    event.preventDefault();
  }

  render() {
    const node = this.props.node;
    const name = node.name;
    const parents = this.props.parents || [];
    const key = this.getKey(name, parents);

    if (node.collapsed) {
      return (
        <li key={key} onClick={this.onClick.bind(this)} style={this.getStyle()}>
          <p style={this.getTextStyle()}>{this.getExpandCollapseIcon(node)}{this.getIcon(node)}{name}</p>
        </li>
      );
    } else {
      return (
        <li key={key} onContextMenu={this.showContextMenu.bind(this)}
          onClick={this.onClick.bind(this)} style={this.getStyle()}>

          <p style={this.getTextStyle()}>{this.getExpandCollapseIcon(node)}{this.getIcon(node)}{name}</p>
          { node.contents ?
            (
              <ul style={{ margin: 0, padding: 0 }}>
                {
                  node.contents.map( node => <TreeNode {...this.props} key={`${key}-${node.name}-tr`} parents={parents.concat(name)} node={node} /> )
                }
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
          <TreeNode {...this.props} node={this.props.project} />
        </ul>
      </div>
    );
  }
}

export default ProjectTree;

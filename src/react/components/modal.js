/* @flow */
import React from "react";
import css from "./css";

export default class Modal extends React.Component {
  getStyle() {
    return {
      width: "128px",
      padding: "8px 12px",
      background: css.palette.bg,
      borderBottom: `1px solid ${css.palette.xlightBg}`,
      color: css.palette.fg,
      listStyle: "none",
      margin: 0,
      cursor: "pointer"
    }
  }

  getOverlayStyle() {
    return {
      position: "absolute",
      height: "100%",
      width: "100%",
      left: 0,
      top: 0,
      background: css.palette.fg,
      opacity: 0.3,
      zIndex: 10
    }
  }

  onClick() {
    this.props.onClick();
    this.props.closeContextMenu();
  }

  render() {
    console.log("Hello...");
    return (
      <div>
        <div onClick={this.props.closeContextMenu} style={this.getOverlayStyle()}>
        </div>
        <div style={this.getStyle()}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

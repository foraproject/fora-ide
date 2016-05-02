/* @flow */
import React from "react";
import css from "./css";

export default class Modal extends React.Component {
  getStyle() {
    return {
      width: "100%",
      padding: "16px 24px 12px 24px",
      background: css.palette.bg,
      borderBottom: `1px solid ${css.palette.xlightBg}`,
      color: css.palette.fg,
      position: "absolute",
      zIndex: 11
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
    this.props.closeModal();
  }

  render() {
    return (
      <div>
        <div onClick={this.props.closeModal.bind(this)} style={this.getOverlayStyle()}>
        </div>
        <div style={this.getStyle()}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

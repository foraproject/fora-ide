import React from "react";
import css from "./css";

class MenuItem extends React.Component {
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

  onClick() {
    this.props.onClick();
    this.props.closeContextMenu();
  }

  render() {
    let self = this;
    return(
      <li onClick={this.onClick.bind(this)} style={this.getStyle()}>{this.props.title}</li>
    );
  }
}

class Separator extends React.Component {
  getStyle() {
    return {
      width: "152px",
      padding: 0,
      margin: 0,
      background: css.palette.bg,
      borderBottom: `6px solid ${css.palette.lightBg}`,
      color: css.palette.fg,
      listStyle: "none",
      cursor: "pointer"
    }
  }

  render() {
    return(
      <li style={this.getStyle()}></li>
    );
  }
}

class Menu extends React.Component {
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

  getMenuStyle() {
    return {
      position: "absolute",
      left: this.props.position.left,
      top: this.props.position.top,
      fontSize: css.fontSize.medium,
      paddingTop: "8px",
      background: css.palette.lightBg,
      height: "24px",
      padding: 0,
      margin: 0,
      zIndex: 11
    }
  }

  render() {
    return(
      <div>
        <div onClick={this.props.closeContextMenu} style={this.getOverlayStyle()}>
        </div>
        <ul style={this.getMenuStyle()}>
          {
            this.props.items.map(
              (i, j) =>
                (i.title) ?
                  <MenuItem key={`context-menu-${i.title.split(" ").join("-").toLowerCase()}`}
                    closeContextMenu={this.props.closeContextMenu} title={i.title} onClick={i.handler} /> :
                  <Separator key={`context-menu-separator-${j}`} />
              )
          }
        </ul>
      </div>
    );
  }
}

export default Menu;

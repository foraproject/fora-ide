import React from "react";
import css from "./css";

class MenuItem extends React.Component {
  render() {
    return(
      <li onClick={this.props.onClick} style={{ padding: "12px", borderBottom: `1px solid ${css.palette.fg}`, width: "56px", color: css.palette.fg }}>{this.props.title}</li>
    );
  }
}

class Menu extends React.Component {
  render() {
    return(
      <div onClick={this.props.onHide} style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, background: "#fff", zIndex: 100 }}>
        <ul style={{ position: "absolute", left: this.props.position.left, top: this.props.position.top, fontSize: css.fontSize.medium, paddingTop: "8px", background: css.palette.lightBg, height: "24px", margin: 0 }}>
          { this.props.items.map(i => <MenuItem key={`context-menu-${i.title.split(" ").join("-").toLowerCase()}`} title={i.title} onClick={i.handler} />)}
        </ul>
      </div>
    );
  }
}

export default Menu;

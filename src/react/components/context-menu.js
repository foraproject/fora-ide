import React from "react";
import css from "./css";

class MenuItem extends React.Component {
  render() {
    return(
      <li onClick={this.props.onClick} style={{ width: "56px", float: "left", color: css.palette.fg }}>{this.props.title}</li>
    );
  }
}

class Menu extends React.Component {
  render() {
    console.log(this.props)
    return(
      <div onClick={this.props.onHide} style={{ position: "absolute", height: "100%", width: "100%", background: "#fff", zIndex: 100 }}>
        <ul style={{ left: this.props.left, right: this.props.right, fontSize: css.fontSize.medium, paddingTop: "8px", background: css.palette.lightBg, height: "24px", margin: 0 }}>
          { this.props.items.map(i => <MenuItem key={`context-menu-${i.title.split(" ").join("-").toLowerCase()}`} title={i.title} onClick={i.handler} />)}
        </ul>
      </div>
    );
  }
}

export default Menu;

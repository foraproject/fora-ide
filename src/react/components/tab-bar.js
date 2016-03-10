import React from "react";
import css from "./css";

class Tab extends React.Component {
  render() {
    return(
      <li style={{ width: "56px", float: "left", height: "32px", paddingTop: "8px", marginRight: "1px" }}>{this.props.title}</li>
    );
  }
}

class TabBar extends React.Component {
  render() {
    return(
      this.props.items && this.props.items.length ?
        (<ul style={{ fontSize: css.fontSize.medium, textAlign: "center", background: css.palette.lighterBg, height: "32px", margin: 0 }}>
          { this.props.items.map(i => <Tab key={i.key} title={i.title} />) }
        </ul>) : null
    );
  }
}

export default TabBar;

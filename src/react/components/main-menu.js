import React from "react";
import css from "./css";

class MenuItem extends React.Component {
  render() {
    return(
      <li style={{ listStyle: "none", width: "56px", float: "left", color: css.palette.fg }}>{this.props.title}</li>
    );
  }
}

class MainMenu extends React.Component {
  render() {
    return(
      <ul style={{ fontSize: css.fontSize.medium, paddingTop: "8px", background: css.palette.lightBg, width: "100%", height: "24px", margin: 0 }}>
        <MenuItem title="File" />
        <MenuItem title="Edit" />
        <MenuItem title="Find" />
        <MenuItem title="View" />
        <MenuItem title="Run" />
        <MenuItem title="Tools" />
        <MenuItem title="Deploy" />
      </ul>
    );
  }
}

export default MainMenu;

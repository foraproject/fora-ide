import React from "react";

class MenuItem extends React.Component {
  render() {
    return(
      <ul>
        <TreeView />
      </ul>
    );
  }
}

class MainMenu extends React.Component {
  render() {
    return(
      <ul>
        <MenuItem />
      </ul>
    );
  }
}

export default MainMenu;

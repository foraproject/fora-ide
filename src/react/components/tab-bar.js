import React from "react";
import css from "./css";

class Tab extends React.Component {
  getStyle() {
    const cssProps = {
      width: "96px",
      float: "left",
      height: "32px",
      paddingTop: "8px",
      marginRight: "1px"
    }
    if (this.props.active) {
      cssProps.backgroundColor = css.palette.bgHighlight;
      cssProps.color = css.palette.fgHighlight;
      cssProps.fontWeight = "bold";
    }
    return cssProps;
  }

  render() {
    return(
      <li key={this.props.key} style={this.getStyle()}>{this.props.title}</li>
    );
  }
}

class TabBar extends React.Component {
  render() {
    return(
      this.props.items && this.props.items.length ?
        (<ul style={{ fontSize: css.fontSize.medium, textAlign: "center", background: css.palette.lighterBg, height: "32px", margin: 0 }}>
          { this.props.items.map(i => <Tab active={i.key === "tab-item-" + this.props.activeTab} key={"tab-item-" + i.key} title={i.title} />) }
        </ul>) : null
    );
  }
}

export default TabBar;

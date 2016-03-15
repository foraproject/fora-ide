import React from "react";
import css from "./css";

class Tab extends React.Component {

  getStyle() {
    const cssProps = {
      width: this.props.title.length < 10 ? "96px" : "132px",
      float: "left",
      height: "32px",
      padding: "8px 0 0 0",
      marginRight: "1px",
      cursor: "pointer",
      overflow: "hidden",
      listStyle: "none"
    }
    if (this.props.active) {
      cssProps.backgroundColor = css.palette.bgHighlight;
      cssProps.color = css.palette.fgHighlight;
      cssProps.fontWeight = "bold";
    }
    return cssProps;
  }

  openItem(event) {
    this.props.openItem(this.props.itemKey);
    if (event) { event.stopPropagation(); }
  }

  closeItem(event) {
    this.props.closeItem(this.props.itemKey);
    if (event) { event.stopPropagation(); }
  }

  showContextMenu(event) {
    this.props.showContextMenu(this.props.itemKey, event);
    event.preventDefault();
  }

  render() {
    return(
      <li onClick={this.openItem.bind(this)} onContextMenu={this.showContextMenu.bind(this)} key={this.props.key} style={this.getStyle()}>{this.props.title}
        <i onClick={this.closeItem.bind(this)} style={{ padding: "0 8px 0 4px", float: "right" }} className="fa fa-times"></i>
      </li>
    );
  }
}

class TabBar extends React.Component {
  getStyle() {
    return {
      fontSize: css.fontSize.medium,
      textAlign: "center",
      background: css.palette.xlightBg,
      height: "32px",
      padding: 0,
      margin: 0,
      width: "100%",
      overflow: "hidden"
    }
  }

  render() {
    return(
      this.props.items && this.props.items.length ?
        (<ul style={this.getStyle()}>
          {
            this.props.items.map(
              i => <Tab active={i.key === this.props.active} openItem={this.props.openItem} showContextMenu={this.props.showContextMenu}
                closeItem={this.props.closeItem} itemKey={i.key} key={"tab-item-" + i.key} title={i.title} />
            )
          }
        </ul>) : null
    );
  }
}

export default TabBar;

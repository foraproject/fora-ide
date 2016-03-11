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

  openItem(event) {
    this.props.openItem(this.props.itemKey);
    if (event) { event.stopPropagation(); }
  }

  closeItem(event) {
    this.props.closeItem(this.props.itemKey);
    if (event) { event.stopPropagation(); }
  }

  closeAllItems(event) {
    this.props.closeItem(this.props.itemKey);
    if (event) { event.stopPropagation(); }
  }

  showContextMenu(event) {
    console.log(event.pageX);
    this.props.showContextMenu(this.props.itemKey, event)
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
  render() {
    return(
      this.props.items && this.props.items.length ?
        (<ul style={{ fontSize: css.fontSize.medium, textAlign: "center", background: css.palette.lighterBg, height: "32px", padding: 0, margin: 0 }}>
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

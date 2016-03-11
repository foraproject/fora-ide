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
    this.props.onOpenItem(this.props.itemKey);
    event.stopPropagation();
  }

  closeItem(event) {
    this.props.onCloseItem(this.props.itemKey);
    event.stopPropagation();
  }

  render() {
    return(
      <li onClick={this.openItem.bind(this)} key={this.props.key} style={this.getStyle()}>{this.props.title}
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
              i => <Tab active={i.key === this.props.active} onOpenItem={this.props.onOpenItem}
                onCloseItem={this.props.onCloseItem} itemKey={i.key} key={"tab-item-" + i.key} title={i.title} />
            )
          }
        </ul>) : null
    );
  }
}

export default TabBar;

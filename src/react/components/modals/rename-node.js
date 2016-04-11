/* @flow */
import React from "react";
import ReactDOM from "react-dom";
import css from "../css";

export default class RenameNodeModal extends React.Component {
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.pathInput).focus();
  }

  onKeyPress(event) {
    console.log(event);
  }


  render() {
    return(
      <div>
        <p style={{lineHeight: "1.4em"}}>
          <span style={{fontSize: "0.8em"}}>Enter a new path for the file</span><br />
          <input ref="pathInput" size="40" type="text" onKeyPress={this.onKeyPress.bind(this)} />
        </p>
      </div>
    );
    //this.props.renameNode(this.props.node.name, this.props.parents, this.props.node.type)
  }
}

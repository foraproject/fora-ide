import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContextMenu from '../components/context-menu';

class ContextMenuContainer extends Component {
  render() {
    return (this.props.items && this.props.items.length) ?
      <ContextMenu items={this.props.items} position={this.props.position} /> :
      <div style={{display: "none"}}></div>
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.contextMenu.items,
    position: state.contextMenu.position
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContextMenuContainer);

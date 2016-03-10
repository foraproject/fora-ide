import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectTree from '../components/project-tree';

class ProjectTreeContainer extends Component {
  render() {
    return (
      <ProjectTree project={this.props.project} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    project: state.project
  }
}

export default connect(
  mapStateToProps,
  {
    // deleteItem,
    // newDirectory,
    // newFile,
    // copyItem,
    // rename
  }
)(ProjectTreeContainer);

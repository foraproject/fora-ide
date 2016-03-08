import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadProject } from '../actions/project-actions';
import { getTotal, getCartProducts } from '../reducers';
import ProjectTree from '../components/project-tree';

class ProjectTreeContainer extends Component {
  render() {
    const { projects } = this.props;

    return (
      <ProjectTree
        projects={projects}
        onCheckoutClicked={() => this.props.checkout()} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    projects: getProjects(state)
  }
}

export default connect(
  mapStateToProps,
  {
    deleteItem,
    newDirectory,
    newFile,
    copyItem,
    rename
  }
)(ProjectTreeContainer);

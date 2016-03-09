import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadProject } from '../actions/project-actions';
import Workspace from '../components/workspace';

class WorkspaceContainer extends Component {
  render() {
    const { projects } = this.props;

    return (
      <Workspace
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
  { loadProject }
)(WorkspaceContainer);

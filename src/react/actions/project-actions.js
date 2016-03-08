export const LOAD_PROJECT = 'LOAD_PROJECT';

function loadProject(name) {
  return (dispatch) => {
    return dispatch({
      type: LOAD_PROJECT,
      name
    });
  }
}

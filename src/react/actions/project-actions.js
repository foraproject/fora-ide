export const BEGIN_GET_PROJECT = 'BEGIN_GET_PROJECT';
export const GET_PROJECT = 'GET_PROJECT';

import { getProject as API_getProject } from "../api/projects";

export function getProject(name) {
  return (dispatch) => {
    dispatch({ type: BEGIN_GET_PROJECT, name });
    API_getProject(name)
      .then((project) => dispatch({ type: "GET_PROJECT", project }));
  };
}

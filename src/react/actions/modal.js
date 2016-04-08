/* @flow */
export function openModal(children) {
  return { type: 'OPEN_MODAL', children };
}

export function closeModal() {
  return { type: 'CLOSE_MODAL' };
}

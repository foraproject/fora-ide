export default function (document, store) {
  function checkKeycodes(e, _action) {
    const action = {
      ctrlKey: _action.ctrlKey || false,
      altKey: _action.altKey || false,
      shiftKey: _action.shiftKey || false,
      keyCode: _action.keyCode
    }
    const charCode = (typeof e.which == "number") ? e.which : e.keyCode;
    return (action.ctrlKey == e.ctrlKey && action.altKey == e.altKey && action.shiftKey == e.shiftKey && action.keyCode == charCode);
  }

  const keyboardSettings = window.__nodejam_ide.keyboardSettings || {
    closeActiveFile: { ctrlKey: true, altKey: true, keyCode: 87 }
  };

  function onKeyPress(e) {
    if (checkKeycodes(e, { keyCode: 27 })) {
      contextMenuActions.closeContextMenu()(store.dispatch);
    }
    if (checkKeycodes(e, keyboardSettings.closeActiveFile)) {
      editorActions.closeActiveFile()(store.dispatch, store.getState);
      event.preventDefault();
    }
  }

  document.addEventListener("keydown", onKeyPress, false);
}

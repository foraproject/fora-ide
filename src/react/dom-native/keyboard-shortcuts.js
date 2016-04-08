/* @flow */
import * as editorActions from "../actions/editor";
import * as contextMenuActions from "../actions/context-menu";

function checkKeycodes(e, keyCombo) {
  const charCode = (typeof e.which == "number") ? e.which : e.keyCode;
  const match = (
    (keyCombo.ctrlKey || false) === e.ctrlKey &&
    (keyCombo.altKey || false) === e.altKey &&
    (keyCombo.shiftKey || false) === e.shiftKey &&
    (keyCombo.metaKey || false) === e.metaKey &&
    (keyCombo.keyCode || false) === charCode
  );
  return match;
}

export default function (document, store) {
  const keyboardSettings = getKeyboardSettings();

  function onKeyPress(e) {
    const setting = keyboardSettings.find(setting => setting.keys.some(keyCombo => checkKeycodes(e, keyCombo)));
    if (setting) {
      setting.actions.map(a => a());
    }
  }

  function getKeyboardSettings() {
    const keyboardSettings = window.__nodejam_ide.keyboardSettings || {};
    return [
      {
        keys: keyboardSettings.closeActiveFile || [{ ctrlKey: true, altKey: true, keyCode: 87 }, { metaKey: true, altKey: true, keyCode: 87 }],
        actions: [
          () => {
            editorActions.closeActiveFile()(store.dispatch, store.getState);
            event.preventDefault();
          }
        ]
      },
      {
        keys: [{ keyCode: 27 }],
        actions: [() => store.dispatch(contextMenuActions.closeContextMenu())]
      }
    ];
  }

  document.addEventListener("keydown", onKeyPress, false);
}

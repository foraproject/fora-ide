import React from "react";

class Editor extends React.Component {
  render() {
    return(
      <AceEditor
        mode="java"
        theme="github"
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{$blockScrolling: true}}
      />
  }
}

export default Editor;

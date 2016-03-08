import React from "react";
import AceEditor from "react-ace";

class Editor extends React.Component {
  onChange() {
  }

  render() {
    return(
      <AceEditor
        mode="java"
        theme="github"
        onChange={this.onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{$blockScrolling: true}}
      />
    );
  }
}

export default Editor;

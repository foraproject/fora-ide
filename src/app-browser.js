import __polyfill from "babel-polyfill";
import isotropy from "isotropy";
import reactPlugin from "isotropy-plugin-react";
import WorkspaceContainer from "./react/containers/workspace-container";

function fn() {
  const routes = [
    { url: `/`, method: "GET", component: WorkspaceContainer }
  ];

  const apps = [
    {
      type: "react",
      routes,
      path: "/"
    }
  ];

  isotropy(apps, [reactPlugin], {}).catch((e) => console.log(e.stack));
}

if (document.readyState !== 'loading'){
  fn();
} else {
  document.addEventListener('DOMContentLoaded', fn);
}

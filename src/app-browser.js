import __polyfill from "babel-polyfill";
import isotropy from "isotropy";
import reactPlugin from "isotropy-plugin-react";
import Workspace from "./react/workspace";

debugger;

const routes = [
  { url: `/`, method: "GET", component: Workspace }
];

const apps = [
  {
    type: "react",
    routes,
    path: "/"
  }
];

isotropy(apps, [reactPlugin], {}).catch((e) => console.log(e.stack));

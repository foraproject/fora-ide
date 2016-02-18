import __polyfill from "babel-polyfill";
import isotropy from "isotropy";
import Schema from "./data/schema";
import Workspace from "./react/workspace";

const uiModule = {
  routes: [
    { url: `/`, method: "GET", component: Workspace }
  ]
};

const apps = [
  { type: "graphql", schema: Schema },
  { type: "react", module: uiModule, path: "/" }
];

const options = {
  dir: __dirname,
  graphql: {
    graphiql: true
  },
  port: 8080
};

isotropy(apps, options).then((server) => console.log(`Listening on ${options.port}`));

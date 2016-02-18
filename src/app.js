import isotropy from "isotropy";
import Schema from "./data/schema";
import Workspace from "./react/Workspace";

const moduleConfig = {
  routes: [
    { url: `/${url}/:id`, method: "GET", component: MyComponent }
  ]
};

const apps = [
  { type: "graphql", schema: MySchema },
  { type: "react", module: moduleConfig, path: "/" }
];

const options = {
  dir: __dirname,
  graphql: {
    graphiql: true
  }
};

const { server } = await isotropy(apps, options);

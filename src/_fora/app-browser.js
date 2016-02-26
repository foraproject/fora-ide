import __polyfill from "babel-polyfill";
import isotropy from "isotropy";
import reactRoutes from "../react-routes";

const apps = [
  {
    type: "react",
    routes: reactRoutes,
    path: "/"
  }
];

isotropy(apps, {})
  .then((server) => console.log(`Listening on ${options.port}`))
  .catch((e) => console.log(e));

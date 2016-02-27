import __polyfill from "babel-polyfill";
import isotropy from "isotropy";
import webappPlugin from "isotropy-plugin-webapp";
import staticPlugin from "isotropy-plugin-static";
import home from "./webapp/home.js"

const plugins = [
  staticPlugin,
  webappPlugin
];

const template = (html) => `
<html>
  <head>
    <script src="/static/bundle.js"></script>
  </head>
  <body>
    <div class="">
    ${html}
    </div>
  </body>
</html>
`;

const routes = [
  { url: "/", method: "GET", handler: home.index }
];

const webapp = {
  type: "webapp",
  routes,
  path: "/",
  toHtml: template
};

const staticSite = {
  type: "static",
  path: "/static",
  dir: "static",
  onError: (req, res, e) => {
    e.handled = true;
    res.end(e.message);
  }
};

const apps = [webapp, staticSite];

const options = {
  dir: __dirname,
  port: 8080,
  onError: (req, res, e) => {
    if (!e.handled) {
      res.end(e.toString());
    }
  }
};

isotropy(apps, plugins, options)
  .then((server) => console.log(`Listening on ${options.port}`))
  .catch((e) => console.log(e.toString()));

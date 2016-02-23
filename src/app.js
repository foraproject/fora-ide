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
  {
    type: "react",
    module: uiModule,
    path: "/",
    toHtml: (html) => {
      return(
        `
        <html>
          <body>
            <div id="isotropy-container">
            ${html}
            </div>
          </body>
        </html>
      `);
    }
  }
];

const options = {
  dir: __dirname,
  port: 8080
};

isotropy(apps, options).then((server) => console.log(`Listening on ${options.port}`));

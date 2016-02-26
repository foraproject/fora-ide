import __polyfill from "babel-polyfill";
import isotropy from "isotropy";
import reactRoutes from "../react-routes";

const apps = [
  {
    type: "react",
    routes: reactRoutes,
    path: "/",
    toHtml: (html) => {
      console.log("yoyoy")
      return(`
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
  port: 8080,
  onError: (req, res, e) => {
    res.end(e.toString());
  }
};

isotropy(apps, options)
  .then((server) => console.log(`Listening on ${options.port}`))
  .catch((e) => console.log(e));

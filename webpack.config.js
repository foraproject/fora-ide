module.exports = {
  context: __dirname,
  entry: "./dist/app-browser.js",
  output: {
    path: __dirname + "/dist/static",
    filename: "bundle.js"
  },
  resolve: {
    alias: {
      "isotropy": "isotropy-in-dom",
      "isotropy-adapter-react": "isotropy-adapter-react-in-dom"
    }
  },
  module: {
    loaders: [
      { test: /\.json$/,   loader: "json-loader" }
    ]
  }
}

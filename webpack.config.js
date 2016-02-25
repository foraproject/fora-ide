module.exports = {
  context: __dirname,
  entry: "./dist/app-browser.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  resolve: {
    alias: {}
  },
  module: {
    loaders: [
      { test: /\.json$/,   loader: "json-loader" }
    ]
  }
}

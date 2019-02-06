const path = require('path');

module.exports = {
  entry: "./lib/map.js",
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: "bundle.js"
  },
  devtool: 'source-map',
};
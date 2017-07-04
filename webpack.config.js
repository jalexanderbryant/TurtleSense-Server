var path = require('path');
module.exports = {
  // Example setup for your project:
  // The entry module that requires or imports the rest of your project.
  // Must start with `./`!

  // entry: './src/entry',
  entry: './',
  // Place output files in `./dist/my-app.js`
  output: {
    // path: './dist',
    path: path.resolve(__dirname, 'dist'),
    filename: 'turtlesense.js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: './node_modules/'
      }
    ]
  }
};
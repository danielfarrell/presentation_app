const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Path helpers
function join(dest) { return path.resolve(__dirname, dest); }
function web(dest) { return join(`web/static/${dest}`); }

const config = module.exports = {
  devtool: 'source-map',
  entry: [
    web('css/app.scss'),
    web('js/app.js')
  ],
  resolve: {
    extensions: ['', '.js'],
    alias: {
      react: 'react',
      shared: path.resolve(__dirname, 'web', 'static', 'js', 'shared')
    }
  },
  output: {
    path: join('priv/static'),
    filename: 'js/app.js'
  },
  plugins: [
    new ExtractTextPlugin('css/app.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.(svg|eot|ttf|woff|woff2)$/, loaders: ['file?name=/fonts/[hash].[ext]'] },
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.css?$/, loaders: ['style', 'raw'] },
      { test: /\.scss?$/, loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass') }
    ]
  }
};

// if running webpack in production mode, minify files with uglifyjs
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  );
}

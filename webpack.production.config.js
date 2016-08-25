var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist', 'assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: ['es2015', 'stage-2', 'react'] }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader?autoprefixer&sourceMap', 'postcss-loader'])
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
        loader: 'file?name=fonts/[name].[ext]'
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        loader:'file?name=images/[name].[ext]'
      }
    ]
  },
  postcss: function(webpack) {
    return [
      require('postcss-easy-import')({addDependencyTo: webpack,prefix: '_'}),
      require('postcss-nested')(),
      require('postcss-url')(),
      require('postcss-mixins')(),
      require('postcss-extend')(),
      require('postcss-each')(),
      require('postcss-nth-list')(),
      require('postcss-for')(),
      require('postcss-simple-vars')(),
      require('postcss-custom-properties')(),
      require('postcss-strip-units')(),
      require('postcss-at-rules-variables')(),
      require('postcss-conditionals')(),
      require('postcss-calc')(),
      require('postcss-cssnext')({browsers: 'last 2 versions'}),
      require('css-mqpacker')(),
      require('postcss-utilities')()
    ];
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin("main.css"),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      "React": "react"
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['', '.js']
  }
};

const path = require('path');
const request = require('request');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const webpackConfig = require('./webpack.config.js');

const app = express();
const compiler = webpack(webpackConfig);
const dashboard = new Dashboard();
compiler.apply(new DashboardPlugin(dashboard.setData));

app.use(webpackMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.get(/^\/wp-json.*$/, (req, res) => {
  request('http://wocker.dev' + req.originalUrl).pipe(res);
});

app.get('*', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, 'dist', 'theme', 'index.php'));
});

app.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});

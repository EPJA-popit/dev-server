const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleWare = require('webpack-dev-middleware');
const { getModuleData } = require('./utils/module-package');
const applyHbs = require('@popit/templates');
const app = express();

const staticUrl = '/static';


const startServer = ({ port }) => {
  const moduleData = getModuleData();
  const appPath = `/${moduleData.cleanName}`;
  applyHbs(app);

  console.log(appPath);

  const compiler = webpack({
    mode: 'development',
    entry: './src/index.tsx',
    output: {
      filename: 'index.js',
      path: path.resolve('dist'),
      libraryTarget: 'umd',
      publicPath: '/static/dummy/1.0.0/'
    },
    resolve: {
      extensions: ['.tsx', '.js', '.ts', '.jsx', '.json ']
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }]
    } 
  });

  app.use(webpackDevMiddleWare(compiler, {
    publicPath: '/static/dummy/1.0.0/'
  }));

  app.get(appPath, function (req, res) {
    res.render('index', {
      staticUrl: staticUrl,
      fireAppVersion: '1.0.0/dist',
      apps: { 
        dummy: { 
          version: '1.0.0',
        } 
      },
      navigations: {
        'dummy': '/dummy',
        'dummy.login': '/dummy/login',
      },
      config: {},
      title: 'Popit app',
    });
  });

  app.use(
    staticUrl,
    express.Router().get(
      /\/([.-\w]+)\/([.-\w\d]+)\/(.*)/, 
      require('./utils/get-module')
    )
  );

  app.listen(port, () => {
    console.log(`❤️❤️❤️  Server started listening on http://localhost:${port}${appPath}  ❤️❤️❤️`);
  })
}

module.exports = { startServer };
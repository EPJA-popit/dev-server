const express = require("express");
const webpack = require("webpack");
const path = require("path");
const webpackDevMiddleWare = require("webpack-dev-middleware");
const { getModuleData } = require("./utils/module-package");
const applyHbs = require("@popit/templates");
const app = express();
const getProjectConfig = require("./utils/get-module-config");
const getModuleConfig = require("./utils/get-module-config");

const staticUrl = "/static";

console.log("in local dev-server");

const startServer = ({ port }) => {
  const moduleData = getModuleData();
  const appPath = `/${moduleData.cleanName}`;
  applyHbs(app);

  console.log(appPath);

  const compiler = webpack({
    mode: "development",
    devtool: "eval-source-map",
    entry: moduleData.entryPoint,
    output: {
      filename: "index.js",
      path: path.resolve("dist"),
      libraryTarget: "umd",
      publicPath: `/static/${moduleData.cleanName}/1.0.0/`,
    },
    resolve: {
      extensions: [".tsx", ".js", ".ts", ".jsx", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
        },
        {
          test: /\.js?$/,
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react",
              [
                "babel-preset-react-app",
                {
                  helpers: true,
                },
              ],
            ],
          },
        },
        {
          test: /\.svg?$/,
          loader: "file-loader",
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  });

  app.use(
    webpackDevMiddleWare(compiler, {
      publicPath: `/static/${moduleData.cleanName}/1.0.0/`,
    })
  );

  const config = getModuleConfig();

  app.get(appPath, function (req, res) {
    console.log("dev-server/index.js:L64");

    res.render("index", {
      staticUrl: staticUrl,
      fireAppVersion: "1.0.0/dist", // TODO: why dist here?
      apps: {
        ...(config.apps || {}),
        [moduleData.cleanName]: { version: "1.0.0" },
      },
      navigation: {
        ...(config.navigation || {}),
        [moduleData.cleanName]: appPath,
      },
      config: { ...(config.config || {}) },
      title: "Popit app",
    });
  });

  app.use(
    staticUrl,
    express
      .Router()
      .get(/\/([.-\w]+)\/([.-\w\d]+)\/(.*)/, require("./utils/get-module"))
  );

  app.listen(port, () => {
    console.log(
      `❤️❤️❤️  Server started listening on http://localhost:${port}${appPath}  ❤️❤️❤️`
    );
  });
};

module.exports = { startServer };

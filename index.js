const express = require('express');
const { getModuleData } = require('./utils/module-package');
const app = express();


const startServer = ({ port }) => {
  const moduleData = getModuleData();
  const appPath = `/${moduleData.cleanName}`;

  app.get(appPath, function (req, res) {
    res.send('Hello, ' + appPath.replace('/', ''));
  })

  app.listen(port, () => {
    console.log(`❤️❤️❤️  Server started listening on http://localhost:${port}${appPath}  ❤️❤️❤️`);
  })
}

module.exports = { startServer };
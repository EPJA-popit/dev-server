const express = require('express');
const { getModuleData } = require('./utils/module-package');
const applyHbs = require('@popit/templates');
const app = express();


const startServer = ({ port }) => {
  const moduleData = getModuleData();
  const appPath = `/${moduleData.cleanName}`;
  applyHbs(app);

  app.get(appPath, function (req, res) {
    res.render('index', {
      staticUrl: '/static',
      fireAppVersion: '1.0.0',
      apps: { 
        foo: { 
          version: '1.0.0', 
          name: 'foo' 
        } 
      },
      navigations: {
        'dummy.main': '/dummy',
        'dummy.login': '/dummy/login',
      },
      config: {},
      title: 'Popit app',
    })
    res.send('Hello, ' + appPath.replace('/', ''));
  })

  app.listen(port, () => {
    console.log(`❤️❤️❤️  Server started listening on http://localhost:${port}${appPath}  ❤️❤️❤️`);
  })
}

module.exports = { startServer };
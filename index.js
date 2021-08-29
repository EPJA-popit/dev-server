const express = require('express');
const app = express();

const startServer = ({ port }) => {
  app.listen(port, () => {
    console.log(`❤️❤️❤️  Server started listening on http://localhost:${port}/  ❤️❤️❤️`);
  })
}

module.exports = { startServer };
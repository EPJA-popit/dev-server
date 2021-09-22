module.exports = () => {
  const path = require("path");

  const packagepath = path.resolve("popit.config.js");

  return require(packagepath);
};

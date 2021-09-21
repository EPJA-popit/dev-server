const path = require("path");

const getLocalModulePath = (libName, filePath) => {
  return path.resolve("../node_modules", libName, filePath);
};

module.exports = (req, res) => {
  const libName = req.params[0];
  const libVersion = req.params[1];
  const libFilePath = req.params[2];

  let filePath;

  if (libName === "fire.app") {
    filePath = getLocalModulePath(`@popit/${libName}`, libFilePath);
  } else {
    filePath = getLocalModulePath(libName, libFilePath);
  }

  console.log(filePath);

  res.sendFile(filePath);
};

const getLocalModulePath = (libName, filePath) => {
  const path = require("path");

  return path.resolve("../node_modules", libName, filePath);
};

module.exports = (req, res) => {
  const libName = req.params[0];
  const libVersion = req.params[1];
  const libFilePath = req.params[2];

  console.log(
    "in utils/get-module!, name, v, path: ",
    libName,
    libVersion,
    libFilePath
  );

  let filePath;

  if (libName === "fire.app") {
    filePath = getLocalModulePath(`@popit/${libName}`, libFilePath);
  } else {
    filePath = getLocalModulePath(libName, libFilePath);
  }

  console.log("filePath is", filePath);

  res.sendFile(filePath);
};

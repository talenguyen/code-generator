require("./strings");

const parse = dir => {
  const sourcePattern = "java/";
  const sourceIndex = dir.indexOf(sourcePattern);
  let pkg;
  if (sourceIndex >= 0) {
    pkg = dir
      .substring(sourceIndex + sourcePattern.length, dir.length)
      .replaceAll("/", ".");
  } else {
    pkg = dir.replaceAll("/", ".");
  }
  return pkg;
};

module.exports = {
  parse
};

const View = require("./view");

const idPattern = 'android:id="@+id/';

const parse = xml => {
  var idIndex = xml.indexOf(idPattern);
  const views = [];
  while (idIndex > 0) {
    const endOfIdIndex = xml.indexOf('"', idIndex + idPattern.length);
    const id = xml.substring(idIndex + idPattern.length, endOfIdIndex);
    const subString = xml.substring(0, idIndex);
    const lastOpenTagIndex = subString.lastIndexOf("<");
    const nextSpaceIndex = subString.indexOf(" ", lastOpenTagIndex + 1);
    const tagName = subString
      .substring(lastOpenTagIndex + 1, nextSpaceIndex)
      .replace(/\r?\n|\r/g, "");
    const view = new View(tagName, id);
    views.push(view);
    idIndex = xml.indexOf(idPattern, idIndex + 1);
  }
  return views;
};

module.exports = {
  parse
};

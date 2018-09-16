#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const package = require("./src/package");
const viewParser = require("./src/view-parser");
const fileManager = require("./src/file-manager");

const View = require("./src/view");
const Holder = require("./src/holder");
const Model = require("./src/model");

const layoutFile = process.argv[2];
const name = process.argv[3];
const srcDir = process.argv[4];

//
const layout = path.basename(layoutFile, ".xml");
const pkg = package.parse(srcDir);
const srcFile = `${srcDir}/${name}Model.kt`

fileManager.read(layoutFile)
  .then(xml => viewParser.parse(xml))
  .then(views => new Holder(views))
  .then(holder => new Model(pkg, name, layout, holder))
  .then(model => fileManager.write(model.brew(), srcFile))
  .catch(err => console.error(err));

// const views = [new View("TextView", "text"), new View("ImageView", "image")];
// const holder = new Holder(views);
// console.log(holder.brew());
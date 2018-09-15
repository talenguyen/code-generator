#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { parse } = require("./src/package");
const View = require("./src/view");
const Holder = require("./src/holder");

const views = [new View("TextView", "text"), new View("ImageView", "image")];
const holder = new Holder(views);
console.log(holder.brew());

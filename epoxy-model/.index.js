#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const xmlFile = process.argv[2];
const name = process.argv[3];
const camelCaseName =
  name.charAt(0).toLowerCase() + name.substring(1, name.length);
const outputDir = process.argv[4];

const idPattern = 'android:id="@+id/';

const getViewsDeclaration = xmlFile => {
  return new Promise((resolve, reject) => {
    fs.readFile(xmlFile, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        var idIndex = data.indexOf(idPattern);
        var views = "";
        while (idIndex > 0) {
          const endOfIdIndex = data.indexOf('"', idIndex + idPattern.length);
          const id = data.substring(idIndex + idPattern.length, endOfIdIndex);
          const subString = data.substring(0, idIndex);
          const lastOpenTagIndex = subString.lastIndexOf("<");
          const nextSpaceIndex = subString.indexOf(" ", lastOpenTagIndex + 1);
          const tagName = subString
            .substring(lastOpenTagIndex + 1, nextSpaceIndex)
            .replace(/\r?\n|\r/g, "");
          views += `private val ${id}: ${tagName} by view(R.id.${id})\n`;
          idIndex = data.indexOf(idPattern, idIndex + 1);
        }
        resolve(views);
      }
    });
  });
};

const readViewHolderDelegateTemplate = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      __dirname + "/template/ViewHolderDelegateTemplate.txt",
      "utf-8",
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};
const parsePackage = dir => {
  const sourcePattern = "java/";
  const sourceIndex = dir.indexOf(sourcePattern);
  let package;
  if (sourceIndex >= 0) {
    package = dir
      .substring(sourceIndex + sourcePattern.length, dir.length)
      .split("/")
      .join(".");
  } else {
    package = dir.split("/").join(".");
  }
  return package;
};

const layoutName = path.basename(xmlFile, ".xml");
const package = parsePackage(outputDir);

getViewsDeclaration(xmlFile)
  .then(viewsDeclaration =>
    readViewHolderDelegateTemplate().then(template => {
      const appendedPackage = template.replace("<PACKAGE>", package);
      const appendedName = appendedPackage.split("<NAME>").join(name);
      const appendedCamelCaseName = appendedName
        .split("<CAMEL_CASE_NAME>")
        .join(camelCaseName);
      const appendedLayoutId = appendedCamelCaseName.replace(
        "<LAYOUT_ID>",
        layoutName
      );
      const appendedViewsDeclaration = appendedLayoutId.replace(
        "<VIEW_DECLARATION>",
        viewsDeclaration
      );
      return appendedViewsDeclaration;
    })
  )
  .then(content => {
    const outFile = `${outputDir}/${name}ViewHolderDelegate.kt`;
    fs.writeFile(outFile, content, "utf-8", err => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Create ${outFile} Successfully`);
      }
    });
  })
  .catch(err => console.error(err));
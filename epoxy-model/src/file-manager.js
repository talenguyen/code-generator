const fs = require("fs");

const read = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
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
}

const write = (content, file) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, content, "utf-8", err => {
      if (err) {
        reject(err)
      } else {
        resolve("success")
      }
    });
  });
}

module.exports = {
  read,
  write
}
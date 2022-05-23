const fs = require('fs');
const path = require('path');

const dir = '03-files-in-folder/secret-folder';

fs.readdir(dir, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.map((file) => {
      fs.stat(path.join(dir, file), (err, stats) => {
        if (err) {
          console.log(err);
        } else if (stats.isDirectory()) {
          return;
        } else {
          console.log(
            `${file.split('.').slice(0, -1).join('.')} - ${path
              .extname(file)
              .substring(1)} - ${convertBytes(stats.size)}`
          );
        }
      });
    });
  }
});
const convertBytes = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  if (i === 0) return `${bytes} ${sizes[i]}`;
  return `${(bytes / 1024 ** i).toFixed(3)} ${sizes[i]}`;
};

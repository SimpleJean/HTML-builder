const fs = require('fs');
const path = require('path');

const pathToDir = path.join(__dirname, 'styles');
const pathToDist = path.join(__dirname, 'project-dist/bundle.css');

const createBundleCss = () => {
  fs.readdir(pathToDir, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.map((file) => {
        if (path.extname(file) == '.css') {
          let readStream = fs.createReadStream(
            path.join(pathToDir, file),
            'utf8',
            'a+',
            (err) => {
              if (err) throw console.log(err);
            }
          );
          readStream.on('data', (chunk) => {
            fs.appendFile(pathToDist, chunk, (err) => {
              if (err) throw console.log(err);
              console.log('File appended');
            });
          });
        }
      });
    }
  });
};
createBundleCss();

fs.watch(pathToDir, (eventType, filename) => {
  if (eventType == 'rename') {
    console.log('File changed');
    clearFile();
  }
});

function clearFile() {
  fs.unlink(pathToDist, (err) => {
    if (err) throw console.log(err);
    createBundleCss();
  });
}

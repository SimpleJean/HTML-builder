const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const createProjectDist = path.join(__dirname, 'project-dist');
const templateHtml = path.join(__dirname, 'template.html');
const createNewHtml = path.join(createProjectDist, 'index.html');

//create a directory named project-dist
const makeDir = () => {
  fsPromises.mkdir(createProjectDist, { recursive: true });
};
makeDir();

//create a index.html file in project-dist
async function readComponents() {
  const componentsPath = path.join(__dirname, 'components');

  let readTemplate = await fsPromises.readFile(templateHtml, 'utf-8');
  fs.readdir(componentsPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(err);
    }
    files.map((file) => {
      let componentStream = fs.createReadStream(
        path.join(__dirname, 'components', file.name),
        {
          encoding: 'utf-8',
        }
      );
      componentStream.on('data', (chunk) => {
        readTemplate = readTemplate.replace(
          `{{${file.name.split('.')[0]}}}`,
          chunk
        );
        fs.writeFile(path.join(createNewHtml), readTemplate, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('index.html created');
          }
        });
      });
    });
  });
}
readComponents();

//merge and copy styles.css
const pathToDir = path.join(__dirname, 'styles');
const pathToDist = path.join(__dirname, 'project-dist/style.css');

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

//copy assets
const copyDir1 = path.join(__dirname, 'assets');
const newAssetsDir = path.join(createProjectDist, 'assets');
const fonts = path.join(createProjectDist, 'assets/fonts');
const images = path.join(createProjectDist, 'assets/img');
const svgs = path.join(createProjectDist, 'assets/svg');

const copyDir = () => {
  fs.mkdir(newAssetsDir, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    }
  });
  fs.mkdir(fonts, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    }
    fs.readdir(path.join(copyDir1, 'fonts'), (err, files) => {
      if (err) {
        console.log(err);
      } else {
        files.map((file) => {
          fs.copyFile(
            path.join(copyDir1, 'fonts', file),
            path.join(fonts, file),
            (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log(`${file} copied`);
              }
            }
          );
        });
      }
    });
  });
  fs.mkdir(images, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    }
    fs.readdir(path.join(copyDir1, 'img'), (err, files) => {
      if (err) {
        console.log(err);
      } else {
        files.map((file) => {
          fs.copyFile(
            path.join(copyDir1, 'img', file),
            path.join(images, file),
            (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log(`${file} copied`);
              }
            }
          );
        });
      }
    });
  });
  fs.mkdir(svgs, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    }
    fs.readdir(path.join(copyDir1, 'svg'), (err, files) => {
      if (err) {
        console.log(err);
      } else {
        files.map((file) => {
          fs.copyFile(
            path.join(copyDir1, 'svg', file),
            path.join(svgs, file),
            (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log(`${file} copied`);
              }
            }
          );
        });
      }
    });
  });
};
copyDir();

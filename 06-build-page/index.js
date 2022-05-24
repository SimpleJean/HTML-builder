const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const createProjectDist = path.join(__dirname, 'project-dist');
const templateHtml = path.join(__dirname, 'template.html');
const createNewHtml = path.join(createProjectDist, 'index.html');
const componentsPath = path.join(__dirname, 'components');

//create a directory named project-dist
const makeDir = () => {
  fsPromises.mkdir(createProjectDist, { recursive: true });
};
makeDir();

//create a file named index.html
const createHtml = async () => {
  const newFooter = await fsPromises.readFile(
    path.join(componentsPath, 'footer.html'),
    'utf-8'
  );
  const newHeader = await fsPromises.readFile(
    path.join(componentsPath, 'header.html'),
    'utf-8'
  );
  const newArticles = await fsPromises.readFile(
    path.join(componentsPath, 'articles.html'),
    'utf-8'
  );
  const template = await fsPromises.readFile(templateHtml, 'utf8');
  const newTemplate = template
    .replace(/{{header}}/g, newHeader)
    .replace(/{{articles}}/g, newArticles)
    .replace(/{{footer}}/g, newFooter);
  await fsPromises.writeFile(createNewHtml, newTemplate);
};
createHtml();

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

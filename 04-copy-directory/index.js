const fs = require('fs');

const copyDir1 = '04-copy-directory/files-copy';

const copyDir = () => {
  fs.mkdir(copyDir1, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    } else {
      fs.readdir('04-copy-directory/files', (err, files) => {
        if (err) {
          console.log(err);
        } else {
          files.map((file) => {
            fs.copyFile(
              `04-copy-directory/files/${file}`,
              `${copyDir1}/${file}`,
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
    }
  });
};
copyDir();

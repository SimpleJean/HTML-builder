const fs = require('fs');

const copyDir1 = '04-copy-directory/files-copy';
//Все скрипт работает в режиме отслеживания изменений в папке files
//Каждый раз запускать node 04-copy-directory НЕНУЖНО!
//Что бы остановить скрипт испрльзуйте команду ctrl+c в консоли
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

const watchToCopyDir = () => {
  fs.watch('04-copy-directory/files', (eventType, filename) => {
    if (filename) {
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
      if (eventType === 'rename') {
        fs.unlink(`${copyDir1}/${filename}`, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`${filename} deleted`);
          }
        });
      }
    }
  });
};
watchToCopyDir();
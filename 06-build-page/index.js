const fs = require('fs');
const path = require('path');

//create a directory named project-dist
fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {
  if (err) throw console.log(err);
    console.log('Directory created successfully.');
});
//create a file named bundle.css
//append all the css files in the styles directory to the bundle.css file

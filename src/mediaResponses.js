const fs = require('fs');
// path module is a collection of utilities for working w/ files & paths
const path = require('path');
// const http = require('http');

const loadMedia = (request, response, file) => {
  fs.stat(file, (err, stats) => {
    if (err) {
      // Error no entry -> Then the file couldnt be found
      if (err.code === 'ENOENT') {
        response.writeHead(404);
      }
      return response.end(err);
    }// end if(err)

    const img = fs.readFileSync(file);
    response.writeHead(206, {
      'Content-Type': 'image/png',
    });
    response.end(img);

    console.dir(stats);

    return (img);
  });// end fs.stat
};// end loadMedia

const getBaseballField = (request, response) => {
  const file = path.resolve(__dirname, '../images/baseballField.png');
  loadMedia(request, response, file);
};

module.exports.getBaseballField = getBaseballField;

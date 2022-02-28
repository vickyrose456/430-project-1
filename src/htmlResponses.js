const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const baseballFieldImg = fs.readFileSync(`${__dirname}/../images/baseballField.png`);

// helper fns
const serveFile = (response, file, contentType) => {
  response.writeHead(200, { 'Content-Type': contentType });
  response.write(file);
  response.end();
};

// Serve the client.html page
const getIndex = (request, response) => {
  serveFile(response, index, 'text/html');
};

const getImg = (request, response) => {
  serveFile(response, baseballFieldImg, 'image/png');
};

// Serve the style.css page
const getCSS = (request, response) => {
  serveFile(response, css, 'text/css');
};

module.exports = {
  getIndex,
  getImg,
  getCSS,
};

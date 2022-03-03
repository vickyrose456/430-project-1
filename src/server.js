const http = require('http');

const url = require('url');

const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const parseBody = (request, response, handler) => {
  const body = [];

  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);

    handler(request, response, bodyParams);
  });
}; // end parseBody

// handle POST requests
const handlePost = (request, response, parsedUrl) => {
  // If they go to /addUser
  if (parsedUrl.pathname === '/addUser') {
    parseBody(request, response, jsonHandler.addUser);
  }
  if (parsedUrl.pathname === '/searchUser') {
    parseBody(request, response, jsonHandler.searchUsers);
  }
};// end handlePost

const urlStruct = {

  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/getUsers': jsonHandler.getUsers,
    '/getSearchUsers': jsonHandler.getSearchUsers,
    '/notReal': jsonHandler.notFound,
    '/addUser': jsonHandler.addUser,
    '/searchUsers': jsonHandler.searchUsers,
    '/main.js': htmlHandler.getClientMain,
    '/client-header.js': htmlHandler.getClientHeader,
    '/baseballField': htmlHandler.getImg,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/getUsers': jsonHandler.getUsers,
    '/getSearchUsers': jsonHandler.getSearchUsers,
    '/notReal': jsonHandler.notFoundMeta,
    '/addUser': jsonHandler.addUser,
    '/searchUsers': jsonHandler.searchUsers,
    '/main.js': htmlHandler.getClientMain,
    '/client-header.js': htmlHandler.getClientHeader,
    '/baseballField': htmlHandler.getImg,
    notFound: jsonHandler.notFound,
  },
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});

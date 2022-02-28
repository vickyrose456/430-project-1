const users = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// return user object as JSON
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};

// function to add a user from a POST body
const addUser = (request, response, body) => {
  // default json message
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  if (!body.name || !body.pos) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // default status code to 204 updated
  let responseCode = 204;

  // If the user doesn't exist yet
  if (!users[body.pos]) {
    // Set the status code to 201 (created) and create an empty user
    responseCode = 201;
    users[body.pos] = {};
  }

  // add or update fields for this user name
  users[body.pos].name = body.name;
  users[body.pos].pos = body.pos;

  // if response is created, then set our created message
  // and sent response with a message
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
}; // end addUser

// function to show not found error
const notFound = (request, response) => {
  // error message with a description
  const responseJSON = {
    message: 'The page you are looking for was not found.',

  };

  // return our json with a 404 not found error code
  respondJSON(request, response, 404, responseJSON);
};// end not found

// function for 404 not found without message
const notFoundMeta = (request, response) => {
  // return a 404 without an error message
  respondJSONMeta(request, response, 404);
};// not found meta

// public exports
module.exports = {
  getUsers,
  addUser,
  notFound,
  notFoundMeta,
};

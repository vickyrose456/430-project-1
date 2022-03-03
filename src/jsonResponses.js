const players = {};
const searchPlayer = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// returns the players object as JSON
const getUsers = (request, response) => {
  const responseJSON = {
    players,
  };

  respondJSON(request, response, 200, responseJSON);
};// end get users\

const getSearchUsers = (request, response, body) => {
// default json message
  const responseJSON = {
    message: 'Name is required.',
  };

  // if nothing is entered into search input, print error msg
  if (!body.search) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // if the player searched for isnt found, error messsage
  if (!players[body.search]) {
    // not found error returned if the search is not in the player obj
    responseJSON.id = 'playerNotFound';
    return respondJSON(request, response, 404, responseJSON);
  }

  // return the data of the player JSON
  searchPlayer[body.search] = {
    name: players[body.search].name,
    pos: players[body.search].pos,
    team: players[body.search].team,
  };

  return respondJSON(request, response, 200, responseJSON);
}; // end searchUsers

const searchUsers = (request, response, search) => {
  // default json message
  const responseJSON = {
    message: 'Name is required.',
  };

  // if nothing is entered into search input, print error msg
  if (!search) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // default status code to 204 updated
  const responseCode = 204;

  // If the user doesn't exist yet
  for (let i = 0; i < players.length; i++) {
    if (!players[i].name !== search) {
    // send error msg
      responseJSON.id = 'playerNotFound';
      return respondJSON(request, response, 404, responseJSON);
    }
  }

  // store the player information into the search player obj to return back to user
  // players[body.pos] = body.name;
  searchPlayer.name = players[search].name;
  searchPlayer.pos = players[search].pos;
  searchPlayer.team = players[search].team;

  return respondJSONMeta(request, response, responseCode);
};

// function to add a user from a POST body
const addUser = (request, response, body) => {
  // default json message
  const responseJSON = {
    message: 'Name, team, and position are all required.',
  };

  if (!body.name || !body.pos || !body.team) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // default status code to 204 updated
  let responseCode = 204;

  // If the user doesn't exist yet
  if (!players[body.pos]) {
    // Set the status code to 201 (created) and create an empty user
    responseCode = 201;
    players[body.pos] = {};
  }

  // store the player information
  players[body.pos] = {
    name: body.name,
    pos: body.pos,
    team: body.team,
  };

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
  searchUsers,
  getSearchUsers,
  addUser,
  notFound,
  notFoundMeta,
};

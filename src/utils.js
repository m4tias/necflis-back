const jwt = require('jsonwebtoken');
const { ERRORS } = require('./constants');

const SECRET_TOKEN = 'drink.water';

function getUserId(context) {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, SECRET_TOKEN);
    return userId;
  }

  throw new Error(ERRORS.NOT_AUTHENTICATED);
}

module.exports = {
  SECRET_TOKEN,
  getUserId,
};

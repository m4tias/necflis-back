const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_TOKEN } = require('../../utils');
const { ERRORS } = require('../../constants');

module.exports = async function login(parent, args, context) {
  const user = await context.prisma.user({
    username: args.username,
  });

  if (!user) throw new Error(ERRORS.USER_NOT_FOUND);

  const validPassword = await bcrypt.compare(args.password, user.password);
  if (!validPassword) throw new Error(ERRORS.INVALID_PASSWORD);

  const token = jwt.sign({ userId: user.id }, SECRET_TOKEN);

  return { token };
};

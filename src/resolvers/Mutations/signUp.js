const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_TOKEN } = require('../../utils');

module.exports = async function signUp(parent, { input: args }, context) {
  const hashedPassord = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({
    ...args,
    password: hashedPassord,
  });
  const token = jwt.sign({ userId: user.id }, SECRET_TOKEN);
  return {
    token,
  };
}

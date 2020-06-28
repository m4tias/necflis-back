const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('../server/generated/prisma-client');
const resolvers = require('./resolvers');

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (req) => ({ ...req, prisma }),
});

const options = {
  port: 8000,
  cors: {
    origin: '*',
  },
};

server.start(options, () => {
  console.log('Server running on http://localhost:8000');
});

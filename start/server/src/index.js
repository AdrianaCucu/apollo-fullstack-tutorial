const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

const server = new ApolloServer({ typeDefs });

/**
 * Server opens GraphQL playground by default.
 * Can also see the schema from there.
 */
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

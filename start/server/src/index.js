const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const resolvers = require('./resolvers');

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

/**
 * Creates the DB by calling createStore.
 */
const store = createStore();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Connects LaunchAPI and UserAPI to the graph.
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store })
  })
});

/**
 * Server opens GraphQL playground by default.
 * Can also see the schema from there.
 */
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

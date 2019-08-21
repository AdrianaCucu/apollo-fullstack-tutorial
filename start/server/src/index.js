const { ApolloServer } = require('apollo-server');
const isEmail = require('isemail');
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
  // User info.
  context: async ({ req }) => {
    const auth = (req.headers && req.headers.authorization) || '';
    const email = Buffer.from(auth, 'base64').toString('ascii');

    if (!isEmail.validate(email)) return { user: null };

    const users = await store.users.findOrCreate({ where: { email } });
    const user = users && users[0] ? users[0] : null;

    return { user: { ...user.dataValues } };
  },

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

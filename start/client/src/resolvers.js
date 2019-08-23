import gql from 'graphql-tag';

/**
 * To build a local schema, we *extend* the types of the
 * server schema and wrap it with the gql function.
 *
 * We can also add local fields to server data by extending
 * types from the server.
 * e.g.: isInCart added to the Launch type
 */
export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }

  extend type Launch {
    isInCart: Boolean!
  }

  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [Launch]
  }
`;

export const resolvers = {};

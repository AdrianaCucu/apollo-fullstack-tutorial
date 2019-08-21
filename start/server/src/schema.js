const { gql } = require('apollo-server');

/**
 * GraphQL cheatsheet:
 *
 * https://devhints.io/graphql#schema
 */

const typeDefs = gql`
  type Query {
    # Queries for the launches
    launches(
      pageSize: Int
      after: String
    ): LaunchConnection!
    
    launch(id: ID!): Launch

    # Queries for the current user
    me: User
  }

  # The Mutation type is the entry point into the graph for modifying data
  type Mutation {
    # if false, booking trips failed -> check errors
    bookTrips(launchIds: [ID]!): TripUpdateResponse!

    # if false, cancellation failed -> check errors
    cancelTrip(launchId: ID!): TripUpdateResponse!

    # login token
    login(email: String): String
  }

  # Returns a list of launches, a cursor (tracks where we are in the list), and whether there is more data to be fetched
  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String # GraphQL can contain arguments, not just queries
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`;

module.exports = typeDefs;

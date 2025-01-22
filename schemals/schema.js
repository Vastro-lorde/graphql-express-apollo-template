import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { userQueries } from "./user/queries/queries.js";
import { userMutations } from "./user/mutations/mutations.js";
import { productQueries } from "./product/queries/queries.js";
import { productMutations } from "./product/mutations/mutations.js";

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...userQueries,
    ...productQueries
  },
});

// Mutation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...userMutations,
    ...productMutations
  }
});

export const rootSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

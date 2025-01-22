import { GraphQLObjectType, GraphQLString } from "graphql";

export const AuthOutputType = new GraphQLObjectType({
    name: "AuthOutputType",
    fields: () => ({
      token: { type: GraphQLString },
      exp: { type: GraphQLString },
      refreshToken: { type: GraphQLString },
    }),
});
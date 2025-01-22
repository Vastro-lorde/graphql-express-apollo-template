import { GraphQLInputObjectType, GraphQLUnionType, GraphQLString, GraphQLInt } from "graphql";

// Input type for regex-based filtering
export const StringFilterType = new GraphQLInputObjectType({
  name: "StringFilter",
  fields: {
    regex: { type: GraphQLString },
    options: { type: GraphQLString },
  },
});

// Input type for numeric filtering
export const IntFilterType = new GraphQLInputObjectType({
  name: "IntFilter",
  fields: {
    gt: { type: GraphQLInt },
    gte: { type: GraphQLInt },
    lt: { type: GraphQLInt },
    lte: { type: GraphQLInt },
    eq: { type: GraphQLInt },
  },
});

// Input type that allows either a simple integer or a filter object
export const IntUnionType = new GraphQLInputObjectType({
  name: "IntInput", 
  fields: {
    value: { type: GraphQLInt }, // The simple integer
    filter: { type: IntFilterType }, // The filter object (greater than, less than, etc.)
  }
});
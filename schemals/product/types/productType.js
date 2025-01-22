import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } from "graphql";

export const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLID },
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    userId: { type: GraphQLID },
    price: { type: GraphQLInt },
    stock: { type: GraphQLInt },
    category: { type: GraphQLString },
    image: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});
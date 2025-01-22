import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList } from "graphql";
import { getUserProducts } from "../resolvers/resolvers.js";
import { ProductType } from "../../product/types/productType.js";  // Regular import here

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
    password: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    products: {
      type: new GraphQLList(ProductType),  // Directly use the imported ProductType
      resolve: getUserProducts
    }
  }),
});

import { GraphQLString, GraphQLInt } from "graphql";
import { ProductType } from "../types/productType.js";
import { createProduct, updateProduct, deleteProduct } from "../resolvers/resolvers.js";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

export const productMutations = {
    createProduct: {
        type: ProductType,
        args: {
            name: { type: GraphQLString },
            description: { type: GraphQLString },
            userId: { type: GraphQLString },
            price: { type: GraphQLInt },
            stock: { type: GraphQLInt },
            category: { type: GraphQLString },
            image: { type: GraphQLString },
        },
        resolve: createProduct
    },
    updateProduct: {
        type: ProductType,
        args: {
            id: { type: GraphQLString },
            name: { type: GraphQLString },
            description: { type: GraphQLString },
            userId: { type: GraphQLString },
            price: { type: GraphQLInt },
            stock: { type: GraphQLInt },
            category: { type: GraphQLString },
            image: { type: GraphQLUpload },
        },
        resolve: updateProduct
    },
    deleteProduct: {
        type: ProductType,
        args: {
            id: { type: GraphQLString }
        },
        resolve: deleteProduct
    },
};
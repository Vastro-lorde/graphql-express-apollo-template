import { GraphQLID, GraphQLList, GraphQLInt } from "graphql";
import { ProductType } from "../types/productType.js";
import { getProduct, getProducts } from "../resolvers/resolvers.js";
import { StringFilterType, IntFilterType, IntUnionType } from "../../FilterTypes.js";

export const productQueries = {
    product: {
        type: ProductType,
        args: { id: { type: GraphQLID } },
        resolve: getProduct
    },
    products: {
        type: new GraphQLList(ProductType),
        args: { 
            category: { type: StringFilterType },
            name: { type: StringFilterType },
            stock: { type: IntUnionType },
            price: { type: IntUnionType },
            limit: { type: GraphQLInt },
            offSet: { type: GraphQLInt }
        },
        resolve: getProducts
    }
};
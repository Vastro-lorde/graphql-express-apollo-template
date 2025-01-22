import { GraphQLID, GraphQLList, GraphQLInt } from "graphql";
import { UserType } from "../types/userType.js";
import { getUser, getUsers } from "../resolvers/resolvers.js";
import { IntUnionType, StringFilterType } from "../../FilterTypes.js";

export const userQueries = {
    user: {
        type: UserType,
        args: { id: { type: GraphQLID } },
        resolve: getUser
    },
    users: {
        type: new GraphQLList(UserType),
        args: { 
            age: { type: IntUnionType },
            email: { type: StringFilterType },
            name: { type: StringFilterType },
            limit: { type: GraphQLInt},
            offSet: { type: GraphQLInt }
        },
        resolve: getUsers
    }
};
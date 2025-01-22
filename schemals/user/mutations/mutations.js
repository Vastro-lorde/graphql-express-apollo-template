
import { GraphQLString, GraphQLInt } from "graphql";
import { UserType } from "../types/userType.js";
import { createUser, updateUser, deleteUser } from "../resolvers/resolvers.js";
import { AuthOutputType } from "../types/authType.js";

export const userMutations = {
    createUser: {
        type: UserType,
        args: {
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            age: { type: GraphQLInt },
            password: { type: GraphQLString },
            confirmPassword: { type: GraphQLString }
        },
        resolve: createUser
    },
    updateUser: {
        type: UserType,
        args: {
            id: { type: GraphQLString },
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            age: { type: GraphQLInt },
            password: { type: GraphQLString }
        },
        resolve: updateUser
    },
    deleteUser: {
        type: UserType,
        args: {
            id: { type: GraphQLString }
        },
        resolve: deleteUser
    },
    login: {
        type: AuthOutputType,
        args: {
            email: { type: GraphQLString },
            password: { type: GraphQLString }
        },
        resolve: createUser
    },
};
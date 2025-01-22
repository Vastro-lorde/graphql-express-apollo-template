import { GraphQLError } from "graphql";

export const INTERNAL_SERVER_ERROR = (message) => {
    return new GraphQLError(message, {
        extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            hideStackTrace: true
        }
    });
};

export const BAD_USER_INPUT = (message) => {
    return new GraphQLError(message, {
        extensions: {
            code: 'BAD_USER_INPUT',
            hideStackTrace: true
        }
    });
};

export const FORBIDDEN = (message) => {
    return new GraphQLError(message, {
        extensions: {
            code: 'FORBIDDEN',
            hideStackTrace: true
        }
    });
};

export const NOT_FOUND = (message) => {
    return new GraphQLError(message, {
        extensions: {
            code: 'NOT_FOUND',
            hideStackTrace: true
        }
    });
};

export const UNAUTHORIZED = (message) => {
    return new GraphQLError(message, {
        extensions: {
            code: 'UNAUTHORIZED',
            hideStackTrace: true
        }
    });
};
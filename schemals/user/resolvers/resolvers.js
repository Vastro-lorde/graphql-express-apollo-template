import { GraphQLError } from "graphql";
import { CACHE_TTL } from "../../../secrets.js";
import { INTERNAL_SERVER_ERROR } from "../../../utils/errorHelper.js";
import { convertToMongoDBFilters } from "../../../services/queryServices.js";

export const createUser = async (parent, args, { db }) => {
    const user = new db.model('User')({
        name: args.name,
        email: args.email,
        age: args.age,
        password: args.password,
        confirmPassword: args.confirmPassword
    });
    try {
        if (user.password !== user.comfirmPassword) {
            throw new GraphQLError("Password and comfirmPassword not matched.", {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    hideStackTrace: true
                }
            });
        }
        return await user.save();
    } catch (err) {
        if (err.code === 11000) {
            if (err.code === 11000) {
                // Using formatError to customize the error format
                throw new GraphQLError("Email already exists.", {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        hideStackTrace: true
                    }
                });
            }
            throw new GraphQLError("Internal Server Error", {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    hideStackTrace: true
                }
            });
        }
    }
};

export const getUser = async (parent, args, { redis, db }) => {
    const cachekey = JSON.stringify(args);
    try {
        const cached = await redis.get(cachekey);
        if (cached) {
            return cached;
        }
        const result = await db.model('User').findById(args.id).exec();
        await redis.set(cachekey, result, CACHE_TTL);
        return result;
    } catch (error) {
        throw INTERNAL_SERVER_ERROR("Error fetching user");
    }
};

export const getUsers = async (parent, args, { redis, db }) => {
    const { limit, offSet, ...filters } = args;
    const mongoFilters = convertToMongoDBFilters(filters);
    const cachekey = JSON.stringify(args);
        const cached = await redis.get(cachekey);
        if (cached) {
          return cached;
        }
        try {
            const result = await db.model('User').find(mongoFilters).skip(offSet || 0).limit(limit || 10).exec();
            await redis.set(cachekey, result, CACHE_TTL);
            return result;
        } catch (error) {
            throw INTERNAL_SERVER_ERROR(error.message);
        }
};

export const deleteUser = async (parent, args, { db }) => {
    try {
        const result = await db.model('User').findByIdAndRemove(args.id).exec();
        return result;
    } catch (error) {
        throw INTERNAL_SERVER_ERROR(error.message);
    }
    
}

export const updateUser = async (parent, args, { db }) => {
    try {
        const result = await db.model('User').findByIdAndUpdate(args.id, args).exec();
        return result;
    } catch (error) {
        throw INTERNAL_SERVER_ERROR(error.message);
    }
}

export const getUserProducts = async (parent, args, { redis, db }) => {
    const cachekey = JSON.stringify(args);
    try {
        const cached = await redis.get(cachekey);
        if (cached) {
            return cached;
        }
        const result = await db.model('Product').find({ userId: parent.id ?? parent._id }).exec();
        await redis.set(cachekey, result, CACHE_TTL);
        return result;
    } catch (error) {
        throw INTERNAL_SERVER_ERROR(error.message);
    }
}

export const getProductsUser = async (parent, args, { redis, db }) => {
    const cachekey = JSON.stringify(args);
    try {
        const cached = await redis.get(cachekey);
        if (cached) {
            return cached;
        }
        const result = await db.model('User').findById(parent.userId).exec();
        await redis.set(cachekey, result, CACHE_TTL);
        return result;
    } catch (error) {
        throw INTERNAL_SERVER_ERROR(error.message);
    }
}
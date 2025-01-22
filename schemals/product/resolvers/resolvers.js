import { GraphQLError } from "graphql";
import { CACHE_TTL } from "../../../secrets.js";
import { INTERNAL_SERVER_ERROR } from "../../../utils/errorHelper.js";
import { convertToMongoDBFilters } from "../../../services/queryServices.js";

export const createProduct = async (parent, args, { db }) => {
    try {
        const product = db.model('Product')({
            name: args.name,
            description: args.description,
            userId: args.userId,
            price: args.price,
            stock: args.stock,
            category: args.category,
            image: args.image
        });
        return await product.save();
    } catch (err) {
        throw INTERNAL_SERVER_ERROR(err.message);
    }
};

export const getProduct = async (parent, args, { redis, db }) => {
    const cachekey = JSON.stringify(args);
    try {
        const cached = await redis.get(cachekey);
        if (cached) {
            return cached;
        }
        const result = await db.model('Product').findById(args.id).exec();
        await redis.set(cachekey, result, CACHE_TTL);
        return result;
    } catch (error) {
        throw INTERNAL_SERVER_ERROR("Error fetching product");
    }
};

export const getProducts = async (parent, args, { redis, db }) => {
    const { limit, offSet, ...filters } = args;
    const mongoFilters = convertToMongoDBFilters(filters);
    const cachekey = JSON.stringify(args);
    try {
        const cached = await redis.get(cachekey);
        if (cached) {
            return cached;
        }
        const result = await db.model('Product').find(mongoFilters).skip(offSet || 0).limit(limit || 10).exec();
        await redis.set(cachekey, result, CACHE_TTL);
        return result;
    } catch (error) {
        throw INTERNAL_SERVER_ERROR("Error fetching products");
    }
};

export const updateProduct = async (parent, args, { db }) => {
    try {
        return await db.model('Product').findByIdAndUpdate(args.id, args).exec();   
    } catch (error) {
        throw INTERNAL_SERVER_ERROR("Error updating product");
    }
}

export const deleteProduct = async (parent, args, { db }) => {
    try {
        return await db.model('Product').findByIdAndRemove(args.id).exec();
    } catch (error) {
        throw INTERNAL_SERVER_ERROR("Error deleting product");
    }
}
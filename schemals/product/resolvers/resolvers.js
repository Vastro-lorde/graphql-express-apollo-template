import { GraphQLError } from "graphql";
import { CACHE_TTL } from "../../../secrets.js";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../../../utils/errorHelper.js";
import { convertToMongoDBFilters } from "../../../services/queryServices.js";
import { updateFile, uploadFile } from "../../../utils/cloudinaryHelper.js";

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
        throw INTERNAL_SERVER_ERROR(error.message);
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
    const { id, image, ...updateFields } = args;

    // Fetch the existing product
    const existingProduct = await db.model('Product').findById(id).exec();
    if (!existingProduct) {
        throw NOT_FOUND(error.message);
    }

    // Handle image update if a new image is provided
    let updatedImageUrl = existingProduct.image; // Retain the current image by default
    if (image) {
      const { createReadStream } = await image;

      if (existingProduct.image) {
        // Update the image if an existing one is present
        updatedImageUrl = (await updateFile(existingProduct.image, createReadStream())).secure_url;
      } else {
        // Upload a new image if none exists
        updatedImageUrl = (await uploadFile(createReadStream())).secure_url;
      }
    }

    // Update the product fields
    const updatedProduct = await db
      .model('Product')
      .findByIdAndUpdate(
        id,
        { ...updateFields, image: updatedImageUrl },
        { new: true }
      )
      .exec();

    return updatedProduct;
  } catch (error) {
    throw INTERNAL_SERVER_ERROR(error.message);
  }
};

// export const updateProduct = async (parent, args, { db }) => {
//     try {
//         return await db.model('Product').findByIdAndUpdate(args.id, args).exec();   
//     } catch (error) {
//         throw INTERNAL_SERVER_ERROR("Error updating product");
//     }
// }

export const deleteProduct = async (parent, args, { db }) => {
    try {
        return await db.model('Product').findByIdAndRemove(args.id).exec();
    } catch (error) {
        throw INTERNAL_SERVER_ERROR(error.message);
    }
}
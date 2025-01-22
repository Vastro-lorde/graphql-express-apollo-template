//Database
export const MONGO_URI = process.env.MONGO_URI;

//Server
export const PORT = process.env.PORT;
//Cloudinary
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
//JWT
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_ISSUER = process.env.JWT_ISSUER;
export const JWT_AUDIENCE = process.env.JWT_AUDIENCE;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const JWT_COOKIE_EXPIRES_IN = process.env.JWT_COOKIE_EXPIRES_IN;
export const JWT_COOKIE_SECURE = process.env.JWT_COOKIE_SECURE;
export const JWT_COOKIE_HTTP_ONLY = process.env.JWT_COOKIE_HTTP_ONLY;

//Cache
export const CACHE_TTL = process.env.CACHE_TTL;
export const CACHE_MAX_ITEMS = process.env.CACHE_MAX_ITEMS;
export const CLEANUP_INTERVAL_MS = process.env.CLEANUP_INTERVAL_MS ?? 60000;

//Redis
export const REDIS_HOST = process.env.REDIS_HOST;
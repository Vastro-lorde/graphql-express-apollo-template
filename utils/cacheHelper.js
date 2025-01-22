const { CLEANUP_INTERVAL_MS, CACHE_TTL } = require("../secrets");

/**
 * @typedef {Object} CacheItem
 * @property {string} value - Stored as a serialized JSON string
 * @property {number|null} expiration - Timestamp for expiration, null if no expiration
 */
// Cache storage
const cache = new Map();

/**
 * Set a value in the cache.
 * @param {string} key - The key to identify the cached item
 * @param {*} value - The value to store
 * @param {number} [ttl] - Time-to-live in seconds (optional)
 */
const setCache = (key, value, ttl = CACHE_TTL) => {
    const expiration = ttl ? Date.now() + ttl * 1000 : null;
    const serializedValue = JSON.stringify(value);

    const item = {
        value: serializedValue,
        expiration,
    };

    cache.set(key, item);

    if (ttl) {
        setTimeout(() => {
            const current = cache.get(key);
            if (current && current.expiration && current.expiration <= Date.now()) {
                cache.delete(key);
            }
        }, ttl * 1000);
    }
};

/**
 * Get a value from the cache.
 * @param {string} key - The key to retrieve the cached item
 * @returns {*} The cached value or null if not found or expired
 */
const getCache = (key) => {
    const item = cache.get(key);

    if (!item) {
        return null;
    }

    if (item.expiration && Date.now() > item.expiration) {
        cache.delete(key); // Remove expired item
        return null;
    }

    try {
        return JSON.parse(item.value);
    } catch (error) {
        console.error('Error parsing cached value:', error);
        return null;
    }
};

/**
 * Remove a value from the cache.
 * @param {string} key - The key to delete from the cache
 */
const deleteCache = (key) => {
    cache.delete(key);
};

/**
 * Clear all items from the cache.
 */
const clearCache = () => {
    cache.clear();
};

/**
 * Periodic cleanup to remove expired items.
 */
const periodicCleanup = () => {
    const now = Date.now();

    cache.forEach((item, key) => {
        if (item.expiration && item.expiration <= now) {
            cache.delete(key);
        }
    });
};

// Start periodic cleanup
setInterval(periodicCleanup, CLEANUP_INTERVAL_MS);

export {
    setCache,
    getCache,
    deleteCache,
    clearCache
};
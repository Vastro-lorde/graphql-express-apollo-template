/**
 * Converts GraphQL-style filters into MongoDB filters.
 * @param {Object} filters - The GraphQL filters.
 * @returns {Object} - The MongoDB filters.
 */
export const convertToMongoDBFilters = (filters) => {
    const mongoFilters = {};

    for (const key in filters) {
      const value = filters[key];

      if (typeof value === 'object' && value !== null && !Array.isArray(value) && value.value === undefined) {
        // Treat as operator-based filter
        mongoFilters[key] = {};

        if (value.filter !== undefined) {
          if (value.filter.gt !== undefined) mongoFilters[key].$gt = value.filter.gt;
          if (value.filter.gte !== undefined) mongoFilters[key].$gte = value.filter.gte;
          if (value.filter.lt !== undefined) mongoFilters[key].$lt = value.filter.lt;
          if (value.filter.lte !== undefined) mongoFilters[key].$lte = value.filter.lte;
          if (value.filter.eq !== undefined) mongoFilters[key].$eq = value.filter.eq;
        }
        if (value.regex !== undefined) {
          mongoFilters[key].$regex = value.regex;
          if (value.options) mongoFilters[key].$options = value.options; // e.g., "i" for case-insensitive
        }
      } else {
        // Treat as direct match
        mongoFilters[key] = value.value ?? value;
      }
    }

    return mongoFilters;
};


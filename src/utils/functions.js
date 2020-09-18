// Save utility functions that do not fall under the formatters sub group

/**
 * Tries to return value at the end of a sequence of keys.
 * E.g. given an obj and keys = ['1', '2', '3'], it will try to return obj['1']['2']['3'].
 * Uses the defaultValue on error.
 * @param {Object} obj        Object you want to access
 * @param {string[]} keys     List of keys you want to sequence through
 * @param {?*} [defaultValue] Default value in case keys do not exist
 * @param {?boolean} [debug]  Use to debug access, Logs the Object and List of keys you requested
 */
export const access = (obj, keys, defaultValue = null, debug = false) => {
    if (debug) {
        // Only used for debugging
        console.log(obj, keys);
    }
    let ref = obj;
    try {
        keys.forEach((key) => ref = ref[key]);
    } catch (err) {
        if (err instanceof TypeError) {
            return defaultValue;
        }
        throw err;
    }
    if (ref === undefined) return defaultValue;
    return ref;
};
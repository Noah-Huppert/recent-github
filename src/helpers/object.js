/**
 * Ensures that the provided keys are present in an object. Throws an error if they are not
 * @param obj {Object} Object to check keys for
 * @param keys {[String]} Keys which are required
 * @throws {Error} If required key is not present
 */
export default function RequireKeys(obj, keys) {
    // Get keys obj has
    let hasKeys = Object.keys(obj);

    // Check against required keys
    var missingKeys = [];

    for (var reqKey of keys) {
        // If doesn't exist
        if (hasKeys.indexOf(reqKey) === -1) {
            // Add to list of missing keys
            missingKeys.push(reqKey);
        }
    }

    // Throw error if any keys are missing
    if (missingKeys.length > 0) {
        throw new Error(`Object does not have required keys: ${missingKeys.join(", ")}`);
    }
}
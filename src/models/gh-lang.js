/**
 * Holds information about languages used in a GitHub repository
 */
export class GHLang {
    /**
     * Creates a new GHLang instance
     * @param name {String} Name of language
     * @param lines {number} Number of lines of code which is in language in repository
     */
    constructor(name, lines) {
        this.name = name;
        this.lines = lines;
    }
}

/**
 * Creates an array of GH languages based on an API response.
 * Meant to work with api.github.com/repos/<user>/<repo>/languages
 * @param resp {Object} API response
 * @returns {[GHLang]} Array of GH languages in request
 * @throws {Error} If any key value of provided object is not a number
 */
export function GHLangsFromAPIResp(resp) {
    // Loop through keys of response
    let keys = Object.keys(resp);
    var langs = [];

    for (var k of keys) {
        // Get number of lines lang was used in
        let count = resp[k];

        // Check number
        if (typeof count !== "number") {
            throw new Error(`Type of value for key ${k} must be number, was: ${typeof resp[k]}`);
        }

        // Make GHLang and append to array
        langs.push(new GHLang(k, count));
    }

    return langs;
}
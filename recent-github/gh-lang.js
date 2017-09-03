/**
 * Holds information about languages used in a GitHub repository
 */
class GHLang {
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

module.exports = GHLang;
/**
 * Holds useful information about a GitHub repository
 */
class Repo {
    /**
     * Creates a new instance of Repo
     * @param name {String} Name of repository
     * @param fullName {String} GitHub username and repository name combined with a slash between them
     * @param description {String} Short description of repository
     * @param pushedAt {Date} Date most recent commit was pushed to repository
     * @param stars {number} Number of stars repository has on GitHub
     * @param languages {[GHLang]} Array of programming languages used in repository
     * @param authoredCommits {number} Number of commits the owner of the repository made
     */
    constructor(name, fullName, description, pushedAt, stars, languages, authoredCommits) {
        this.name = name;
        this.fullName = fullName;
        this.description = description;
        this.pushAt = pushedAt;
        this.stars = stars;
        this.languages = languages;
        this.authoredCommits = authoredCommits;
    }
}

module.exports = Repo;
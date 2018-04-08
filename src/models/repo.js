import RequireKeys from "../helpers/object.js";
import UserFromAPIResp from "./user.js";
import GHLangsFromAPIResp from "./gh-lang.js";

/**
 * Holds useful information about a GitHub repository
 */
export class Repo {
    /**
     * Creates a new instance of Repo
     * @param name {String} Name of repository
     * @param owner {Owner} GitHub repo owner
     * @param description {String} Short description of repository
     * @param pushedAt {Date} Date most recent commit was pushed to repository
     * @param stars {number} Number of stars repository has on GitHub
     * @param languages {[GHLang]} Array of programming languages used in repository
     * @param authoredCommits {number} Number of commits the owner of the repository made
     */
    constructor(name, owner, description, pushedAt, stars, languages, authoredCommits) {
        this.name = name;
        this.owner = owner;
        this.description = description;
        this.pushedAt = pushedAt;
        this.stars = stars;
        this.languages = languages;
        this.authoredCommits = authoredCommits;
    }
}

/**
 * Constructs a Repo class instance from a GitHub API response. The response is epected to be a list of Repo API objects.
 * Meant to work with individual items from the api.github.com/users/<user>/repos endpoint
 * @param resp {Object} API response
 * @returns {Promise<Repo>} Promise which resolves with repo made from response, or rejects with error
 */
export function RepoFromAPIResp(resp) {
    // Check for required keys
    let required = [
        "name", "owner", "description", "pushed_at", "stargazers_count", "languages_url", "commits_url"
    ];

    RequireKeys(resp, required);

    // Parse owner
    var owner;
    try {
        owner = UserFromAPIResp(resp.owner);
    } catch(e) {
        throw new Error(`Error creating user from api response: ${e}`);
    }

    // Parse languages
    var langs = [];
    try {
        langs = GHLangsFromAPIResp(resp.)
    }
}
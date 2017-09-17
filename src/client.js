const axios = require("axios");
const axiosError = require("./axios-error");

// Defaults
/**
 * The default limit value to pass to the Client.getRecentRepos method
 * @type {number}
 */
const DEFAULT_LIMIT = 5;

/**
 * The default options for a Client
 * @type {{sort: string}}
 */
const DEFAULT_OPTIONS = {
    sort: "pushed"
};

// Urls
/**
 * Url to users resource on GitHub API
 * @type {string}
 */
const URL_USERS = "https://api.github.com/users";
/**
 * Part of url to put after a username appended to URL_USERS. Lists repos for specific user.
 * @type {string}
 */
const URL_PART_REPOS = "/repos";

/**
 * Interface for fetching information on personal repository information
 */
class Client {
    /**
     * Creates a new Client instance
     * @param username {String} Username of GitHub user to fetch recent repository activity for
     * @param options {Object} Optional options to augment client behavior. Can provide any listed option from the
     *                         GitHub API user repos endpoint: https://developer.github.com/v3/repos/#list-your-repositories
     *
     *                         If no options are provided sort=pushed will be provided by default
     */
    constructor(username, options) {
        this.username = username;
        this.options = options;

        // Set options to default if not provided
        if (!options) {
            this.options = DEFAULT_OPTIONS;
        }
    }

    /**
     * With default Client options this method will return a list of recent repositories which the provided user pushed
     * to. The results of this GitHub API request will be augmented with the options provided in the Client.constructor
     * @param limit {number} Limit on how many repositories to return, defaults to 5, if -1 is provided no limit is
     *                       enforced
     * @returns {Promise} To be completed when recent repos are retrieved
     *                    Resolves with {[Repo]}
     *                    Rejects with {AxiosError}
     */
    getRecentRepos(limit) {
        // Set limit to default if not provided
        if (!limit) {
            limit = DEFAULT_LIMIT;
        }

        // List user repos
        return axios.get(`${URL_USERS}/${this.username}${URL_PART_REPOS}`, {
            params: this.options
        }).then((resp) => {
            console.log(`then: ${resp}`);
        }).catch(axiosError.Handle).catch((err) => {
            console.error(`catch:`, err);
        });
    }
}

module.exports = {
    DEFAULT_LIMIT: DEFAULT_LIMIT,
    DEFAULT_OPTIONS: DEFAULT_OPTIONS,
    URL_USERS: URL_USERS,
    URL_PART_REPOS: URL_PART_REPOS,
    Client: Client
};
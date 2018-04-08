import RequireKeys from "../helpers/object.js";

export class User {
    /**
     * Creates a new Owner class instance
     * @param login {String} Username of user
     * @param id {Number} GitHub numerical id of user
     * @param avatarUrl {String} Url to user avatar
     * @param name {String} Name of user
     */
    constructor(login, id, avatarUrl, name) {
        this.login = login;
        this.id = id;
        this.avatarUrl = avatarUrl;
        this.name = name;
    }
}

/**
 * Creates and returns a new User class instance from a GitHub API response.
 * Written to work on api.github.com/users/<user>
 * @param resp {Object} API response
 * @returns {User} User from API response
 * @throws {Error} If any of the required keys are not present
 */
export function UserFromAPIResp(resp) {
    // Check keys
    let required = [
        "login", "id", "avatar_url", "name"
    ];

    RequireKeys(resp, required);

    // Create object and return if all good
    return new User(resp.login, resp.id, resp.avatar_url, resp.name);
}
function _requestCallback(out, req, resolve, reject) {
    return () => {
        // Response
        out.rawResp = req.responseText;

        // Try to parse into json response object
        try {
            out.parsedResp = JSON.parse(out.rawResp);
        } catch (e) {
            out.errorData = e;

            // If syntax error
            if (e instanceof SyntaxError) {
                out.errorType = "syntax";
            } else {
                // Unknown error
                out.errorType = "unknown";
            }
        }

        // If all good http code
        if (req.readyState === 4 && req.status === 200) {
            // Check if json failed
            out.nonJsonSuccess = true;

            if (out.parsedResp === null) {
                // Set partial failure
                out.success = false;
                return reject(out);
            } else {
                // Complete success!
                out.success = true;
                return resolve(out);
            }
        } else if (req.readyState === 4) {
            // If completed but not http
            out.errorType += "not200";
            return reject(out);
        }
    };
}

/**
 * Makes a HTTP to the given url with the provided method.
 * @param method {string} HTTP method, must be one of: POST, GET, PUT, DELETE
 * @param url {string} Valid url
 * @param urlOptions {object} Object to convert into url query params
 * @returns {Promise} To be completed when request response is received. Resolves and rejects with an object containing
 *                    the following keys:
 *
 *                       - url (string): Url request was made to
 *                       - method (string): HTTP method used for request
 *                       - urlOptions (object): Url query options passed in request
 *                       - success (bool): Specifies if request was a success
 *                       - nonJsonSuccess (bool): If the request you expect can not be parsed into valid json then look
 *                                                to this variable to determine if the request was a success. If a request
 *                                                succeeds but fails to be parsed into json: success=false but nonJsonSuccess=true
 *                       - errorType (string): If req was a failure, string representing error type, null if req was a
 *                                             success, allowed values: syntax, badrequest, not200, unknown
 *
 *                                             badrequest: request failed
 *                                             not200: request response did not contain a 200 http code value
 *
 *                                             A errorType with value `syntax` means the request was a success, but the
 *                                             body was not parsed from json. This could be perfectly fine, as you might
 *                                             not expect a json parsable response. So this error type can sometimes be
 *                                             ignored, although success will still be false and the promise will reject.
 *                       - errorData (object): The raw error that was caught if req was a failure, if req was success
 *                                             then null
 *                       - status (int): HTTP status int
 *                       - rawResp (string): Raw response text, null if req was a failure
 *                       - parsedResp (object): JSON parsed rawResp, null if req was a failure
 */
function Request(method, url, urlOptions) {
    // Check method
    if (method != "POST" &&
        method != "GET" &&
        method != "PUT" &&
        method != "DELETE") {
        return Promise.reject(new Error(`method must be one of: POST, GET, PUT, or DELETE, was: ${method}`));
    }

    // Modify url with urlOptions
    let keys = Object.keys(urlOptions);
    if (keys.length > 0) {
        // If keys start adding onto url
        url += "?";

        for (var i = 0; i < keys.length; i++) {
            let name = keys[i];

            url += `${name}=${urlOptions[name]}`

            // Add `&` if not last option
            if (i != keys.length - 1) {
                url += "&";
            }
        }
    }

    // Make request
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();

        // callback
        var out = {
            url: url,
            method: method,
            urlOptions: urlOptions,
            success: false,
            nonJsonSuccess: false,
            errorType: null,
            errorData: null,
            status: req.status,
            rawResp: null,
            parsedResp: null
        };
        req.onreadystatechange = _requestCallback(out, req, resolve, reject);

        req.open(method, url, true);// true for async request
        req.send(null);
    });
}

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
export class Client {
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
        return Request("GET", `${URL_USERS}/${this.username}${URL_PART_REPOS}`, this.options)
        .then((resp) => {

        }).catch((err) => {
            console.error(`catch:`, err);
            return Promise.reject(err);
        });
    }
}

export default {
    DEFAULT_LIMIT: DEFAULT_LIMIT,
    DEFAULT_OPTIONS: DEFAULT_OPTIONS,
    URL_USERS: URL_USERS,
    URL_PART_REPOS: URL_PART_REPOS,
    Client: Client,
    Request: Request
};
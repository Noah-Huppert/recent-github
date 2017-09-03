/**
 * The purpose of the axios-error module is to take the errors provided by rejected promises from the Axios Http library
 * and make them more simple and usable.
 *
 * This is necessary because a lot of the same boilerplate code is needed to handle errors with axios: https://github.com/mzabriskie/axios#handling-errors
 */

// Error codes
/**
 * Signifies error occurred due to a non 200 http code response from the server
 * @type {number}
 */
const ERR_NOT_200 = 1;
/**
 * Signifies error occurred due to no response being received from the server
 * @type {number}
 */
const ERR_NO_RESP = 2;
/**
 * Signifies error occurred while making request
 * @type {number}
 */
const ERR_MAKING = 3;

/**
 * Stores custom axios error information
 */
class AxiosErr {
    /**
     * Creates an AxiosError instance
     * @param code {Number} One of error codes above for easy error identification
     * @param data {*} Information about error code, depends on the code:
     *
     *     - Not 200: Data is an object with the keys: data, status, headers
     *     - No resp: Data is the request object
     *     - Making: Error message string
     */
    constructor(code, data) {
        this.code = code;
        this.data = data;
    }
}

/**
 * Handle an axios error. 3 types of errors could occur:
 *
 * - Non 200 response from server
 * - Request made, no response received
 * - Error setting up request
 *
 * @param error {Error} Axios error
 * @returns {Promise} Rejects with an easier to use AxiosError
 */
function Handle(error) {
    return new Promise((resolve, reject) => {
        // Check if non 200 response
        if (error.response) {
            return reject(new AxiosErr(ERR_NOT_200, {
                data: error.response.data,
                status: error.response.status,
                headers: error.response.headers
            }));
        } else if (error.request) {
            // Check if request made but no response received
            return reject(new AxiosErr(ERR_NO_RESP, error.request));
        } else {
            return reject(new AxiosErr(ERR_MAKING, error.message));
        }
    });
}
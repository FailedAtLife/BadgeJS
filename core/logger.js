/**
 * @module logger
 * @author Robin Cunningham
 * @version 1.0.0
 */

'use strict';

/**
 * Zero-pad a number in a string.
 * eg. 7 -> 07, but 17 -> 17
 *
 * @method pad
 * @param {string} string Input string
 * @returns {string} Padded string
 * @private
 */
function pad(string) {
    string = String(string);
    return string.length < 2 ? '0' + string : string
}

/**
 * Get's called for every request to the server
 *
 * @method logger
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @param {*} next Express next method
 * @returns {true}
 * @public
 */
function logger(req, res, next) {
    next();
    return true;
}

module.exports = logger;

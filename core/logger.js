/**
 * @module logger
 * @author Robin Cunningham
 * @version 1.0.0
 */

'use strict';

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

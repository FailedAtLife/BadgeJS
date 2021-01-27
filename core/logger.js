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
 * @param {*} req express request object
 * @param {*} res express response object
 * @param {*} next express next method
 * @returns {true}
 * @private
 */
module.exports = function logger(req, res, next) {
    next();
    return true;
}

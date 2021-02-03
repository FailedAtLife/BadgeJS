/**
 * @module logger
 * @author Robin Cunningham
 * @version 1.0.0
 */

'use strict';

const chalk = require('chalk');

/**
 * Repeat a string x ammount of times
 * 
 * @method repeat
 * @param {string} string Repeated string
 * @param {number} x Times
 * @returns {string} Repeated string
 * @private
 */
function repeat(string, x) {
    let res = '';
    for (let i = 0; i < x; i++) {
        res += string;
    }

    return res;
}

/**
 * Zero-pad a number in a string.
 * eg. 7 -> 07, but 17 -> 17
 *
 * @method pad
 * @param {*} string Input
 * @returns {string} Padded string
 * @private
 */
function pad(string, len) {
    string = String(string);
    return string.length < len ?
        repeat('0', len - string.length)
        + string : string;
}

/**
 * Get current time
 * 
 * @method date
 * @returns {string} Time
 * @private
 */
function date() {
    const now = new Date();
    let h = pad(now.getHours(), 2),
        m = pad(now.getMinutes(), 2),
        s = pad(now.getSeconds(), 2),
        ms = pad(now.getMilliseconds(), 3);
    
    return `[ ${h}:${m}:${s}.${ms} ]`;
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
    if (req.url == '/favicon.ico') {
        next();
        return true;
    }

    let addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (addr.substring(0, 7) == '::ffff:')
        addr = addr.substring(7);

    console.log(`${addr} -- ${date()}`
        + ' ' + chalk.keyword('orange').bold(req.method)
        + ' ' + chalk.green(req.url));

    next();
    return true;
}

module.exports = logger;

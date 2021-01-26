/**
 * @module BadgeJS
 * @author Robin Cunningham
 * @version 1.0.0
 */

'use strict';

const { Color } = require('./color');

/**
 * BadgeJS constructor
 * 
 * @constructor BadgeJS
 * @param {object} options Constructor options
 * @public
 */
function BadgeJS(options) {
    
}

/**
 * Creates BadgeJS constructor from options
 * 
 * @method BadgeJS.from
 * @param {object} options Constructor options
 * @returns {BadgeJS} Constructor
 * @public
 */
BadgeJS.from = function(options) {
    return new BadgeJS(options);
}

module.exports = BadgeJS;

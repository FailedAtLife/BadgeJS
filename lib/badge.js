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
    let opt = {};
    opt['label'] = options.label || 'label';
    opt['text'] = options.text || 'text';
    opt['color'] = options.color || new Color('grey');

    if (opt['color'].constructor != Color) {
        throw new TypeError('Expected BadgeJS.Color object, try:'
            + `\n    'BadgeJS.color(${JSON.stringify(opt['color'])})'`
            + ` in stead of ${JSON.stringify(opt['color'])}`);
    }
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

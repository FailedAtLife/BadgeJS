/**
 * @module Utils
 * @author Robin Cunningham
 * @version 1.0.0
 */

'use strict';

const pixelWidth = require('string-pixel-width');
const htmlEntities = require('html-entities');

/**
 * Takes a string, and calculates the width of it in pixels
 * 
 * @method getWidth
 * @param {string} text Text where width needs to be calculated from
 * @returns {number} Text width
 * @private
 */
function getWidth(text) {
    return pixelWidth(text, {
        size: 12,
        font: 'verdana'
    });
}

let encodeHTML = htmlEntities.encode;

/**
 * Module exports
 * @private
 */
const _exports = {
    getWidth,
    encodeHTML
};

module.exports = _exports;

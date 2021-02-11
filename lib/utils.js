
'use strict';

const pixelWidth = require('string-pixel-width');
const htmlEntities = require('html-entities');

/**
 * Takes a string, and calculates the width of it in pixels
 *
 * @method getWidth
 * @param {string} text Text where width needs to be calculated from
 * @returns {number} Text width
 * @public
 */
function getWidth(text) {
    return pixelWidth(text, {
        size: 12,
        font: 'verdana'
    });
}

let encodeHTML = htmlEntities.encode;

module.exports = {
    getWidth,
    encodeHTML
};

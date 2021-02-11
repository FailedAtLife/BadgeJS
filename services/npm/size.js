/**
 * @module npm/size
 * @author Robin Cunningham
 * @version 1.0.0
 */

'use strict';

const axios = require('axios');

/**
 * Converts a number ofo single bytes to a string.
 * e.g. 62572 -> 62.6 kB, 184 -> 184 bytes
 * 
 * @method sizeToString 
 * @param {number} bytes Size in single bytes
 * @returns {string} Size in a readable string
 * @private
 */
function sizeToString(bytes) {
    const byteUnits = [ 'bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ];

    let i = 0;
    while (bytes > 1000) {
        bytes = bytes / 1000;
        i++;
    }

    return Math.max(bytes, 0.1).toFixed(1) + ' ' + byteUnits[i];
}

const mod = {};
mod.async = true;
mod.name = 'npm/size';
mod.args = 1;

/**
 * Fetches unpacked size from npm package
 * 
 * @method callback
 * @param {array<string>} args URL arguments
 * @param {BadgeJS} badge
 * @public
 */
mod.callback = async function(args, badge) {
    const pkg = args[0];

    let unpackedSize;
    try {
        let res = await axios.get(`https://registry.npmjs.org/${pkg}`, {
            headers: {
                Accept: 'application/vnd.npm.install-v1+json'
            }
        });

        unpackedSize = res.data.versions[res.data['dist-tags'].latest].dist.unpackedSize;
    } catch (e) {
        badge.label = 'unpacked size';
        badge.text = 'not found';
        badge.color = 'yellow';
        return badge;
    }

    badge.label = 'unpacked size';
    badge.text = sizeToString(unpackedSize);
    badge.color = 'blue';
    return badge;
}

module.exports = mod;

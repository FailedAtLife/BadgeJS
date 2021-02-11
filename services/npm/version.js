/**
 * @module npm/version
 * @author Robin Cunningham
 * @version 1.0.0
 */

'use strict';

const axios = require('axios');

const mod = {};
mod.async = true;
mod.name = 'npm/version';
mod.args = 1;

/**
 * Fetches latest npm version from package
 * 
 * @method callback
 * @param {array<string>} args URL arguments
 * @param {BadgeJS} badge Input badge
 * @returns {object} Badge options
 * @public
 */
mod.callback = async function(args, badge) {
    const pkg = args[0];

    let version;
    try {
        let res = await axios.get(`https://registry.npmjs.org/${pkg}`, {
            headers: {
                Accept: 'application/vnd.npm.install-v1+json'
            }
        });

        version = res.data['dist-tags'].latest;
    } catch (e) {
        badge.label = 'npm';
        badge.text = 'not found';
        badge.color = 'yellow';
        return badge;
    }

    badge.label = 'npm';
    badge.text = version;
    badge.color = 'blue';
    return badge;
}

module.exports = mod;

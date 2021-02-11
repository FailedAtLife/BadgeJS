
'use strict';

const axios = require('axios');

const mod = {};
mod.async = true;
mod.name = 'npm/files';
mod.args = 1;

/**
 * Fetches file count from npm package
 * 
 * @method callback
 * @param {array<string>} args URL arguments
 * @param {BadgeJS} badge Input badge
 * @returns {object} Badge options
 * @public
 */
mod.callback = async function(args, badge) {
    const pkg = args[0];

    let files;
    try {
        let res = await axios.get(`https://registry.npmjs.org/${pkg}`, {
            headers: {
                Accept: 'application/vnd.npm.install-v1+json'
            }
        });

        files = res.data.versions[res.data['dist-tags'].latest].dist.fileCount;
    } catch (e) {
        badge.label = 'files';
        badge.text = 'not found';
        badge.color = 'yellow';
        return badge;
    }

    badge.label = 'files';
    badge.text = files.toString();
    badge.color = 'green';
    return badge;
}

module.exports = mod;

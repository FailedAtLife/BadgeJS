
'use strict';

const axios = require('axios');

const mod = {};
mod.async = true;
mod.name = 'github/pulls';
mod.args = 2;

/**
 * Fetches public GitHub pull requests from GitHub api
 * 
 * @method callback
 * @param {array<string>} args URL arguments
 * @param {BadgeJS} badge Input badge
 * @returns {object} Badge options
 * @public
 */
mod.callback = async function(args, badge) {
    const user = args[0];
    const repo = args[1];

    let pulls;
    try {
        let res = await axios.get(`https://api.github.com/repos/${user}/${repo}/pulls`, {
            headers: {
                Accept: 'application/vnd.github.v3+json'
            }
        });

        pulls = res.data;
    } catch (e) {
        badge.label = 'pulls';
        badge.text = 'not found';
        badge.color = 'yellow';
        return badge;
    }

    badge.label = 'pulls';
    badge.text = `${pulls.length} open`;
    badge.color = 'blue';
    return badge;
}

module.exports = mod;

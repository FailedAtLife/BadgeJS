/**
 * @module github/issues
 * @author Robin Cunningham
 * @version 1.0.0
 */

'use strict';

const axios = require('axios');

const mod = {};
mod.async = true;
mod.name = 'github/issues';
mod.args = 2;

/**
 * Fetches public GitHub issues from GitHub api
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

    let issues;
    try {
        let res = await axios.get(`https://api.github.com/repos/${user}/${repo}/issues`, {
            headers: {
                Accept: 'application/vnd.github.v3+json'
            }
        });

        issues = res.data;
    } catch (e) {
        badge.label = 'issues';
        badge.text = 'not found';
        badge.color = 'yellow';
        return badge;
    }

    let open = 0;

    issues.forEach(issue => {
        if (issue.open || issue.state == 'open') open++;
    });

    badge.label = 'issues';
    badge.text = `${open} open`;
    badge.color = 'blue';
    return badge;
}

module.exports = mod;

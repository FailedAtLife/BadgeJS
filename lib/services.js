
'use strict';

const BadgeJS = require('./badge');

/**
 * Service constructor
 * 
 * @constructor Service
 * @param {string} service Root service name
 * @param {string} sub Service action name
 * @public
 */
function Service(service, sub) {
    const mod = require(`../services/${service}/${sub}`);

    this.isAsync = mod.async;
    this.name = mod.name;
    this.argsCount = mod.args;

    /**
     * Runs the service program and returns a promise with the badge
     * 
     * @method Service.start
     * @param {string[]} args Array of arguments required to execute program
     * @returns {Promise<BadgeJS>} Badge
     * @public
     */
    this.start = function(args) {
        if (args.length < this.argsCount) {
            throw new Error(`Required ${this.argsCount} args, got ${args.length}`);
        }

        return new Promise((resolve, reject) => {
            if (this.isAsync) {
                mod.callback(args, {}).then(badge => {
                    badge.color = Badge.color(badge.color);
                    badge = Badge.from(badge);
                    resolve(badge);
                }).catch(reject);
            } else {
                let badge;
                try {
                    badge = mod.callback(args, {});
                } catch(e) {
                    reject(e);
                }

                if (badge) {
                    badge.color = Badge.color(badge.color);
                    badge = Badge.from(badge);
                    resolve(badge);
                }
            }
        });
    }
}

module.exports = Service;

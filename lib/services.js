
'use strict';

const { Color } = require('./color');

/**
 * Service constructor
 * 
 * @constructor Service
 * @param {object} options Badge options
 * @public
 */
function Service(options) {
    const service = options.service;
    const sub = options.sub;
    const overwrite = options.overwrite || {};

    this.isAsync = null;
    this.name = null;
    this.argsCount = null;

    /**
     * Runs the service program and returns a promise with the badge
     * 
     * @method Service.generate
     * @param {string[]} args Array of arguments required to execute program
     * @returns {Promise<object>} Badge
     * @public
     */
    this.generate = function(args) {
        if (args.length < this.argsCount) {
            throw new Error(`Required ${this.argsCount} args, got ${args.length}`);
        }

        return new Promise((resolve, reject) => {
            let mod;
            try {
                mod = require(`../services/${service}/${sub}`);
            } catch(e) {
                reject(e);
            }

            this.isAsync = mod.async;
            this.name = mod.name;
            this.argsCount = mod.args;

            if (this.isAsync) {
                mod.callback(args, {}).then(badge => {
                    badge.color = new Color(badge.color);
                    badge = Object.assign(badge, overwrite);
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
                    badge.color = new Color(badge.color);
                    badge = Object.assign(badge, overwrite);
                    resolve(badge);
                }
            }
        });
    }
}

module.exports.Service = Service;

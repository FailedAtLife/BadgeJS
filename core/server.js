/**
 * @module Server
 * @author Robin Cunningham
 * @version 1.0.0
 */

'use strict';

const app = require('express')();

let opt;
module.exports = {
    /**
     * Sets multiple options for the server
     *
     * @method init
     * @param {object} options Init options
     * @returns {true}
     * @private
     */
    init: function(options) {
        if (options.production == undefined
            || options.port == undefined)
            throw new Error('Missing parameters');

        opt = options;

        if (opt.logger) app.use(opt.logger);

        if (opt.production) {
            app.use((req, res, next) => {
                if (req.headers['x-forwarded-proto'] != 'https') {
                    return res.redirect([
                        'https://',
                        req.get('Host'),
                        req.url
                    ].join(''));
                } else next();
            });
        }

        return true;
    },

    /**
     * Starts the server
     *
     * @method start
     * @returns {true}
     * @private
     */
    start: function() {
        if (opt.onstart) app.listen(opt.port, opt.onstart);
        else app.listen(port);

        return true;
    }
};

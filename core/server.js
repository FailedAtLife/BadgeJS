/**
 * @module Server
 * @author Robin Cunningham
 * @version 1.0.0
 */

'use strict';

const express = require('express');
const app = express();

let opt;
module.exports = {
    /**
     * Sets multiple options for the server
     *
     * @method init
     * @param {object} options Init options
     * @returns {true}
     * @public
     */
    init: function(options) {
        if (options.production == undefined
            || options.port == undefined)
            throw new Error('Missing parameters');

        opt = options;

        app.set('view engine', 'ejs');
        app.set('views', 'frontend');
        app.use('/static', express.static('frontend/static'));

        if (opt.logger && !opt.production) app.use(opt.logger);

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

        app.get('/', (req, res) => {
            res.render('index');
        });

        return true;
    },

    /**
     * Starts the server
     *
     * @method start
     * @returns {true}
     * @public
     */
    start: function() {
        if (opt.onstart) app.listen(opt.port, opt.onstart);
        else app.listen(port);

        return true;
    }
};

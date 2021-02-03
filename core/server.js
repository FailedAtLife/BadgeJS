/**
 * @module Server
 * @author Robin Cunningham
 * @version 1.0.0
 */

'use strict';

const express = require('express');
const Badge = require('../lib/badge');

let opt;

/**
 * @constructor Server
 * @public
 */
function Server() {
    this.app = express();
}

/**
 * Sets multiple options for the server
 *
 * @method Server.prototype.init
 * @param {object} options Init options
 * @returns {true}
 * @public
 */
Server.prototype.init = function(options) {
    if (options.production == undefined
        || options.port == undefined)
        throw new Error('Missing parameters');

    opt = options;

    this.app.set('view engine', 'ejs');
    this.app.set('views', 'frontend/pages');
    this.app.use('/static/js', express.static('frontend/scripts'));
    this.app.use('/static/css', express.static('frontend/styles'));

    if (opt.logger && !opt.production) this.app.use(opt.logger);

    if (opt.production) {
        this.app.use((req, res, next) => {
            if (req.headers['x-forwarded-proto'] != 'https') {
                return res.redirect([
                    'https://',
                    req.get('Host'),
                    req.url
                ].join(''));
            } else next();
        });
    }

    this.app.get('/', (_, res) => {
        res.render('index');
    });

    this.app.get('/badge/*', (req, res) => {
        let label = req.params[0].split('/')[0],
            text = req.params[0].split('/')[1],
            color = req.params[0].split('/')[2] || 'grey';
        
        try {
            color = Badge.color(color);
        } catch(e) {
            color = Badge.color('grey');
        }
        
        let badge = Badge.from({
            label,
            text,
            color
        });

        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(badge.toString('svg'));
    });

    return true;
}

/**
 * Starts the server
 *
 * @method Server.prototype.start
 * @returns {true}
 * @public
 */
Server.prototype.start = function() {
    if (opt.onstart) this.app.listen(opt.port, opt.onstart);
    else this.app.listen(port);

    return true;
}

module.exports = Server;

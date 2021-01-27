/**
 * @module Web
 * @author Robin Cunningham
 * @version 1.0.0
 */

'use strict';

const app = require('express')();

const production = process.env.ENVIROMENT
    || 'development' == 'production',
    port = process.env.PORT || 3000

if (production) {
    app.use((req, res, next) => {
        if (req.headers['x-forwarded-proto'] != 'https') {
            return res.redirect(['https://', req.get('Host'), req.url].join(''));
        } else next();
    });
}

app.listen(port, () => {
    console.log('App running on port', port);
});

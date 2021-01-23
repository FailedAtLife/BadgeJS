const Badge = require('./main');
const express = require('express');
const app = express();

const production = process.env.ENVIROMENT || 'development' == 'production';

if (production) {
    app.use((req, res, next) => {
        if (req.headers['x-forwarded-proto'] != 'https') {
            return res.redirect(['https://', req.get('Host'), req.url].join(''));
        } else next();
    });
}

app.use(require('../frontend/web'));
app.set('view engine', 'ejs');
app.set('views', 'frontend/views');
app.use('/static', express.static('frontend/static'));

let port = process.env.PORT || 3000;
let host = process.env.HOST || `http://localhost:${port}`

const badgeCallback = (req, res) => {
    if (/[0-9A-Fa-f]{6}/g.test(req.params.c)) req.params.c = '#' + req.params.c;

    let badge;
    try {
        badge = Badge.from({
            label: req.params.l,
            text: req.params.t,
            color: Badge.color(req.params.c)
        });
    } catch(e) {
        badge = Badge.from({
            label: req.params.l,
            text: req.params.t,
            color: Badge.color('grey')
        });
    }

    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(badge.toString());
};

app.get('/badge', (req, res) => {
    req.params.c = 'orange';
    req.params.l = 'badge';
    req.params.t = 'missing parameters';
    badgeCallback(req, res);
});

app.get('/badge/:l', (req, res) => {
    req.params.c = 'orange';
    req.params.t = 'missing parameters';
    badgeCallback(req, res);
});

app.get('/badge/:l/:t', (req, res) => {
    req.params.c = 'grey';
    badgeCallback(req, res);
});

app.get('/badge/:l/:t/:c', badgeCallback);

app.get('/donate', (req, res) => {
    req.params.c = 'pink';
    req.params.l = 'donate';
    req.params.t = '❤ ';
    badgeCallback(req, res);
});

const serviceHandler = (req, res) => {
    let cmd;
    try {
        cmd = require(`../services/${req.params.service}/${req.params.command}`);
    } catch(e) {
        req.params.c = 'yellow';
        req.params.l = `${req.params.service}/${req.params.command}`;
        req.params.t = 'not found';
        return badgeCallback(req, res);
    }

    let args = [];
    req.params[0].split('/').forEach(arg => {
        if (arg.length > 0) args.push(arg);
    });

    if (args.length < cmd.args) {
        req.params.c = 'orange';
        req.params.l = `${req.params.service}/${req.params.command}`;
        req.params.t = 'missing parameters';
        return badgeCallback(req, res);
    }
    
    cmd.main(args).then(data => {
        data.color = Badge.color(data.color);
        let badge = Badge.from(data);
        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(badge.toString());
    });
};

app.get('/:service/:command', (req, res) => {
    req.params[0] = '/';
    serviceHandler(req, res);
});

app.get('/:service/:command/*', serviceHandler);

app.use((req, res) => {
    // 404 Not found
    res.send('404 Not found');
});

app.listen(port, () => {
    console.log('App is running on port', port);
});

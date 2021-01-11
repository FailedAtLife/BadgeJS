const Badge = require('./main');
const express = require('express');
const app = express();

let port = process.env.PORT || 3000;
let host = process.env.HOST || `http://localhost:${port}`

const api = express.Router();
app.use('/api', api);

app.get('/', (req, res) => {
    res.send('<h1>Hello world!</h1>');
});

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
    res.status(400).json({
        status: 400,
        message: 'Missing parameters',
        format: 'GET ' + host + '/badge/:label/:text[/:color]'
    });
});

app.get('/badge/:l', (req, res) => {
    res.status(400).json({
        status: 400,
        message: 'Missing parameters',
        format: 'GET ' + host + '/badge/:label/:text[/:color]'
    });
});

app.get('/badge/:l/:t', (req, res) => {
    req.params.c = 'grey';
    badgeCallback(req, res);
});

app.get('/badge/:l/:t/:c', badgeCallback);

app.get('/donate', (req, res) => {
    let badge = Badge.from({
        label: 'donate',
        text: '❤ ',
        color: Badge.color('pink')
    });

    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(badge.toString());
});

app.get('/:service/:command/*', (req, res) => {
    let cmd;
    try {
        cmd = require(`../services/${req.params.service}/${req.params.command}`);
    } catch(e) {
        return res.status(404).json({
                status: 404,
                message: 'Service not found'
            });
    }

    let args = [];
    req.params[0].split('/').forEach(arg => {
        if (arg.length > 0) args.push(arg);
    });

    if (args.length < cmd.args) return res.status(400).json({
            status: 400,
            message: 'Missing parameters, required: ' + cmd.args
        });
    
    cmd.main(args).then(data => {
        data.color = Badge.color(data.color);
        
        let badge = Badge.from(data);

        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(badge.toString());
    });
});

api.get('/', (req, res) => {
    res.json({
        badge: 'GET ' + host + '/badge/:label/:text[/:color]'
    });
});

app.listen(port, () => {
    console.log('App is running on port', port);
});

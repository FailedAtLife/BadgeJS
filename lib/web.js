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
    if (!req.params.l || !req.params.t) res.status(400).json({
            status: 400,
            message: 'Missing parameters',
            format: 'GET ' + host + '/badge/{label}/{text}[/{color}]'
        });

    if (!req.params.c) req.params.c = 'green';

    let badge;
    try {
        badge = Badge.from({
            label: req.params.l,
            text: req.params.t,
            color: Badge.color(req.params.c)
        });
    } catch(e) {
        let error = e.message.split('\n')[0];
        return res.status(500).json({
                status: 500,
                message: error
            });
    }

    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(badge.toString());
}

app.get('/badge/:l/:t', (req, res) => {
    req.params.c = 'grey';
    badgeCallback(req, res);
});

app.get('/badge/:l/:t/:c', badgeCallback);

api.get('/', (req, res) => {
    res.json({
        badge: 'GET ' + host + '/badge/{label}/{text}[/{color}]'
    });
});

app.listen(port, () => {
    console.log('App is running on port', port);
});

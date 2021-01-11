const express = require('express');
const app = express();

let port = process.env.PORT || 3000;
let host = process.env.HOST || `http://localhost:${port}`

const api = express.Router();
app.use('/api', api);

app.get('/', (req, res) => {
    res.send('<h1>Hello world!</h1>');
});

app.get('/badge', (req, res) => {
    if (!req.params.l || !req.params.t) res.status(400).json({
            status: 400,
            message: 'Missing parameters',
            format: 'GET ' + host + '/badge?l={label}&t={text}[&c={color}]'
        });
    
    if (!req.params.c) req.params.c = 'green';

    // Generate badge
});

api.get('/', (req, res) => {
    res.json({
        badge: 'GET ' + host + '/badge?l={label}&t={text}[&c={color}]'
    });
});

app.listen(port, () => {
    console.log('App is running on port', port);
});

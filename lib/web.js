const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello world!</h1>');
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('App is running on port', port);
});

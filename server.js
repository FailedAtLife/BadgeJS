
'use strict';

const Server = require('./core/server');
const logger = require('./core/logger');

let options = {};

options.production = process.env.ENVIROMENT
    || 'development' == 'production';

options.port = process.env.PORT || 3000;
options.logger = logger;

options.onstart = function() {
    console.log('Server running on port', options.port);
};

const server = new Server;

server.init(options);
server.start();

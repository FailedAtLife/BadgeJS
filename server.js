'use strict';

const Server = require('./core/server');
const logger = require('./core/logger');

let opt = {};

opt.production = process.env.ENVIROMENT
    || 'development' == 'production';

opt.port = process.env.PORT || 3000;
opt.logger = logger;

opt.onstart = function() {
    console.log('Server running on port', opt.port);
};

Server.init(opt);
Server.start();

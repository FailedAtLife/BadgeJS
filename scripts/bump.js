
'use strict';

const fs = require('fs');

let pkg = require('../package.json');
let pkgLock = require('../package-lock.json');

let version = pkg.version.split('.');
let bumping = process.argv[2] || 'patch';

if (bumping.indexOf('.') != -1) version = bumping.split('.');
else {
    switch (bumping) {
        default:
        case 'patch':
            version[2]++;
        case 'minor':
            version[1]++;
        case 'major':
            version[0]++;
    }
}

version = version.join('.');

pkg.version = version;
pkgLock.version = version;

console.log(`Bumping to '${version}'`);

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
fs.writeFileSync('package-lock.json', JSON.stringify(pkgLock, null, 2));

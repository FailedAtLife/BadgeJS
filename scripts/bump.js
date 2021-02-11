
'use strict';

const fs = require('fs');

let pkg = require('../package.json');
let pkgLock = require('../package-lock.json');

let version = pkg.version.split('.');
let bumping = process.argv[2] || 'patch';

if (bumping.indexOf('.') != -1) version = bumping.split('.');
else if (bumping == 'major') version[0]++;
else if (bumping == 'minor') version[1]++;
else version[2]++;

version = version.join('.');

pkg.version = version;
pkgLock.version = version;

console.log(`Bumping to '${version}'`);

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
fs.writeFileSync('package-lock.json', JSON.stringify(pkgLock, null, 2) + '\n');

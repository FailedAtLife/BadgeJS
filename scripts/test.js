
'use strict';

let start = new Date();
const Badge = require('../index');
console.log('Imported BadgeJS module in', new Date() - start, 'ms');

start = new Date();
let badge = Badge.from({
    label: '<label_text>',
    text: '<value_text>',
    color: Badge.color('<color>')
});
console.log('Created Badge object in', new Date() - start, 'ms');

start = new Date();
console.log(
    // Do something...
);
console.log('Executed test script in', new Date() - start, 'ms');

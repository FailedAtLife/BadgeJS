let start = new Date();
const Badge = require('../lib/main');
console.log('Imported in', new Date() - start, 'ms');

console.log('Test result:\n');
start = new Date();

console.log(
    // Test script
    Badge
);

console.log('\nExecuted test script in', new Date() - start, 'ms');

# BadgeJS
A JavaScript library for creating (status) badges.

```js
const Badge = require('badgejs');

Badge.from({
    label: 'app',
    text:  'down',
    color: 'red'
}).toString('svg');
```

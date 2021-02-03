# BadgeJS
> A JavaScript library for creating (status) badges.

[![BadgeJS](_readme/badge.svg)](https://badgejs.herokuapp.com)

```js
// JavaScript example from above
const Badge = require('badgejs');

let badge = Badge.from({
    label: 'badge',
    text: 'js',
    color: Badge.color('orange')
});

badge.toFile('badge.svg');
```

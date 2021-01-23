# BadgeJS
> A JavaScript library for creating (status) badges.

[![BadgeJS](_readme/badge.svg)](https://badgejs.herokuapp.com)

```js
const Badge = require('badgejs');

let badge = Badge.from({
    label: 'my app',
    text: 'up',
    color: Badge.color('#4fcf1f')
});

console.log(badge.toString('svg'));
```

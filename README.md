# BadgeJS
> A JavaScript library for creating (status) badges.

[![BadgeJS](https://badgejs.herokuapp.com/badge/badge/js/orange)](https://badgejs.herokuapp.com)

```js
const Badge = require('badgejs');

let badge = Badge.from({
    label: 'my app',
    text: 'up',
    color: Badge.color('#4fcf1f')
});

console.log(badge.toString('svg'));
```

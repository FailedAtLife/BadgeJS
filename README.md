# BadgeJS
> A JavaScript library for creating (status) badges.

[![Issues](https://badgejs.herokuapp.com/github/issues/robincunningham2/BadgeJS)](https://github.com/robincunningham2/BadgeJS/issues)

```js
const Badge = require('badgejs');

let badge = Badge.from({
    label: 'my app',
    text: 'up',
    color: Badge.color('#4fcf1f')
});

console.log(badge.toString('svg'));
```

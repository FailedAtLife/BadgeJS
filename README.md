# BadgeJS
> A JavaScript library for creating (status) badges.

```js
const Badge = require('badgejs');

let badge = Badge.from({
    label: 'my app',
    text: 'up'
});

console.log(badge.toString('svg'));
```

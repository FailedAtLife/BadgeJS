const pixelWidth = require('string-pixel-width');

class Badge {
    constructor(label, text) {
        let width = [
            pixelWidth(label, { size: 110, font: 'verdana' }),
            pixelWidth(text, { size: 110, font: 'verdana' })
        ];
    }
}

function from(obj) {
    if (!obj || typeof obj != 'object') obj = {};
    if (!obj.label) obj.label = 'label';
    if (!obj.text) obj.text = 'text';

    return new Badge(obj.label, obj.text);
}

module.exports.from = from;

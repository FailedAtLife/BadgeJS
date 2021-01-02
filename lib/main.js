const pixelWidth = require('string-pixel-width');
const { brightness, getSVG } = require('./helper');

class Badge {
    constructor(label, text, bg) {
        let textWidth = [
            Math.round(pixelWidth(label, { size: 18, font: 'verdana' })),
            Math.round(pixelWidth(text, { size: 18, font: 'verdana' }))
        ], fullWidth = textWidth[0] + textWidth[1] + 20,
        lumm = brightness(bg),
        content = getSVG({
            labelText: label,
            valueText: text,
            labelX: Math.round(pixelWidth(label, { size: 110, font: 'verdana' }) / 2) + 64,
            valueX: Math.round(pixelWidth(text, { size: 110, font: 'verdana' }) / 2) + 64,
            fullWidth: fullWidth,
            fullHeight: 20,
            labelLength: textWidth[0],
            valueLength: textWidth[1],
            background: bg
        }).trim();

        this.toString = function(type) {
            type = type.toLowerCase();
            switch (type) {
                default:
                case 'svg':
                    return content;
            }
        }
    }
}

function from(obj) {
    if (!obj || typeof obj != 'object') obj = {};
    if (!obj.label) obj.label = 'label';
    if (!obj.text) obj.text = 'text';
    if (!obj.bg && !obj.background && !obj.color) obj.bg = '#9f9f9f';

    return new Badge(obj.label, obj.text, obj.bg || obj.background || obj.color);
}

module.exports.from = from;

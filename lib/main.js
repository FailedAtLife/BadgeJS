const pixelWidth = require('string-pixel-width');
const pkg = require('../package.json');
const fs = require('fs');

const getWidth = (text) => {
    return pixelWidth(text, {
        size: 12,
        font: 'verdana'
    });
};

class Badge {
    constructor(data) {
        data = data || 'svg';
        this.toString = function(type) {
            switch (type.toLowerCase()) {
                case 'svg':
                    return data;
                default:
                    throw new TypeError(`Unexpected type '${type}'`);
            }
        }
    }
}

class BadgeJSModule {
    constructor() {
        this.version = pkg.version;
    }

    from(options) {
        let newOptions = {};
        newOptions.label = options.label || 'Label';
        newOptions.text = options.text || 'Text';

        options = newOptions;

        let SVGOptions = {
            title: 'BadgeJS API',
            fullWidth: getWidth(options.label) + getWidth(options.text),
            labelWidth: getWidth(options.label),
            textWidth: getWidth(options.text),
            label: options.label,
            text: options.text
        };
        
        let response = fs.readFileSync('input/input.svg', 'utf8');

        for (let op in SVGOptions) {
            response = response
                .split(`{{${op}}}`)
                .join(SVGOptions[op]);
        }

        return new Badge(response);
    }
}

module.exports = new BadgeJSModule();

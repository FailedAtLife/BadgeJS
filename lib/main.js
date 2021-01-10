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

        this.toFile = function(filepath) {
            let splitted = filepath.split('.');
            let extension = splitted[splitted.length - 1];

            let data;
            try {
                data = this.toString(extension);
            } catch(e) {
                data = this.toString('svg');
            }

            fs.writeFileSync(filepath, data);
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
            fullWidth: getWidth(options.label) + getWidth(options.text) + 24,
            labelWidth: getWidth(options.label) + 12,
            textWidth: getWidth(options.text) + 12,
            label: options.label,
            text: options.text,
            textX: getWidth(options.label) + 18
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

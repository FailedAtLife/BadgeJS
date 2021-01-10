const pixelWidth = require('string-pixel-width');
const pkg = require('../package.json');
const fs = require('fs');

const getWidth = (text) => {
    return pixelWidth(text, {
        size: 12,
        font: 'verdana'
    });
};

const compToHex = (c) => {
    let hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
}

class Color {
    constructor(color) {
        this.r = 255;
        this.g = 255;
        this.b = 255;

        if (color.constructor == String) {
            while (color.startsWith('#')) {
                color = color.substring(1);
            }

            if (color.length != 6) throw new Error('Invalid HEX value');
            let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

            this.r = parseInt(result[1], 16);
            this.g = parseInt(result[2], 16);
            this.b = parseInt(result[3], 16);
        } else if (color.constructor == Array) {
            let valid = color.length != 6;
            color.forEach(col => {
                if (typeof col != 'number') valid = false;
            });

            if (!valid) throw new Error('Invalid RGB value');

            this.r = color[0];
            this.g = color[1];
            this.b = color[2];
        } else throw new TypeError(`Cannot convert type '${typeof color}' to color`)
    }

    toHex() {
        return '#' + compToHex(this.r) + compToHex(this.g) + compToHex(this.b);
    }
}

class Badge {
    constructor(data) {
        this.toString = function(type) {
            type = type || 'svg';
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
                data = this.toString();
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
        newOptions.color = options.color || new Color([ 255, 255, 255 ]);

        options = newOptions;

        if (options.color.constructor != Color) throw new Error('Color must be a Color object,\n    Try: Badge.color(...)');

        let SVGOptions = {
            title: 'BadgeJS API',
            color: options.color.toHex(),
            fullWidth: getWidth(options.label) + getWidth(options.text) + 24,
            labelWidth: getWidth(options.label) + 12,
            textWidth: getWidth(options.text) + 12,
            textX: getWidth(options.label) + 18,
            label: options.label
                .split('&')
                .join('&amp;')
                .split('<')
                .join('&lt;')
                .split('>')
                .join('&gt;'),
            
            text: options.text
                .split('&')
                .join('&amp;')
                .split('<')
                .join('&lt;')
                .split('>')
                .join('&gt;')
        };
        
        let response = fs.readFileSync('input/input.svg', 'utf8');

        for (let op in SVGOptions) {
            response = response
                .split(`{{${op}}}`)
                .join(SVGOptions[op]);
        }

        return new Badge(response);
    }

    color(col) {
        if (!col) col = [ 255, 255, 255 ];
        return new Color(col);
    }
}

module.exports = new BadgeJSModule();

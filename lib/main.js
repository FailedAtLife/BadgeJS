const pixelWidth = require('string-pixel-width');
const { encode } = require('html-entities');
const pkg = require('../package.json');
const fs = require('fs');

/**
 * Takes a string, and calculates the width in pixels
 * @param {String} text text where width needs to be calculated from
 * @returns {Number} text width
 * @private
 */
const getWidth = (text) => {
    return pixelWidth(text, {
        size: 12,
        font: 'verdana'
    });
};

/**
 * Component to hex
 * @param {Integer} c component
 * @returns {String}
 * @private
 */
const compToHex = (c) => {
    let hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
};

/**
 * Converts a possible color name (like green, pink, etc.) to rgb values
 * @param {String} name color name
 * @returns {Array} rgb value
 * @private
 */
const getColor = (name) => {
    switch (name) {
        case 'red':
            return [ 232, 91, 65 ];
        case 'orange':
            return [ 242, 125, 62 ];
        case 'yellow':
            return [ 231, 186, 30 ];
        case 'blue':
            return [ 5, 133, 206 ];
        case 'cyan':
            return [ 25, 195, 212 ];
        case 'green':
            return [ 79, 207, 31 ];
        case 'pink':
            return [ 255, 105, 180 ];
        case 'grey':
            return [ 147, 147, 147 ];
        case 'darkgrey':
            return [ 54, 54, 54 ];
        default:
            throw new Error(`Invalid color name\n    Did you mean: '#${name}'?`)
    }
};

/**
 * Color class
 * @param {String/Array} color color in hex/rgb format
 * @private
 */
class Color {
    constructor(color) {
        this.r = 255;
        this.g = 255;
        this.b = 255;

        if (color.constructor == String && color.startsWith('#')) {
            while (color.startsWith('#')) {
                color = color.substring(1);
            }

            if (color.length != 6) throw new Error('Invalid HEX value');
            let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

            this.r = parseInt(result[1], 16);
            this.g = parseInt(result[2], 16);
            this.b = parseInt(result[3], 16);
        } else if (color.constructor == String) {
            let col = getColor(color);
            this.r = col[0];
            this.g = col[1];
            this.b = col[2];
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

    /**
     * Converts rgb to hex
     * @returns {String} hex value
     * @private
     */
    toHex() {
        return '#' + compToHex(this.r) + compToHex(this.g) + compToHex(this.b);
    }
}

/**
 * Badge class
 * @param {String} data the badge in SVG format
 * @private
 */
class Badge {
    constructor(data) {
        /**
         * Returns a string, containing the badge image content
         * @param {String} type
         * @returns {String} badge image data
         * @private
         */
        this.toString = function(type) {
            type = type || 'svg';
            switch (type.toLowerCase()) {
                case 'svg':
                    return data;
                default:
                    throw new TypeError(`Unexpected type '${type}'`);
            }
        }

        /**
         * Saves the badge image in to file
         * @param {String} filepath
         * @returns {Boolean} success
         * @private
         */
        this.toFile = function(filepath) {
            let splitted = filepath.split('.');
            let extension = splitted[splitted.length - 1];

            let data;
            try {
                data = this.toString(extension);
            } catch(e) {
                data = this.toString();
            }

            try {
                fs.writeFileSync(filepath, data);
            } catch(e) {
                return false;
            }

            return true;
        }
    }
}

/**
 * The main BadgeJS module to be exported
 * @module badgejs
 * @public
 */
class BadgeJSModule {
    constructor() {
        this.version = pkg.version;
    }

    /**
     * Creates a Badge object from a set of options provided as param
     * @param {Object} options an object containing the label, text & color for the badge
     * @returns {Badge}
     * @public
     */
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
            label: encode(options.label),
            text: encode(options.text)
        };
        
        let response = fs.readFileSync('_input/input.svg', 'utf8');

        for (let op in SVGOptions) {
            response = response
                .split(`{{${op}}}`)
                .join(SVGOptions[op]);
        }

        return new Badge(response);
    }

    /**
     * Generates a Color object from a hex or rgb value
     * @param {*} col the hex/rgb value
     * @returns {Color}
     * @public
     */
    color(col) {
        if (!col) col = [ 255, 255, 255 ];
        return new Color(col);
    }
}

module.exports = new BadgeJSModule();

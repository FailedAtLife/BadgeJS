/**
 * @module Color
 * @author Robin Cunningham
 * @version 1.0.0
 */

'use strict';

/**
 * Define rgb color names
 */
const colors = {
    red: [ 232, 91, 65 ],
    orange: [ 242, 125, 62 ],
    yellow: [ 231, 186, 30 ],
    blue: [ 5, 133, 206 ],
    cyan: [ 25, 195, 212 ],
    green: [ 79, 207, 31 ],
    pink: [ 255, 105, 180 ],
    grey: [ 147, 147, 147 ],
    darkgrey: [ 54, 54, 54 ]
};

/**
 * Color constructor
 * 
 * @constructor Color
 * @param {*} a hex value, name, or red value
 * @param {Number} b green value
 * @param {Number} c blue value
 * @public
 */
class Color {
    constructor(a, b, c) {
        this.r = 0;
        this.g = 0;
        this.b = 0;

        if (typeof a == 'number') {
            if (typeof b != 'number'
                || typeof c != 'number')
                throw new TypeError('Expected numbers for all values');
            
            this.r = a;
            this.g = b;
            this.b = c;

        } else if (typeof a == 'string' && a.startsWith('#')) {

            let valid = a.length != 6;
            try {
                Buffer.from(a, 'hex');
            } catch(e) {
                valid = false;
            }

            if (!valid) throw new Error('Invalid hex value');

            let buffer = Buffer.from(a, 'hex');
            this.r = buffer[0];
            this.g = buffer[1];
            this.b = buffer[2];

        } else if (typeof a == 'string') {
            let color = colors[a];
            if (!color) throw new Error(`Invalid color name '${a}'`);

            this.r = color[0];
            this.g = color[1];
            this.b = color[2];

        } else throw new TypeError(`Invalid type '${typeof a}'`);
    }

    /**
     * Convert rgb values to CSS color value
     * 
     * @method Color.toValue
     * @returns {String} CSS color value
     * @public
     */
    toValue() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
}

module.exports.Color = Color;

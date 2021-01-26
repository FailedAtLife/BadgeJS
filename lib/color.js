/**
 * @module Color
 * @author Robin Cunningham
 * @version 1.0.0
 */

'use strict';

/**
 * Color constructor
 * 
 * @constructor Color
 * @param {*} a hex value, name, or red value
 * @param {Number} b green value
 * @param {Number} c blue value
 * @private
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

            switch (a) {
                case 'red':
                    this.r = 232;
                    this.g = 91;
                    this.b = 65;
                    break;
                default:
                    throw new Error(`Name '${a}' was not found`);
            }
        } else throw new TypeError(`Invalid type '${typeof a}'`);
    }
}

module.exports.Color = Color;

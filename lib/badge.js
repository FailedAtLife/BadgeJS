
'use strict';

const { Color } = require('./color');
const _Service = require('./services').Service;
const {
    getWidth,
    encodeHTML
} = require('./utils');
const fs = require('fs');

/**
 * BadgeJS constructor
 * 
 * @constructor BadgeJS
 * @param {object} options Constructor options
 * @public
 */
function BadgeJS(options) {
    options = options || {};

    let opt = {};
    opt['label'] = options.label || 'label';
    opt['text'] = options.text || 'text';
    opt['color'] = options.color || new Color('grey');
    opt['icon'] = options.icon || false;

    this.label = opt.label;
    this.text = opt.text;
    this.color = opt.color;
    this.icon = opt.icon;

    if (opt.color.constructor != Color) {
        throw new TypeError('Expected BadgeJS.Color object, try:'
            + `\n    'BadgeJS.color(${JSON.stringify(opt['color'])})'`
            + ` in stead of ${JSON.stringify(opt['color'])}`);
    }

    if (this.icon) {

    }

    // These options will be formatted later into a SVG file
    let SVGOptions = {
        title: 'BadgeJS API',
        color: opt.color.toValue(),
        fullWidth: getWidth(opt.label) + getWidth(opt.text) + 24,
        labelWidth: getWidth(opt.label) + 12,
        textWidth: getWidth(opt.text) + 12,
        textX: getWidth(opt.label) + 18,
        label: encodeHTML(opt.label),
        text: encodeHTML(opt.text)
    };

    const input = fs.readFileSync('_input/input.svg', 'utf8');

    let result = input;
    for (let key in SVGOptions) {
        result = result
            .split(`{{${key}}}`)
            .join(SVGOptions[key]);
    }

    this.str = result;

    /**
     * Converts the badge to file data with presented type
     * 
     * @method BadgeJS.toString
     * @param {string} type (svg) Data type
     * @returns {string} File data
     * @public
     */
    this.toString = function toString(type) {
        if (typeof type != 'string')
            throw new TypeError(`Expected string, got ${typeof type}`);
        
        if (!type.length) type = 'svg';
        type = type.toLowerCase();

        if (type == 'svg') return this.str;
        else throw new TypeError(`Invalid type ${type}`);
    }

    /**
     * Writes badge to file with corresponding extension,
     * custom type can be provided too
     * 
     * @method BadgeJS.toFile
     * @param {string} path Absolute or fixed file path
     * @returns {boolean} Success
     * @public
     */
    this.toFile = function toFile(path, type) {
        if (!type) {
            let splitted = path.split('.');
            type = splitted[splitted.length - 1];
        }

        let data;
        try {
            data = this.toString(type);
        } catch(e) {
            data = this.toString();
        }

        try {
            fs.writeFileSync(path, data);
        } catch(e) {
            return false;
        }

        return true;
    }
}

/**
 * Creates BadgeJS constructor from options
 * 
 * @method BadgeJS.from
 * @param {object} options Constructor options
 * @returns {BadgeJS} Constructor
 * @public
 */
BadgeJS.from = function from(options) {
    return new BadgeJS(options);
}

/**
 * Creates Color constructor from rgb, hex, or color name
 * 
 * @method BadgeJS.color
 * @param {*} color rgb, hex, or color name
 * @returns {Color} Color constructor
 * @public
 */
BadgeJS.color = function color(color) {
    if (color.constructor == Array)
        return new Color(color[0], color[1], color[2]);
    else return new Color(color);
}

/**
 * Service constructor
 * 
 * @constructor Service
 * @param {object} options Badge options
 * @public
 */
BadgeJS.Service = function Service(options) {
    let service = new _Service(options);

    this.isAsync = service.isAsync;
    this.name = service.name;
    this.argsCount = service.argsCount;
    this.generate = function(args) {
        return new Promise((resolve, reject) => {
            service.generate(args).then(badge => {
                badge = BadgeJS.from(badge);
                resolve(badge);
            }).catch(reject);
        });
    }
};

module.exports = BadgeJS;

const pixelWidth = require('string-pixel-width');
const pkg = require('../package.json');

const getWidth = (text) => {
    return pixelWidth(text, {
        size: 12,
        font: 'verdana'
    });
};

class BadgeJSModule {
    constructor() {
        this.version = pkg.version;
    }

    from(options) {
        let newOptions = {};
        newOptions.label = options.label || 'Label';
        newOptions.text = options.text || 'Text';

        options = newOptions;
    }
}

module.exports = new BadgeJSModule();

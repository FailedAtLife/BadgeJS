function brightness(color) {
    color = `${color}`;

    let isHex = color.indexOf('#') == 0,
        isRGB = color.indexOf('rgb') == 0,
        m, r, g, b;
    
    if (isHex) {
        const hasFullSpec = color.length == 7;
        m = color.substr(1).match(hasFullSpec ? /(\S{2})/g : /(\S{1})/g);

        if (m) {
            r = parseInt(m[0] + (hasFullSpec ? '' : m[0]), 16),
                g = parseInt(m[1] + (hasFullSpec ? '' : m[1]), 16),
                b = parseInt(m[2] + (hasFullSpec ? '' : m[2]), 16);
        }
    }

    if (isRGB) {
        m = color.match(/(\d+){3}/g);
        if (m) r = m[0], g = m[1], b = m[2];
    }

    if (typeof r != undefined) return ((r * 299) + (g * 587) + (b * 114)) / 1000;
}

module.exports.brightness = brightness;


const svg = `
<svg xmlns="http://www.w3.org/2000/svg"
    width="{{fullWidth}}"
    height="{{fullHeight}}"
    </svg>
`;
function getSVG(obj) {
    let result = svg;
    for (let key in obj) {
        result = result
            .split(`{{${key}}}`)
            .join(obj[key]);
    }

    return result;
}

module.exports.getSVG = getSVG;

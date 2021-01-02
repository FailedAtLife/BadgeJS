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
    role="img">
        <linearGradient id="grad" x2="0" y2="100%">
            <stop offset="0" stop-color="#bbb" stop-opacity=".2"/>
            <stop offset="1" stop-opacity=".2"/>
        </linearGradient>
        <clipPath id="clip">
            <rect width="{{fullWidth}}" height="20" rx="3" fill="#fff"/>
        </clipPath>
        <g clip-path="url(#clip)">
            <rect width="{{labelLength}}" height="20" fill="#555"/>
            <rect x="{{labelLength}}"
                width="{{valueLength}}"
                height="20"
                fill="{{background}}"/>
            <rect width="{{fullLength}}" height="20" fill="url(#clip)"/>
        </g>
        <g fill="#fff"
            text-anchor="middle"
            font-family="Verdana"
            text-rendering="geometricPrecision"
            font-size="110">
                <text aria-hidden="true"
                    x="{{labelX}}" y="150"
                    fill="#010101"
                    fill-opacity=".3"
                    transform="scale(.1)">{{labelText}}</text>
                <text x="{{labelX}}" y="140"
                    transform="scale(.1)"
                    fill="#fff">{{labelText}}</text>
                <text aria-hidden="true"
                    x="{{valueX}}" y="150"
                    fill="#010101"
                    fill-opacity=".3"
                    transform="scale(.1)">{{valueText}}</text>
                <text x="{{valueX}}" y="140"
                    transform="scale(.1)"
                    fill="#fff">{{valueText}}</text>
            </g>
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

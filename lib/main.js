
class Badge {
    constructor(label, text) {

    }
}

function from(obj) {
    if (!obj || typeof obj != 'object') obj = {};
    if (!obj.label) obj.label = 'label';
    if (!obj.text) obj.text = 'text';

    return new Badge(obj.label, obj.text);
}

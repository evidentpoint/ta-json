import { getDefinition } from "../classes/object-definition";
// tslint:disable:ext-variable-name only-arrow-functions
export function JsonType(type) {
    return function (target, key) {
        var property = getDefinition(target.constructor).getProperty(key);
        property.type = type;
    };
}

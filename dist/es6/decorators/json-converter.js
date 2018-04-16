import { getDefinition } from "../classes/object-definition";
// tslint:disable:ext-variable-name only-arrow-functions
export function JsonConverter(converter) {
    return function (target, key) {
        var property = getDefinition(target.constructor).getProperty(key);
        if (typeof converter === "function") {
            property.converter = new converter();
        }
        else {
            property.converter = converter;
        }
    };
}
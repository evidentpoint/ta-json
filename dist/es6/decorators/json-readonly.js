import { getDefinition } from "../classes/object-definition";
// tslint:disable:ext-variable-name only-arrow-functions
export function JsonReadonly() {
    return function (target, key) {
        var property = getDefinition(target.constructor).getProperty(key);
        property.readonly = true;
    };
}
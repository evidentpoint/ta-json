import { getDefinition } from "../classes/object-definition";
// tslint:disable:ext-variable-name only-arrow-functions
export function JsonConstructor() {
    return function (target, key) {
        var definition = getDefinition(target.constructor);
        definition.ctr = target[key];
    };
}
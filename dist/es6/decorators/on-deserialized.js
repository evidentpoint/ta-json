import { getDefinition } from "../classes/object-definition";
// tslint:disable:ext-variable-name only-arrow-functions
export function OnDeserialized() {
    return function (target, key) {
        var definition = getDefinition(target.constructor);
        definition.onDeserialized = target[key];
    };
}

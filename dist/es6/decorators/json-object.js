import { getDefinition } from "../classes/object-definition";
// tslint:disable:ext-variable-name only-arrow-functions
export function JsonObject() {
    return function (constructor) {
        getDefinition(constructor);
    };
}
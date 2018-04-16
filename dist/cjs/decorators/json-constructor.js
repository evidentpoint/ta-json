"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var object_definition_1 = require("../classes/object-definition");
// tslint:disable:ext-variable-name only-arrow-functions
function JsonConstructor() {
    return function (target, key) {
        var definition = object_definition_1.getDefinition(target.constructor);
        definition.ctr = target[key];
    };
}
exports.JsonConstructor = JsonConstructor;
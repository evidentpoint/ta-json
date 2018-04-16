"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var object_definition_1 = require("../classes/object-definition");
// tslint:disable:ext-variable-name only-arrow-functions
function JsonDiscriminatorValue(value) {
    return function (constructor) {
        object_definition_1.getDefinition(constructor).discriminatorValue = value;
    };
}
exports.JsonDiscriminatorValue = JsonDiscriminatorValue;
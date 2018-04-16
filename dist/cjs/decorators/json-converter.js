"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var object_definition_1 = require("../classes/object-definition");
// tslint:disable:ext-variable-name only-arrow-functions
function JsonConverter(converter) {
    return function (target, key) {
        var property = object_definition_1.getDefinition(target.constructor).getProperty(key);
        if (typeof converter === "function") {
            property.converter = new converter();
        }
        else {
            property.converter = converter;
        }
    };
}
exports.JsonConverter = JsonConverter;
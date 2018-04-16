"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var converter_1 = require("./../converters/converter");
var object_definition_1 = require("../classes/object-definition");
function serialize(value, type) {
    if (value.constructor === Array) {
        return value.map(function (o) { return serializeRootObject(o, type); });
    }
    return serializeRootObject(value, type);
}
exports.serialize = serialize;
function serializeRootObject(object, type) {
    if (type === void 0) { type = Object.getPrototypeOf(object).constructor; }
    var inheritanceChain = object_definition_1.getTypedInheritanceChain(type);
    if (inheritanceChain.length === 0) {
        return object;
    }
    var definitions = inheritanceChain
        .map(function (t) { return object_definition_1.objectDefinitions.get(t); })
        .filter(function (t) { return !!t; }); // Typescript doesn't yet support the undefined filter
    var output = {};
    definitions.forEach(function (d) {
        d.properties.forEach(function (p, key) {
            if (!p.type) {
                throw new Error("Cannot serialize property '" + key + "' without type!");
            }
            var value = object[key];
            if (value == undefined || p.writeonly) {
                return;
            }
            if (p.set) {
                output[p.serializedName] = serializeArray(Array.from(value || []), p);
                return;
            }
            if (p.array) {
                output[p.serializedName] = serializeArray(value, p);
                return;
            }
            output[p.serializedName] = serializeObject(value, p);
        });
    });
    return output;
}
function serializeArray(array, definition) {
    var arr = array.map(function (v) { return serializeObject(v, definition); });
    if (arr.length === 1) {
        var converter = definition.converter || converter_1.propertyConverters.get(definition.type);
        if (converter && converter.collapseArrayWithSingleItem()) {
            return arr[0];
        }
    }
    return arr;
}
function serializeObject(object, definition) {
    var primitive = definition.type === String || definition.type === Boolean || definition.type === Number;
    var value = object;
    var converter = definition.converter || converter_1.propertyConverters.get(definition.type);
    if (converter) {
        return converter.serialize(value);
    }
    if (!primitive) {
        var objDefinition = object_definition_1.objectDefinitions.get(definition.type);
        if (objDefinition) {
            if (value instanceof definition.type) {
                return serialize(value);
            }
            return serialize(value, definition.type);
        }
    }
    return value;
}

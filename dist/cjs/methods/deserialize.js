"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var object_definition_1 = require("../classes/object-definition");
var converter_1 = require("../converters/converter");
function deserialize(object, type, options) {
    if (options === void 0) { options = { runConstructor: false }; }
    if (object && object.constructor === Array) {
        return object.map(function (o) { return deserializeRootObject(o, type, options); });
    }
    return deserializeRootObject(object, type, options);
}
exports.deserialize = deserialize;
function deserializeRootObject(object, objectType, options) {
    if (objectType === void 0) { objectType = Object; }
    if (!object_definition_1.objectDefinitions.has(objectType)) {
        return object;
    }
    var values = object;
    var _a = object_definition_1.getTypedInheritanceChain(objectType, values), type = _a[0], superTypes = _a.slice(1);
    var output = Object.create(type.prototype);
    var definitions = superTypes.reverse().concat([type]).map(function (t) { return object_definition_1.objectDefinitions.get(t); }).filter(function (t) { return !!t; });
    definitions.forEach(function (d) {
        if (options.runConstructor) {
            d.ctr.call(output);
        }
        d.beforeDeserialized.call(output);
        d.properties.forEach(function (p, key) {
            if (!p.type) {
                throw new Error("Cannot deserialize property '" + key + "' without type!");
            }
            var value = values[p.serializedName];
            if (value == undefined || p.readonly) {
                return;
            }
            if (p.array || p.set) {
                output[key] = deserializeArray(value, p, options);
                if (p.set) {
                    output[key] = new Set(output[key]);
                }
                return;
            }
            output[key] = deserializeObject(value, p, options);
        });
        d.onDeserialized.call(output);
    });
    return output;
}
function deserializeArray(array, definition, options) {
    var converter = definition.converter || converter_1.propertyConverters.get(definition.type);
    var arr = (array instanceof Array) ?
        array :
        (converter && converter.collapseArrayWithSingleItem() ?
            [array] :
            array);
    return arr.map(function (v) { return deserializeObject(v, definition, options); });
}
function deserializeObject(object, definition, options) {
    var primitive = definition.type === String || definition.type === Boolean || definition.type === Number;
    var value = object;
    var converter = definition.converter || converter_1.propertyConverters.get(definition.type);
    if (converter) {
        return converter.deserialize(value);
    }
    if (!primitive) {
        var objDefinition = object_definition_1.objectDefinitions.get(definition.type);
        if (objDefinition) {
            return deserialize(value, definition.type);
        }
    }
    return value;
}
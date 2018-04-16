"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var property_definition_1 = require("./property-definition");
var ObjectDefinition = /** @class */ (function () {
    function ObjectDefinition() {
        this.ctr = function () { };
        this.beforeDeserialized = function () { };
        this.onDeserialized = function () { };
        this.properties = new Map();
    }
    ObjectDefinition.prototype.getProperty = function (key) {
        var property = this.properties.get(key);
        if (!property) {
            property = new property_definition_1.PropertyDefinition();
            this.properties.set(key, property);
        }
        return property;
    };
    return ObjectDefinition;
}());
exports.ObjectDefinition = ObjectDefinition;
exports.objectDefinitions = new Map();
function getDefinition(target) {
    var definition = exports.objectDefinitions.get(target);
    if (!definition) {
        definition = new ObjectDefinition();
        exports.objectDefinitions.set(target, definition);
    }
    return definition;
}
exports.getDefinition = getDefinition;
function getInheritanceChain(type) {
    if (!type) {
        return [];
    }
    var parent = Object.getPrototypeOf(type);
    return [type.constructor].concat(getInheritanceChain(parent));
}
exports.getInheritanceChain = getInheritanceChain;
function getChildClassDefinitions(parentType) {
    var childDefs = [];
    exports.objectDefinitions.forEach(function (def, type) {
        var superClass = Object.getPrototypeOf(type.prototype).constructor;
        if (superClass === parentType) {
            childDefs.push([type, def]);
        }
    });
    return childDefs;
}
function getTypedInheritanceChain(type, object) {
    var parentDef = exports.objectDefinitions.get(type);
    var childDefs = [];
    if (object && parentDef && parentDef.discriminatorProperty) {
        childDefs = childDefs.concat(getChildClassDefinitions(type));
    }
    var actualType;
    while (childDefs.length !== 0 && !actualType) {
        var _a = childDefs.shift(), t = _a[0], def = _a[1]; // We are checking the length in the loop so an assertion here is fine.
        if (def.hasOwnProperty("discriminatorValue")) {
            if (object && parentDef && def.discriminatorValue === object[parentDef.discriminatorProperty]) {
                if (def.hasOwnProperty("discriminatorProperty")) {
                    return getTypedInheritanceChain(t, object);
                }
                actualType = t;
            }
        }
        else {
            childDefs = childDefs.concat(getChildClassDefinitions(t));
        }
    }
    if (!actualType) {
        actualType = type;
    }
    var inheritanceChain = new Set(getInheritanceChain(Object.create(actualType.prototype)));
    return Array.from(inheritanceChain).filter(function (t) { return exports.objectDefinitions.has(t); });
}
exports.getTypedInheritanceChain = getTypedInheritanceChain;
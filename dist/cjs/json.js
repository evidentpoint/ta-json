"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serialize_1 = require("./methods/serialize");
var deserialize_1 = require("./methods/deserialize");
var JSON = /** @class */ (function () {
    function JSON() {
    }
    JSON.deserialize = function (object, type, options) {
        return deserialize_1.deserialize(object, type, options);
    };
    JSON.parse = function (json, type, options) {
        return this.deserialize(global.JSON.parse(json), type, options);
    };
    JSON.serialize = function (value) {
        return serialize_1.serialize(value);
    };
    JSON.stringify = function (object) {
        return global.JSON.stringify(this.serialize(object));
    };
    return JSON;
}());
exports.JSON = JSON;

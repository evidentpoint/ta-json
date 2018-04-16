import { serialize } from "./methods/serialize";
import { deserialize } from "./methods/deserialize";
var JSON = /** @class */ (function () {
    function JSON() {
    }
    JSON.deserialize = function (object, type, options) {
        return deserialize(object, type, options);
    };
    JSON.parse = function (json, type, options) {
        return this.deserialize(global.JSON.parse(json), type, options);
    };
    JSON.serialize = function (value) {
        return serialize(value);
    };
    JSON.stringify = function (object) {
        return global.JSON.stringify(this.serialize(object));
    };
    return JSON;
}());
export { JSON };
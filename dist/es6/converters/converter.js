import { DateConverter } from "./date-converter";
import { BufferConverter } from "./buffer-converter";
export var propertyConverters = new Map();
propertyConverters.set(Buffer, new BufferConverter());
propertyConverters.set(Date, new DateConverter());

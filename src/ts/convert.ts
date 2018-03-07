import * as Promise from "bluebird";

/**
 * Decorator for convert simple object method parameter into another class.
 * @method
 */
export default function convert(ConvertClass:new () => any):Function {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {

    descriptor.value.convertBefore = function(obj: any) {

      let instance = new ConvertClass();
      if (obj) {
        for (var prop in obj) {
          if (instance.hasOwnProperty(prop) && typeof instance[prop] != "function") {
            instance[prop] = obj[prop];
          }
        }
      }
      return instance;
    };
  };
};

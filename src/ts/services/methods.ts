import Service from "../service";

/**
* Class for all verbs HTTP decorator.
* @class
*/
export default class Method {

  public static METHODS: {
    get: boolean,
    post: boolean,
    delete: boolean,
    put: boolean,
    patch: boolean,
    [key: string]: boolean;
  }  = {
    get: true,
    post: true,
    delete: true,
    put: true,
    patch: true,
  };

  /**
  * Decorator for 'GET' method.
  * @method
  * @param {string} path - path for Rest service.
  */
  static get(path: string) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
      applyOnFunction(target, key, descriptor, "get", path);
    };
  }

  /**
  * Decorator for 'POST' method.
  * @method
  * @param {string} path - path for Rest service.
  */
  static post(path: string) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
      applyOnFunction(target, key, descriptor, "post", path);
    };
  }

  /**
  * Decorator for 'PUT' method.
  * @method
  * @param {string} path - path for Rest service.
  */
  static put(path: string) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
      applyOnFunction(target, key, descriptor, "put", path);
    };
  }

  /**
  * Decorator for 'DELETE' method.
  * @method
  * @param {string} path - path for Rest service.
  */
  static del(path: string) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
      applyOnFunction(target, key, descriptor, "delete", path);
    };
  }

  /**
  * Decorator for 'PATCH' method.
  * @method
  * @param {string} path - path for Rpathest service.
  */
  static patch(path: string) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
      applyOnFunction(target, key, descriptor, "patch", path);
    };
  }
};

/**
* Add REST decorator on function.
* @method
* @param {Object|function} target - instance to decorate.
* @param {string} key - attribute name.
* @param {Object} descriptor - property descriptor.
* @param {string} methodName - HTTP method name.
* @param {string} path - Url for REST service.
*/
function applyOnFunction(target: any, key: string, descriptor: PropertyDescriptor, methodName: string, path: string) {

  let methodHttp = methodName;
  if (!target[Service.globalKey]) {
    target[Service.globalKey] = {};
  }
  if(!target[Service.globalKey][methodHttp]) {target[Service.globalKey][methodHttp] = {}};
  target[Service.globalKey][methodHttp][key] = {};
  target[Service.globalKey][methodHttp][key][Service.pathKey] = path;
  target[Service.globalKey][methodHttp][key][Service.fctKey] = descriptor.value;

};

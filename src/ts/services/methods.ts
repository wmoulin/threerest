import Service from "../service";

/**
* Class for all verbs HTTP decorator.
* @class
*/
export class Methods {

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
  * @param {number} httpStatus - http status for response.
  */
  static get(path: string, httpStatus?: number) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
      applyOnFunction(target, key, descriptor, "get", path, httpStatus);
    };
  }

  /**
  * Decorator for 'POST' method.
  * @method
  * @param {string} path - path for Rest service.
  * @param {number} httpStatus - http status for response.
  */
  static post(path: string, httpStatus?: number) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
      applyOnFunction(target, key, descriptor, "post", path, httpStatus);
    };
  }

  /**
  * Decorator for 'PUT' method.
  * @method
  * @param {string} path - path for Rest service.
  * @param {number} httpStatus - http status for response.
  */
  static put(path: string, httpStatus?: number) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
      applyOnFunction(target, key, descriptor, "put", path, httpStatus);
    };
  }

  /**
  * Decorator for 'DELETE' method.
  * @method
  * @param {string} path - path for Rest service.
  * @param {number} httpStatus - http status for response.
  */
  static del(path: string, httpStatus?: number) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
      applyOnFunction(target, key, descriptor, "delete", path, httpStatus);
    };
  }

  /**
  * Decorator for 'PATCH' method.
  * @method
  * @param {string} path - path for Rpathest service.
  * @param {number} httpStatus - http status for response.
  */
  static patch(path: string, httpStatus?: number) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
      applyOnFunction(target, key, descriptor, "patch", path, httpStatus);
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
* @param {number} httpStatus - http status for response.
*/
function applyOnFunction(target: any, key: string, descriptor: PropertyDescriptor, methodName: string, path: string, httpStatus?: number) {

  let methodHttp = methodName;
  if (!target[Service.globalKey]) {
    target[Service.globalKey] = {};
  }
  if(!target[Service.globalKey][methodHttp]) {target[Service.globalKey][methodHttp] = {}};
  target[Service.globalKey][methodHttp][key] = {};
  target[Service.globalKey][methodHttp][key][Service.pathKey] = path;
  target[Service.globalKey][methodHttp][key][Service.fctKey] = descriptor.value;
  target[Service.globalKey][methodHttp][key][Service.httpStatusKey] = httpStatus;
};

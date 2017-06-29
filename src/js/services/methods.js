"use strict";

import Service from "../service";

/**
* Class for all verbs HTTP decorator.
* @class
*/
export default class Method {

  static METHODS = {
    get: true,
    post: true,
    delete: true,
    put: true,
    patch: true
  };

  /**
  * Decorator for 'GET' method.
  * @method
  * @param {string} path - path for Rest service.
  */
  static get(path) {
    return function (target, key, descriptor) {
      applyOnFunction(target, key, descriptor, "get", path);
    };
  }

  /**
  * Decorator for 'POST' method.
  * @method
  * @param {string} path - path for Rest service.
  */
  static post(path) {
    return function (target, key, descriptor) {
      applyOnFunction(target, key, descriptor, "post", path);
    };
  }

  /**
  * Decorator for 'PUT' method.
  * @method
  * @param {string} path - path for Rest service.
  */
  static put(path) {
    return function (target, key, descriptor) {
      applyOnFunction(target, key, descriptor, "put", path);
    };
  }

  /**
  * Decorator for 'DELETE' method.
  * @method
  * @param {string} path - path for Rest service.
  */
  static delete(path) {
    return function (target, key, descriptor) {
      applyOnFunction(target, key, descriptor, "delete", path);
    };
  }

  /**
  * Decorator for 'PATCH' method.
  * @method
  * @param {string} path - path for Rest service.
  */
  static patch(path) {
    return function (target, key, descriptor) {
      applyOnFunction(target, key, descriptor, "patch", path);
    };
  }
};path

/**
* Add REST decorator on function.
* @method
* @param {Object|function} target - instance to decorate.
* @param {string} key - attribute name.
* @param {Object} descriptor - property descriptor.
* @param {string} methodName - HTTP method name.
* @param {string} path - Url for REST service.
*/
function applyOnFunction(target, key, descriptor, methodName, path) {

  let methodHttp = methodName;
  if (!target[Service.globalKey]) {
    target[Service.globalKey] = {};
  }
  if(!target[Service.globalKey][methodHttp]) {target[Service.globalKey][methodHttp] = {}};
  target[Service.globalKey][methodHttp][key] = {};
  target[Service.globalKey][methodHttp][key][Service.pathKey] = path;
  target[Service.globalKey][methodHttp][key][Service.fctKey] = descriptor.value;

};

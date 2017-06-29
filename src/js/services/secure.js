"use strict";

import Service from "../service";

/**
* Class for Secure decorator.
* @class
*/
export default class Secure {

  /**
  * Decorator for 'GET' method.
  * @method
  * @param {array<string>} roles - liste des roles.
  */
  static secure(roles) {
    return function (target, key, descriptor) {
      descriptor.value.secure = function(obj) {
          console.log("Roles authorized", roles);
      }
    };
  }

}

/**
* Add Secure decorator on function.
* @method
* @param {Object|functionmethodName} target - instance to decorate.
* @param {string} key - attribute name.
* @param {Object} descriptor - property descriptor.
* @param {string} roles - Roles authorized.
*/
function applyOnFunction(target, key, descriptor, roles) {

  if (!target[Service.globalKey]) {
    target[Service.globalKey] = {};
  }

  if(!target[Service.globalKey][Service.secureKey]) {target[Service.globalKey][Service.secureKey] = {}};
  
  target[Service.globalKey][Service.secureKey][key] = {value: descriptor.value, roles: roles};

};


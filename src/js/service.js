"use strict";
import validate from "./validators";
import patternValidators from "./validators/patternValidators";
import * as requiredValidators from "./validators/requiredValidators";
import ValidatorHelper from "./helpers/ValidatorHelper"

const pathKey = "__path__";

export default class Service {

  static globalKey = "__3rest__";

  /**
  * Lance la validation à partir d'un objet de validation.
  * @param {string} path - path du sercice Rest.
  */
  static path(path) {

    return function decorate(target) {
      if (!target[globalKey]) {
        target[globalKey] = {};
      }
      target[globalKey][pathKey] = path;
    }
  }
};

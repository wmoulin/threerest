"use strict";

import Service from "./service";
import ValidatorError from "../exception/validatorError";
import ValidatorConfigError from "../exception/validatorConfigError";

export default class Method {

  static function get() {
    return function (target, key, descriptor) {
      applyOnFunction(target, key, descriptor, "get");
    };
  }
};



/**
* Ajout d'un décorateur Rest sur une fonction.
* @param {Object|function} target - instance ou constructeur de l'objet à décorer .
* @param {string} key - nom de l'attribut concerné par le decorateur.
* @param {Object} descriptor - descripteur de la propriété (attribut / fonction).
* @param {string} methodName - nom de la méthode http.
*/
static applyOnFunction(target, key, descriptor, methodName) {

  if (!target[Service.globalKey]) {
    target[Service.globalKey] = {};
  }
  target[Service.globalKey][] = descriptor.value;
};

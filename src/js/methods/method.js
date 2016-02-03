"use strict";

import Service from "../service";

export default class Method {

  static METHODS = {
    get: true,
    post: false,
    delete: false,
    update: false
  };

  static get(path) {
    return function (target, key, descriptor) {
      applyOnFunction(target, key, descriptor, "get", path);
    };
  }
};

/**
* Ajout d'un décorateur Rest sur une fonction.
* @param {Object|function} target - instance ou constructeur de l'objet à décorer .
* @param {string} key - nom de l'attribut concerné par le decorateur.
* @param {Object} descriptor - descripteur de la propriété (attribut / fonction).
* @param {string} methodName - nom de la méthode http.
* @param {string} path - chemin de la requête déclenchant la méthode du service.
*/
function applyOnFunction(target, key, descriptor, methodName, path) {

  let methodHttp = methodName;
  if (!target[Service.globalKey]) {
    target[Service.globalKey] = {};
  }
  target[Service.globalKey][methodHttp] = {};
  target[Service.globalKey][methodHttp][Service.pathKey] = path;
  target[Service.globalKey][methodHttp][Service.fctKey] = descriptor.value;

};

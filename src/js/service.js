"use strict";

import {Router} from "express";
import Method from "./methods/method";

export default class Service {

  static globalKey = "__3rest__";
  static pathKey = "__path__";
  static fctKey = "__call__";
  static loadFct = "__load__";


  /**
  * initailise un servcie.
  * @param {string} path - path du sercice Rest.
  */
  static path(path) {

    return function decorate(target) {
      if (!target.prototype[Service.globalKey]) {
        target.prototype[Service.globalKey] = {};
      }
      target.prototype[Service.globalKey][Service.pathKey] = path;

      console.log(target.prototype[Service.globalKey]);

      if (!target.prototype[Service.loadFct]) {
        target.prototype[Service.loadFct] = function(expressInst) {
          console.log("Chargement des routes...");
          let childsValidate = [];
          if (target.prototype[Service.globalKey]) {
            console.log("target.prototype[Service.globalKey]", target.prototype[Service.globalKey]);

            for (var attrib in target.prototype[Service.globalKey]) {
              console.log("methode HTTP", attrib);
              if (Method.METHODS[attrib]) {
                let fct = target.prototype[Service.globalKey][attrib][Service.fctKey];
                let router = Router();
                router[attrib](target.prototype[Service.globalKey][attrib][Service.pathKey], (req, res, next) => {console.log("fct", fct);fct.call(this, req, res, next)});
                expressInst.use(target.prototype[Service.globalKey][Service.pathKey], router);
              }
            }
          }
        };
      }
    }
  }
};

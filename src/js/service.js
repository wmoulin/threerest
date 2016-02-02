"use strict";

import * as Express from "express";

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

      if (!target.prototype[Service.loadFct]) {
        target.prototype[Service.loadFct] = function(expressInst) {
          let childsValidate = [];
          if (target[Service.globalKey]) {
            console.log("target[Service.globalKey]", target[Service.globalKey]);

            for (var attrib in target.prototype[Service.globalKey]) {
              if (Express.methods[attrib]) {
                var router = Express.Router();
                router[attrib].call(target.prototype[Service.globalKey][attrib][Service.pathKey], (req, res, next) => {target.prototype[Service.globalKey][attrib][Service.fctKey](req, res, next)});
                expressInst.use(target.prototype[Service.globalKey][Service.pathKey], router);
              }
            }
          }
        };
      }
    }
  }
};

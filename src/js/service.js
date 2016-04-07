"use strict";

import {Router} from "express";
import Method from "./services/methods";
import RestError from "./exceptions/restError";
import NotFoundError from "./exceptions/notFoundError";
/**
 * Class for Decorator REST service (entrypoint).
 * @class
 */
export default class Service {

  static globalKey = "__3rest__";
  static pathKey = "__path__";
  static fctKey = "__call__";
  static loadFct = "__load__";


  /**
  * Decorator for REST service class. Must use with method decorators.
  * @method
  * @param {string} path - the path of the service Rest.
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
          if (target.prototype[Service.globalKey]) {

            for (var attrib in target.prototype[Service.globalKey]) {

              if (Method.METHODS[attrib]) {
                let router = Router();
                for (var fctName in target.prototype[Service.globalKey][attrib]) {
                  let fct = target.prototype[Service.globalKey][attrib][fctName][Service.fctKey];
                  router[attrib](target.prototype[Service.globalKey][attrib][fctName][Service.pathKey], (req, res, next) => {
                    let p = new Promise((resolve) => { resolve(req.params||true); });
                    if (fct.convertBefore) {
                      p = p.then((params)=> {
                        return fct.convertBefore(params);
                      }).then((value) => {
                        return fct.call(this, value, req, res);
                      });
                    } else {
                      p = p.then(() => {
                        return fct.call(this, req, res);
                      });
                    }
                    p = p.then((value) => {
                      res.send(value);
                    })
                    .catch((e) => {
                      if (e.code) {
                        res.status(e.code).send(e.message);
                      } else {
                        res.status(500).send(e);
                      }
                    });
                  });
                }
                expressInst.use(target.prototype[Service.globalKey][Service.pathKey], router);
              }
            }
          }
        };
      }
    }
  }
};

"use strict";

import { Router } from "express";
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
  static secureKey = "__secure__";

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
                    let p;
                    if (fct.secure) {
                      p = new Promise((resolve, reject) => {
                        try {
                          fct.secure(req);
                          resolve(Service.getParams(req));
                        } catch(e) {
                          reject(e);
                        }
                      });
                    } else {
                      p = new Promise((resolve) => { resolve(Service.getParams(req)); });
                    }

                    if (fct.convertBefore) {
                      p = p.then((params)=> {
                        return fct.convertBefore(params);
                      });
                    } 
                    
                    p = p.then((params) => {
                      return fct.call(this, params, req, res);
                    }).then((value) => {
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

  /**
  * Renvoit les paramètres suivant la méthode.
  * @method
  * @param {IncomingMessage} requete - requête http
  * @return paramètre envoyé au service req.body ou req.params
  */
  static getParams(requete) {
    return requete.method == "post" ? requete.body : requete.params || true;
  }

};



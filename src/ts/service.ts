/// <reference types="express" />
import "reflect-metadata";

import { Router, Request, Response, Application, NextFunction } from "express";
import { Methods } from "./services/methods";
import { INJECT_PARAMETER_METADATA_KEY } from "./services/parameter";
import RestResult from "./services/rest-result";
import { Template } from "./template";
declare var Reflect: any;

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
  static httpStatusKey = "__http_status__";
  static paramKey = "__param__";
  static bodyKey = "__body__";
  static queryKey = "__query__";
  static headerKey = "__header__";
  static requestKey = "__request__";
  static responseKey = "__response__";

  /**
  * Decorator for REST service class. Must use with method decorators.
  * @method
  * @param {string} path - the path of the service Rest.
  */
  static path(path: string) {

    return function decorate(target: any) {
      if (!target.prototype[Service.globalKey]) {
        target.prototype[Service.globalKey] = {};
      }
      target.prototype[Service.globalKey][Service.pathKey] = path;

      if (!target.prototype[Service.loadFct]) {
        target.prototype[Service.loadFct] = function(expressInst: Application, callNextError?: boolean) {

          let childsValidate = [];
          if (target.prototype[Service.globalKey]) {

            for (let attrib in target.prototype[Service.globalKey]) {

              if (Methods.METHODS[attrib]) {
                let router: any = Router();
                for (let fctName in target.prototype[Service.globalKey][attrib]) {
                  let fct = target.prototype[Service.globalKey][attrib][fctName][Service.fctKey];
                  let status = target.prototype[Service.globalKey][attrib][fctName][Service.httpStatusKey];
                  router[attrib](target.prototype[Service.globalKey][attrib][fctName][Service.pathKey], (req: Request, res: Response, next: NextFunction) => {
                    let p;
                    if (fct.secure) {
                      p = new Promise((resolve, reject) => {
                        try {
                          fct.secure(req);
                          resolve(Service.getParams(req, res, target, fct.name));
                        } catch(e) {
                          reject(e);
                        }
                      });
                    } else {
                      p = new Promise((resolve) => { resolve(Service.getParams(req, res, target, fctName)); });
                    }

                    if (fct.convertBefore) {
                      p = p.then((params)=> {
                        return [fct.convertBefore(params[0])];
                      });
                    } 
                    
                    p = p.then((params) => {
                      return fct.apply(this, params ? (params as Array<any>).concat([req, res]) : []);
                    }).then((value) => {
                      if(value instanceof RestResult && (value as RestResult<any>).code) {
                        res.status((value as RestResult<any>).code);
                        res.send((value as RestResult<any>).data);
                      } else {
                        if(status) {
                          res.status(status);
                        } else if(target.prototype.manageStatus && typeof target.prototype.manageStatus  === 'function'){
                          res.status(target.prototype.manageStatus.call(this, req, value));
                        } else {
                          res.status(Service.manageStatus(req, value));
                        }
                        res.send(value);
                      }
                    })
                    .catch((e) => {
                      if(callNextError) {
                        next(e);
                      } else {
                        res.status(e.code ? e.code : 500).send(e.sendMessage ? e.sendMessage() : { message: e.message });
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
  * Renvoit les paramètres suivant la méthode.path
  * @method
  * @param {IncomingMessage} requete - requête http
  * @return paramètre envoyé au service req.body ou req.params
  */
  static getParams(requete: Request, reponse: Response, target: any, propertyKey: string | symbol) {
    const injectParameters: { index: number, type: any, parameterType: string, name: string }[] = Reflect.getMetadata(INJECT_PARAMETER_METADATA_KEY, target.prototype, propertyKey);
    if (injectParameters) {
      let allArguments = [];

      injectParameters.forEach((injectParameter) => {
        allArguments[ injectParameter.index ] = ((type: string, name: string)=>{
          switch(type) {
            case Service.paramKey :
              return name ? new Template("${" + name + "}").process(requete.params) : requete.params;
            case Service.bodyKey :
              return name ? new Template("${" + name + "}").process(requete.body) : requete.body;
            case Service.queryKey :
              return name ? new Template("${" + name + "}").process(requete.query) : requete.query;
            case Service.headerKey :
              return name ? requete.get(name) : requete.headers;
            case Service.requestKey :
              return requete
            case Service.responseKey :
              return reponse
            default:
              return undefined;
          }
        })(injectParameter.parameterType, injectParameter.name);
      });
      return allArguments;
    } else {
      return [requete.method.toLowerCase() == "post" || requete.method.toLowerCase() == "patch" ? Object.assign(requete.body, requete.params) : requete.params || {}];
    }
  }

  /**
  * Renvoit le statut http à renvoyer
  * @method
  * @param {IncomingMessage} requete - requête http
  * @param {any} result - résultat retourné par le service
  * @return le status http à renvoyer
  */
  static manageStatus(requete: Request, value:any): number {
    if(value && requete.method.toUpperCase() == "POST") return 201;
    else if(value == undefined && (requete.method.toUpperCase() == "POST" || requete.method.toUpperCase() == "PATCH")) return 204;
    else if(value == undefined && requete.method.toUpperCase() == "GET") return 404;
    return 200;
  }

};





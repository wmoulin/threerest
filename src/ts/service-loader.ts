import Service from "./service";
import * as path from "path";
import { Router, Request, Response, Application, NextFunction } from "express";

/**
* load all services in directory.
* @method
* @param {object} expressInst - the express context
* @param {string} service - the full path of the service directory
*/
export function loadServices(expressInst: Application, serviceDirPath: string, callNextError?: boolean) {
  require("fs").readdirSync(serviceDirPath).forEach((file: string) => {
    if(path.extname(file) === ".js") {
      let Service = require(path.join(serviceDirPath, file));
      if (Service.default) {
        let service = new (Service.default || Service)();
        loadService(expressInst, service, callNextError);
      }
    }
  });

};

/**
* load a service.
* @method
* @param {object} expressInst - the express application
* @param {object} service - the service
*/
export function loadService(expressInst: Application, service: any, callNextError?: boolean) {
  if (service[Service.loadFct]) {
    service[Service.loadFct].call(service, expressInst, callNextError);
  }
};

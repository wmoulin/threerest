"use strict";
import Service from "./service";
import * as path from "path";

/**
* load all services in directory.
* @method
* @param {object} expressInst - the express context
* @param {string} service - the full path of the service directory
*/
export function loadServices(expressInst, serviceDirPath) {
  let relativeServicesDirPath = path.join(__dirname, serviceDirPath);
  require("fs").readdirSync(serviceDirPath).forEach((file) => {
    if(path.extname(file) === ".js") {
      let Service = require(path.join(serviceDirPath, file));
      if (Service.default) {
        let service = new Service.default();
        loadService(expressInst, service);
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
export function loadService(expressInst, service) {
  if (service[Service.loadFct]) {
    service[Service.loadFct].call(service, expressInst);
  }
};

"use strict";
import Service from "./service";

/**
* load a service.

* @param {object} expressInst - the express context
* @param {string} service - the full path of the service directory
*/
export function loadServices(expressInst, serviceDirPath) {
  let relativeServicesDirPath = path.join(__dirname, serviceDirPath);
  require("fs").readdirSync(relativeServicesDirPath).forEach(function(file) {
    if(path.extname(file) === ".js") {
       //do something
      let Service = require(path.join(relativeServicesDirPath, file));
      let service = new Service();
      loadService(express, service);
    }
  });

};

/**
* load a service.

* @param {object} expressInst - the express application
* @param {object} service - the service
*/
export function loadService(expressInst, service) {
  if (service[Service.loadFct]) {
    service[Service.loadFct].call(service, expressInst);
  }
};

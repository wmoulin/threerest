"use strict";
import Service from "./service";

/**
* Methode utilitaire de chargement de service contenu dans un répertoire (récursivité a faire)
* {Object} expressInst - Application express
* {string} serviceDirPath - repertoire contenant les services
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
* Methode utilitaire de chargement d'un service
* {Object} expressInst - Application express
* {Object} service - instance du service à charger
*/
export function loadService(expressInst, service) {

  if (service[Service.loadFct]) {
    service[Service.loadFct](expressInst);
  }
};

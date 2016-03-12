"use strict";

import HalFlux from "./halFlux";
var pathToRegexp = require("path-to-regexp");

export default class Hal {

  static halServiceMethod(limit, offset) {
    return function decorate(target, key, descriptor) {
      let oldFunct = descriptor.value;

      descriptor.value = function() {
        let p = new Promise((resolve) => { resolve(true); });
        p = p.then(()=> {
          var result = new HalFlux(oldFunct.apply(this.caller, arguments));
          result.selfLink = arguments[1].originalUrl || arguments[0].originalUrl;

          if (Array.isArray(result.data)) {
            result.data.forEach((elt, index) => {
              if (elt.halLink) {
                HalFlux.decorateSimpleObject(result.data[index], elt.halLink.apply(elt));
              }
            });
          }

          return result;
        });
        return p;
      };

      if (oldFunct.convertBefore) {
        descriptor.value.convertBefore = oldFunct.convertBefore;
      }
    }
  }

  static halEntity(link) {
    return function decorate(target) {
      if (!target.halLink) {
        target.pathToRegexp = pathToRegexp.compile(link);
        target.prototype.halLink = function() {
          return target.pathToRegexp({ id: this.halRessourceId() });
        };
      }
    }
  }

  static resourceId() {
    return function decorate(target, key, descriptor) {
      if (!target.halRessourceId) {
        target.halRessourceId = function() {
          return this[key];
        };
      }
    }
  }

}

"use strict";

import HalFlux from "./halFlux";
var pathToRegexp = require("path-to-regexp");

/**
* Hal decorators
* @class
*/
export default class Hal {
  /**
   * Add a link on the result object. It represent the
   * state of the application. We used hal spec to represent this state.
   * The decorator is add on a method service.
   *
   * @method
   * @returns {json} the result with the hal links
   */
  static halServiceMethod() {
    return function decorate(target, key, descriptor) {
      let oldFunct = descriptor.value;

      descriptor.value = function() {
        let p = new Promise((resolve) => { resolve(true); });
        p = p.then(()=> {
          return oldFunct.apply(this, arguments);
        }).then((resultFct)=> {
          var result = new HalFlux(resultFct);
          result.selfLink = arguments[1].originalUrl || arguments[0].originalUrl;

          if (Array.isArray(result.data)) {
            result.data.forEach((elt, index) => {
              if (elt.halLink) {
                HalFlux.decorateSimpleObject(elt, arguments[1].params || arguments[0].params || {});
              }
            });
          } else {
            HalFlux.decorateSimpleObject(result, arguments[1].params || arguments[0].params || {});
          }

          return result;
        });
        return p;
      };

      if (oldFunct.convertBefore) {
        descriptor.value.convertBefore = oldFunct.convertBefore;
      }
    };
  }

  /**
   * Add a link on the result object. It represent the
   * state of the application. We used hal spec to represent this state.
   * The decorator is add on a entity.
   *
   * @method
   * @param {string} link - the link.
   * @param {string} paramName - the link parameter name to replace bi the id.
   * @returns {function} the decorator
   */
  static halEntity(link, paramName) {
    return function decorate(target) {
      if (!target.halLink) {
        target.pathToRegexp = pathToRegexp.compile(link);
        target.prototype.halLink = function(requestParameters) {
          let params = requestParameters || {};
          let paramId = paramName || "id";
          params[paramId] = this.halRessourceId();
          requestParameters[paramId] = this.halRessourceId();
          return target.pathToRegexp(params);
        };
      }
    };
  }

  /**
   * Mark the id for HAL entity.
   *
   * @method
   * @returns {function} the decorator
   */
  static resourceId() {
    return function decorate(target, key, descriptor) {
      if (!target.halRessourceId) {
        target.halRessourceId = function() {
          return this[key];
        };
      }
    };
  }

}

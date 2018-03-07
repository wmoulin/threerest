import HalFlux from "./hal-flux";
import HalPaginateFlux from "./hal-paginate-flux";
import Pagination from "../services/pagination";
import { PaginationData, IPaginationData} from "../services/pagination-data";
const pathToRegexp = require("path-to-regexp");

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
   * @param {boolean} bPaginate - activate le hal pagination metadata
   * @returns {json} the result with the hal links
   */
  static halServiceMethod(pagination?:IPaginationData|boolean) {
    return function decorate(target: any, key: string, descriptor: PropertyDescriptor) {
      let oldFunct = descriptor.value;
      let paginateObject:IPaginationData = undefined;

      if (pagination) {
        if(typeof(pagination) === "boolean"){
          paginateObject = {};
        } else if (typeof(pagination) === "object") {
          paginateObject = pagination;
        }
      }

      descriptor.value = function() {
        let p = new Promise((resolve) => { resolve(true); });
        p = p.then(()=> {
          return oldFunct.apply(this, arguments);
        });

        if (paginateObject) { // if paginate, extract the page and create hal paginate flux
          p = p.then((resultFct)=> {
            if (Array.isArray(resultFct)) {
              
              let currentQuery = arguments[1].query || arguments[0].query;
              let paginationData:PaginationData = Pagination.extractPaginationData(currentQuery, paginateObject.pageSizeKeyWord, paginateObject.pageIdxKeyWord, paginateObject.startIdxKeyWord);
              paginationData.length = resultFct.length;
              let dataPage = Pagination.managePagination(resultFct, paginationData.pageSize, paginationData.pageIdx, paginationData.startIdx);
              return new HalPaginateFlux(dataPage, paginationData);
            }
            return new HalFlux(resultFct);
          });
        } else { // if no paginate, create hal flux
          p = p.then((resultFct: Array<any>)=> {
            return new HalFlux(resultFct);
          });
        }

        p = p.then((halFlux: HalFlux)=> { // add hal metadata for all hal entity
          let queryParams = arguments[1].params || arguments[0].params || {};
          if (Array.isArray(halFlux.data)) {
            halFlux.data.forEach((elt, index) => {
              if (elt.halLink) {
                HalFlux.decorateSimpleObject(elt, queryParams);
              }
            });
          } else {
            HalFlux.decorateSimpleObject(halFlux, queryParams);
          }
          return halFlux;
        }).then((halFlux: HalFlux)=> { // update link for all flux type
          let currentRequest = arguments[1] || arguments[0];
          halFlux.updateLinks(<string>(arguments[0].originalUrl || arguments[1].originalUrl), <string>(arguments[0].baseUrl || arguments[1].baseUrl));
          delete (<any> halFlux).paginationData; //pour les HalPaginateFlux
          return halFlux;
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
  static halEntity(link: string, paramName?: string) {
    return function decorate(target: any) {
      if (!target.halLink) {
        target.pathToRegexp = pathToRegexp.compile(link);
        target.prototype.halLink = function(requestParameters: any) {
          let params = requestParameters || {};
          let paramId = paramName || "id";
          params[paramId] = this.halRessourceId.call(this);
          requestParameters[paramId] = this.halRessourceId.call(this);
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
    return function decorate(target: any, key: string) {
      if (!target.halRessourceId) {
        target.halRessourceId = function() {
          return this[key];
        };
      }
    };
  }

}

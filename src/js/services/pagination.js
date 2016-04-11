"use strict";

import ArrayHelper from "../helpers/arrayHelper";

export default class Pagination {

  /**
   * Orchester pagination based on keywords parameter.
   *
   * @method
   * @param {String} [limit] - The keyword for limit. It can be null.
   * @param {String} [offset] - The keyword for offset. It can be null.
   * @returns {json} the result with pagination
   */
  static paginate(limit, offset) {
    return function decorate(target, key, descriptor) {
      let oldFunct = descriptor.value;

      descriptor.value = function() {
        let p = new Promise((resolve) => { resolve(true); });
        p = p.then(()=> {
          return oldFunct.apply(this, arguments);
        }).then((array)=> {
          return managePagination(array, arguments[0].query || arguments[1].query, limit, offset);
        });
        return p;
      };

      if (oldFunct.convertBefore) {
        descriptor.value.convertBefore = oldFunct.convertBefore;
      }
    }
  }
}

/**
 * Manage if pagination is neeccessary or not.
 * If there are pagination, the keywords for the limit and the
 * offset must be set.
 * Then the result is slicing by this two params.
 *
 * @method
 * @param {json} result - The result from the service.
 * @param {json} query - The query to the service.
 * @param {String} [limit=limit] - The keyword for limit. It can be null.
 * @param {String} [offset=offset] - The keyword for offset. It can be null.
 * @returns {json}
 */
function managePagination(result, query, limit = "limit", offset =  "offset") {

  if (query[limit] || query[offset]) {
    var pagination = {"limitTerm": limit, "limit": query[limit], "offsetTerm": offset, "offset": query[offset], "total": result.length };
    result = {"pagination": pagination, "list":  ArrayHelper.paginatesList(result, query[limit], query[offset])};
    //result = ArrayHelper.paginatesList(result, query[limit], query[offset]);
  }
  return result;
}

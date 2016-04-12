"use strict";

import ArrayHelper from "../helpers/arrayHelper";

export default class Pagination {

  /**
   * Orchester pagination based on keywords parameter.
   *
   * @method
   * @param {String} [pageSize] - The keyword for pageSize. It can be null.
   * @param {String} [pageIdx] - The keyword for pageIdx. It can be null.
   * @returns {json} the result with pagination
   */
  static paginate(pageSize, pageIdx) {
    return function decorate(target, key, descriptor) {
      let oldFunct = descriptor.value;

      descriptor.value = function() {
        let p = new Promise((resolve) => { resolve(true); });
        p = p.then(()=> {
          return oldFunct.apply(this, arguments);
        }).then((array)=> {
          return managePagination(array, arguments[0].query || arguments[1].query, pageSize, pageIdx);
        });
        return p;
      };

      if (oldFunct.convertBefore) {
        descriptor.value.convertBefore = oldFunct.convertBefore;
      }
    };
  }

  /**
   * Manage if pagination is neeccessary or not.
   * If there are pagination, the keywords for the pageSize and the
   * pageIdx must be set.
   * Then the result is slicing by this two params.
   *
   * @method
   * @param {json} result - The result from the service.
   * @param {json} query - The query to the service.
   * @param {String} [pageSize=pageSize] - The keyword for pageSize. It can be null.
   * @param {String} [pageIdx=pageIdx] - The keyword for pageIdx. It can be null.
   * @returns {json}
   */
  static managePagination(result, query, pageSize = "pageSize", pageIdx =  "pageIdx") {

    if (query[pageSize] || query[pageIdx]) {
      result = ArrayHelper.paginatesList(result, query[pageSize], query[pageIdx]);
    }
    return result;
  }

  /**
   * Manage if pagination is neeccessary or not.
   * If there are pagination, the keywords for the pageSize and the
   * pageIdx must be set.
   * Then the result is slicing by this two params.
   *
   * @method
   * @param {json} result - The result from the service.
   * @param {json} query - The query to the service.
   * @param {String} [pageSize=pageSize] - The keyword for pageSize. It can be null.
   * @param {String} [pageIdx=pageIdx] - The keyword for pageIdx. It can be null.
   * @returns {json}
   */
  static extractPaginationData(result, query, pageSize = "pageSize", pageIdx =  "pageIdx") {

    if (query) {
      return {pageSize: query[pageSize], pageIdx: query[pageIdx]};
    }
    return {};

  }
}

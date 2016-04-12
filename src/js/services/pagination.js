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
          let currentQuery = arguments[0].query || arguments[1].query;
          let paginationData = Pagination.extractPaginationData(currentQuery, pageSize, pageIdx);
          return Pagination.managePagination(array, paginationData.pageSize, paginationData.pageIdx);
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
   * @param {String} [pageSize=result.length] - The keyword for pageSize. It can be null.
   * @param {String} [pageIdx=0] - The keyword for pageIdx. It can be null.
   * @returns {json}
   */
  static managePagination(result, pageSize, pageIdx =  0) {
    if (result) {
      result = ArrayHelper.paginatesList(result, pageSize || result.length, pageIdx);
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
  static extractPaginationData(query, pageSize = "pageSize", pageIdx =  "pageIdx") {

    if (query) {
      return {pageSize: query[pageSize], pageIdx: query[pageIdx]};
    }
    return {};

  }
}

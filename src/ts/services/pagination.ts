import ArrayHelper from "../helpers/arrayHelper";
import { PaginationData } from "./paginationData";
import { Request } from "express";

 export default class Pagination {
  /**
   * Orchester pagination based on keywords parameter.
   *
   * @method
   * @param {String} [pageSizeKeyWord] - The keyword for pageSize. It can be null.
   * @param {String} [pageIdxKeyWord] - The keyword for pageIdx. It can be null.
   * @returns {json} the result with pagination
   */
  static paginate(pageSizeKeyWord?:string, pageIdxKeyWord?:string) {
    return function decorate(target: any, key: string, descriptor: PropertyDescriptor) {
      let oldFunct = descriptor.value;

      descriptor.value = function () {
        let p = new Promise((resolve) => { resolve(true); });
        p = p.then(() => {
          return oldFunct.apply(this, arguments);
        }).then((array) => {
          let currentQuery = arguments[0].query || arguments[1].query;
          let paginationData = Pagination.extractPaginationData(currentQuery, pageSizeKeyWord, pageIdxKeyWord);
          return {data: Pagination.managePagination(array, paginationData.pageSize, paginationData.pageIdx, paginationData.startIdx), pagination: paginationData};
        });
        return p;
      };

      if (oldFunct.convertBefore) {
        descriptor.value.convertBefore = oldFunct.convertBefore;
      }
    }
  }

  /**
   * Manage if pagination is neeccessary or not.
   * If there are pagination, the keywords for the pageSize and the
   * pageIdx must be set.
   * Then the result is slicing by this two params.
   *
   * @method
   * @param {Array} result - The result from the service.
   * @param {String} [pageSize=result.length] - the page size.
   * @param {String} [pageIdx=0] - the index of the page to extract.
   * @param {String} [startIdx=0] - the index of the object to start ectract.
   * @returns {Array}
   */
  static managePagination(result:Array<any>, pageSize: number, pageIdx: number = 0, startIdx: number = 0) {
    if (result) {
      result = ArrayHelper.paginatesList(result, pageSize || result.length, pageIdx, startIdx);
    }
    return result;
  }

  /**
   * Extract paginatino data from request.
   *
   * @method
   * @param {object} query - The query to the service.
   * @param {String} [pageSizeKeyWord=pageSize] - The keyword for pageSize. It can be null.
   * @param {String} [pageIdxKeyWord=pageIdx] - The keyword for pageIdx. It can be null.
   * @returns {PaginationData}
   */
  static extractPaginationData(query: any, pageSizeKeyWord: string = "pageSize", pageIdxKeyWord: string = "pageIdx", startIdxKeyWord: string = "startIdx") {

    if (query) {
      return new PaginationData(pageIdxKeyWord, pageSizeKeyWord, startIdxKeyWord, parseInt(query[pageIdxKeyWord]), parseInt(query[pageSizeKeyWord]), parseInt(query[startIdxKeyWord]));
    }
  }

};


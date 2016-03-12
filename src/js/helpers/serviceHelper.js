export default class ServiceHelper {

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
  static managePagination(result, query, limit = "limit", offset =  "offset") {

    if (query[limit] || query[offset]) {
      result = ServiceHelper.paginatesList(result, query, query[limit], query[offset]);
    }
    return result;
  }

  /**
   * Slice or not the result list.
   * The value of limit and/or offset determine how we can
   *
   * @method
   * @param {json} result - The result from the service.
   * @param {json} query - The query to the service.
   * @param {String} limit - The keyword for limit. It can be null.
   * @param {String} offset - The keyword for offset. It can be null.
   * @returns {json}
   */
  static paginatesList(result, query, limit, offset) {
    if (limit && offset) {
      // TODO gestion du code retour
      //res.status(206);
      return result.slice(offset, offset + limit);
    } else if (limit) {
      //res.status(206);
      return result.slice(0, limit);
    } else if (offset) {
      return result.slice(offset);
    } else {
      return result;
    }
  }
}

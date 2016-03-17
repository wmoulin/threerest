export default class ArrayHelper {

  /**
   * Slice or not the result list.
   * The value of limit and/or offset determine how we can
   *
   * @method
   * @param {json} result - The result from the service.
   * @param {String} limit - The keyword for limit. It can be null.
   * @param {String} offset - The keyword for offset. It can be null.
   * @returns {json}
   */
  static paginatesList(result, limit, offset) {
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

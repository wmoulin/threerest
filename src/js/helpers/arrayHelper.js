export default class ArrayHelper {

  /**
   * Slice or not the result list.
   * The value of limit and/or offset determine how we can
   *
   * @method
   * @param {Array} result - The Array for extact.
   * @param {String} limit - The number of element to extract.
   * @param {String} offset - The index of the page to extract.
   * @param {String} startIdx - the index of the object to start extract.
   * @returns {Array}
   */
  static paginatesList(result, limit, offset, startIdx) {
    let tmpArray = result;

    if (startIdx) {
      tmpArray = tmpArray.slice(startIdx);
    }

    if (limit && offset) {
      tmpArray = tmpArray.slice(offset * limit, offset * limit + limit);
    } else if (limit) {
      tmpArray = tmpArray.slice(0, limit);
    }

    return tmpArray;
  }
}

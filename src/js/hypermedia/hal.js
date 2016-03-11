export default class Hal {

  /**
   * Create Self link from url.
   * 
   * @method
   * @param {String} url - The url of the self object.
   * @returns {json}
   */
  static createLinkSelf(result, url) {
    if(Hal.isArray(result)) {
      result.push({_links:{self: { href: url }}});
    } else {
      result._links = {self: { href: url }};
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

  /**
   * Manage if pagination is neeccessary or not.
   * If there are pagination, the keywords for the limit and the
   * offset must be set. By default the keywords are limit and offset.
   * Then the result is slicing by this two params.
   * 
   * @method
   * @param {json} result - The result from the service.
   * @param {json} query - The query to the service.
   * @param {String} limit - The keyword for limit. It can be null.
   * @param {String} offset - The keyword for offset. It can be null.
   * @returns {json}
   */
  static managePagination(result, query, limit, offset) {

    var limitKeyword = "limit";
    if (limit) {
      limitKeyword = limit;
    }
    var offsetKeyword = "offset";
    if (offset) {
      offsetKeyword = offset;
    }

    if (query[limitKeyword] || query[offsetKeyword]) {
      result = Hal.paginatesList(result, query, query[limitKeyword], query[offsetKeyword]);
    }
    return result;
  }
  /*
  * Method to remove
  */
  static isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
  }

  static halServiceMethod(limit, offset) {
    return function decorate(target, key, descriptor) {
      let oldFunct = descriptor.value;

      descriptor.value = function() {
        let p = new Promise((resolve) => { resolve(true); });


        // Generation link self
        p = p.then(()=> {

          var result = oldFunct.apply(this.caller, arguments);

          // Manage pagination
          result = Hal.managePagination(result, arguments[1].query, limit, offset);

          // add self link
          return Hal.createLinkSelf(result, arguments[1].originalUrl);
        });
        p = p.catch(function(error) {
          console.log(error);
        });
        // Management pagination
       /* p = p.then(function(param) {

          //console.log(param["limit"]);
          //console.log(param["offset"]);
          var result = param["result"];
          var query = param["query"];

          // TODO ajout des noms paramètrés 
          var limit = query["limit"];
          var offset = query["offset"];

          if (limit && offset) {
            // TODO gestion du code retour
            //res.status(206);
            return result.slice(offset, offset + limit);
          } else if (limit) {
            //res.status(206);
            return result.slice(0, limit);
          } else {
            return result;
          }
        });*/

        return p;
      };

      if (oldFunct.convertBefore) {
        descriptor.value.convertBefore = oldFunct.convertBefore;
      }
    }
  }



  static halEntity() {
    return function decorate(target) {
      if (!target.halLink) {
        Object.defineProperty(target, 'halLink', {
          value : function(){ return "link" }
        });
      }
    }
  }

  static resourceId() {
    return function decorate(target, key, descriptor) {
      if (!target.halRessourceId) {
        Object.defineProperty(target, 'halRessourceId', {
          get : function(){ return target[key]; }
        });
      }
    }
  }

}

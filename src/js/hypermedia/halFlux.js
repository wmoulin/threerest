"use strict";

var SELF_LINK_PROP = "self";

/**
 * Class for decorate data with HAL metadata.
 * @class
 */
export default class HalFlux {

  constructor(data) {

    this._links = {};
    this.data = data;
  }

  set selfLink(value) {
    this._links[SELF_LINK_PROP] = {href: value};
  }

  updateLinks(currentUrl) {
    this._links[SELF_LINK_PROP] = {href: currentUrl};
  }

  static decorateSimpleObject(object, requestParameters) {
    if (object) {
      if (object.halLink) {
        object._links = {};
        object._links[SELF_LINK_PROP] = {href: object.halLink.call(object, requestParameters)};
      }
      for (let attrib in object) {
        if (object[attrib] && Array.isArray(object[attrib])) {
          object[attrib].forEach((elt, index) => {
            if (elt && elt.halLink) {
              HalFlux.decorateSimpleObject(elt, requestParameters);
            }
          });
        } else if (object[attrib] && object[attrib].halLink) {
          HalFlux.decorateSimpleObject(object[attrib], requestParameters);
        }
      }
    }
  }
}

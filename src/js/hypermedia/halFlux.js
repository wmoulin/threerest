"use strict";

var SELF_LINK_PROP = "self";
var NEXT_LINK_PROP = "next";
var PREVIOUS_LINK_PROP = "prev";
var FIRST_LINK_PROP = "first";
var LAST_LINK_PROP = "last";

/**
 * Class for decorate data with HAL metadata.
 * @class
 */
export default class HalFlux {

  constructor(data, pagination) {

    this._links = {};
    this.data = data;
    this.pagination = pagination;
  }

  set selfLink(value) {
    this._links[SELF_LINK_PROP] = {href: value};
  }

  set nextLink(value) {
    this._links[NEXT_LINK_PROP] = {href: value};
  }

  set previousLink(value) {
    this._links[PREVIOUS_LINK_PROP] = {href: value};
  }

  set firstLink(value) {
    this._links[FIRST_LINK_PROP] = {href: value};
  }

  set lastLink(value) {
    this._links[LAST_LINK_PROP] = {href: value};
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

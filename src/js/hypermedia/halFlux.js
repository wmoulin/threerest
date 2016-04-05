"use strict";

var SELF_LINK_PROP = "self";
var NEXT_LINK_PROP = "nextLink";
var PREVIOUS_LINK_PROP = "previousLink";

export default class HalFlux {

  constructor(data) {

    this._links = {};
    this.data = data;
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

  static decorateSimpleObject(object, requestParameters) {
    if (object && object.halLink) {
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

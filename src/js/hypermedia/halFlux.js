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
    if (object.halLink) {
      object._links = {};
      object._links[SELF_LINK_PROP] = {href: object.halLink.call(object, requestParameters)};
    }
    for (let attrib in object) {
      if (object[attrib].halLink) {
        HalFlux.decorateSimpleObject(object[attrib], requestParameters);
      }
    }
  }
}
